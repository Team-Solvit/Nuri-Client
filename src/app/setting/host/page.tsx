'use client'

import React from "react";
import * as S from "./style";
import SettingNav from "@/components/ui/settingNav";
import Logout from "@/components/ui/logout";
import { useState, useEffect } from "react";
import Leave from "@/components/ui/leave";
import SettingHeader from "@/components/ui/settingHeader";
import AddressInput from "@/components/ui/addressInput/AddressInput";
import Square from "@/components/ui/button/square";
import PhoneAuth from "@/components/ui/phoneAuth";
import { useUserStore } from "@/store/user";
import { useApolloClient, useQuery } from "@apollo/client";
import { HostService, HostGQL } from "@/services/host";
import { useAlertStore } from "@/store/alert";
import { BoardingHouseSettingRequestDto } from "@/types/boarding";
import Alert from "@/components/ui/alert";
import { clearAccessToken } from '@/utils/token';
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";

interface HostBoardingRoom {
  boardingHouse: {
    nearestSchool: string;
    nearestStation: string;
    location: string;
  };
  name: string;
  description: string;
}

interface HostBoardingRoomsResponse {
  getHostBoardingRooms: HostBoardingRoom[];
}

export default function Host() {
  const userStore = useUserStore(s => s);
  const { role, phoneNumber, userId, clear, setRole } = userStore;
  const apolloClient = useApolloClient();
  const { success, error: showError } = useAlertStore();
  const router = useRouter();

  console.log('Full user store:', userStore);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isHostSettingCompleted, setIsHostSettingCompleted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    detailAddress: '',
    introduce: '',
    station: '',
    university: '',
    gender: 'MALE',
    mealProvided: true,
  });

  const { data: boardingRoomData, loading: boardingRoomLoading } = useQuery<HostBoardingRoomsResponse>(
    HostGQL.QUERIES.GET_HOST_BOARDING_ROOMS,
    {
      variables: { userId: userId || '' },
      skip: !userId || !isPhoneVerified || (role !== 'HOST' && !localStorage.getItem('hostSettingCompleted')),
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const rooms = data?.getHostBoardingRooms;
        if (rooms && rooms.length > 0) {
          const room = rooms[0]; // 첫 번째 하숙집 정보 사용
          const newFormData = {
            name: room.name || '',
            address: room.boardingHouse?.location || '',
            detailAddress: room.description || '',
            introduce: room.description || '',
            station: room.boardingHouse?.nearestStation || '',
            university: room.boardingHouse?.nearestSchool || '',
            gender: 'MALE',
            mealProvided: true,
          };
          setFormData(newFormData);
          setIsHostSettingCompleted(true);
          localStorage.setItem('hostSettingCompleted', 'true');
        } else {
          setIsHostSettingCompleted(false);
          localStorage.removeItem('hostSettingCompleted');
        }
      },
      onError: (error) => {
        console.error('하숙집 정보 로드 실패:', error);
        const errMsg = error?.message || '';
        if (!errMsg.includes('존재하지 않습니다')) {
          showError('하숙집 정보를 불러오는 중 오류가 발생했습니다.');
        }
      }
    }
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (role === 'HOST') {
      setIsPhoneVerified(true);
      setVerifiedPhoneNumber(phoneNumber || '인증 완료');
      return;
    }

    const savedPhoneVerified = localStorage.getItem('hostPhoneVerified');
    const savedAt = Number(localStorage.getItem('hostPhoneVerifiedAt') || 0);

    const isFresh = Date.now() - savedAt < 1000 * 60 * 30; // 30분 TTL
    if (savedPhoneVerified === 'true' && isFresh) {
      setIsPhoneVerified(true);
    }
  }, [role, phoneNumber])

  useEffect(() => {
    const savedHostSettingCompleted = localStorage.getItem('hostSettingCompleted');
    if (savedHostSettingCompleted === 'true') {
      setIsHostSettingCompleted(true);
    }
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await AuthService.logout(apolloClient);
      try {
        clearAccessToken();
        await apolloClient.clearStore();
      } catch (e) {
        console.error('Error clearing client state on logout:', e);
      }
      clear();
	    try {
				localStorage.removeItem('nuri-user');
				localStorage.removeItem('hostPhoneVerified');
				localStorage.removeItem('hostPhoneNumber');
				localStorage.removeItem('hostSettingCompleted');
			}
      catch (e) {
	      console.error(e)
      }
      success('로그아웃되었습니다.');
      router.push('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      showError('로그아웃 중 오류가 발생했습니다.');
    }
    finally {
	    setIsLoggingOut(false);
      setShowLogoutModal(false);
      try { await apolloClient.clearStore(); } catch { }
    }
  }

  const handlePhoneVerifySuccess = (callNumber: string) => {
    setIsPhoneVerified(true);
    setVerifiedPhoneNumber(callNumber);
    setShowPhoneAuth(false);

    localStorage.setItem('hostPhoneVerified', 'true');
    localStorage.setItem('hostPhoneVerifiedAt', String(Date.now()));
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showError('하숙집 이름을 입력해주세요.');
      return;
    }
    if (!formData.address.trim()) {
      showError('주소를 선택해주세요.');
      return;
    }
    if (!selectedPosition) {
      showError('주소를 선택해주세요.');
      return;
    }
    if (!formData.station.trim()) {
      showError('가까운 역을 입력해주세요.');
      return;
    }
    if (!formData.university.trim()) {
      showError('가까운 대학교를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      const requestDto: BoardingHouseSettingRequestDto = {
        name: formData.name,
        address: formData.address,
        detailAddress: formData.detailAddress,
        lat: selectedPosition.lat,
        lng: selectedPosition.lng,
        station: formData.station,
        university: formData.university,
        gender: formData.gender,
        mealProvided: formData.mealProvided,
        introduce: formData.introduce,
	      callNumber:
		      phoneNumber && /^\d{10,11}$/.test(phoneNumber)
			      ? phoneNumber
			      : verifiedPhoneNumber && /^\d{10,11}$/.test(verifiedPhoneNumber)
			      ? verifiedPhoneNumber
			      : '',
      };

      const result = await HostService.createBoardingHouse(apolloClient, requestDto);

      if (result) {
        success('하숙집 정보가 저장되었습니다.');
        setIsHostSettingCompleted(true);
        localStorage.setItem('hostSettingCompleted', 'true');

        setRole('HOST');
      } else {
        showError('하숙집 정보 저장에 실패했습니다.');
      }
    } catch (err) {
      console.error('하숙집 저장 오류:', err);
      showError('하숙집 정보 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <S.Con>
      {isMobile && <SettingHeader />}
      <S.NavArea>
        <SettingNav
          onLogoutClick={() => setShowLogoutModal(true)}
          onLeaveClick={() => setShowLeaveModal(true)}
        />
      </S.NavArea>
      <S.Container>
        <S.Title>호스트 설정</S.Title>

        {role === 'HOST' || isHostSettingCompleted ? (
          <S.CompletedSection>
            <S.CompletedTitle>호스트 설정이 완료되었습니다</S.CompletedTitle>
            <S.CompletedDescription>
              하숙집 정보가 등록되어 호스트로 활동하실 수 있습니다.
            </S.CompletedDescription>
          </S.CompletedSection>
        ) : !isPhoneVerified ? (
          <S.AuthSection>
            <S.AuthTitle>휴대폰 인증</S.AuthTitle>
            <S.AuthDescription>
              호스트 인증을 위해 휴대폰 인증이 필요합니다.
            </S.AuthDescription>
            <S.AuthButtonWrapper>
              <Square
                text="휴대폰 인증하기"
                status={true}
                width="100%"
                onClick={() => setShowPhoneAuth(true)}
              />
            </S.AuthButtonWrapper>
          </S.AuthSection>
        ) : (
          <>
            <S.Section>
              <S.SectionTitle>하숙집 정보</S.SectionTitle>
              <S.Home>
                <S.InputRow>
                  <S.Input
                    placeholder="하숙집 이름을 입력해주세요."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <AddressInput
                    onSelectAddress={(address, lat, lng) => {
                      setSelectedPosition({ lat, lng });
                      handleInputChange('address', address);
                    }}
                  />
                </S.InputRow>
                <S.InputRow>
                  <S.Input
                    placeholder="하숙집 소개를 입력해주세요."
                    value={formData.introduce}
                    onChange={(e) => handleInputChange('introduce', e.target.value)}
                  />
                  <S.Input
                    placeholder="상세정보를 입력해주세요. (ex 301동 1103호)"
                    value={formData.detailAddress}
                    onChange={(e) => handleInputChange('detailAddress', e.target.value)}
                  />
                </S.InputRow>
              </S.Home>
            </S.Section>

            <S.Section>
              <S.SectionTitle>지역</S.SectionTitle>
              <S.InputRow>
                <S.Input
                  placeholder="가까운 역을 입력해주세요. (ex 대연역)"
                  value={formData.station}
                  onChange={(e) => handleInputChange('station', e.target.value)}
                />
                <S.Input
                  placeholder="가까운 대학교를 입력해주세요. (ex 부경대학교)"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                />
              </S.InputRow>
              <S.Guide>* 하나씩만 정확히 작성해주세요. </S.Guide>
            </S.Section>

            <S.Section>
              <S.SectionTitle>성별 조건</S.SectionTitle>
              <S.RadioRow>
                <S.RadioLabel>
                  <S.Radio
                    name="gender"
                    type="radio"
                    checked={formData.gender === 'MALE'}
                    onChange={() => handleInputChange('gender', 'MALE')}
                  />
                  남
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    name="gender"
                    type="radio"
                    checked={formData.gender === 'FEMALE'}
                    onChange={() => handleInputChange('gender', 'FEMALE')}
                  />
                  여
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    name="gender"
                    type="radio"
                    checked={formData.gender === 'ALL'}
                    onChange={() => handleInputChange('gender', 'ALL')}
                  />
                  모두
                </S.RadioLabel>
              </S.RadioRow>
            </S.Section>

            <S.Section>
              <S.SectionTitle>식사 제공</S.SectionTitle>
              <S.RadioRow>
                <S.RadioLabel>
                  <S.Radio
                    name="meal"
                    type="radio"
                    checked={formData.mealProvided}
                    onChange={() => handleInputChange('mealProvided', true)}
                  />
                  예
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    name="meal"
                    type="radio"
                    checked={!formData.mealProvided}
                    onChange={() => handleInputChange('mealProvided', false)}
                  />
                  아니요
                </S.RadioLabel>
              </S.RadioRow>
            </S.Section>
            <Square
              text={isSaving ? "저장 중..." : "저장하기"}
              status={!isSaving}
              onClick={handleSave}
              width="100%"
            />
          </>
        )}
      </S.Container>
      {showLogoutModal && <Logout
        onLogout={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />}
      {showLeaveModal && (
        <Leave
          onLeave={() => {
            console.log('회원탈퇴 처리 완료')
            setShowLeaveModal(false)
          }}
          onClose={() => setShowLeaveModal(false)}
        />
      )}
      {showPhoneAuth && (
        <PhoneAuth
          onVerifySuccess={handlePhoneVerifySuccess}
          onClose={() => setShowPhoneAuth(false)}
          role="HOST"
        />
      )}
      <Alert />
    </S.Con>
  );
}