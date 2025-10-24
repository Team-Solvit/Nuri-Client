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

export default function Host() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{lat: number, lng: number} | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 새로고침 시 휴대폰 인증 상태 복원
  useEffect(() => {
    const savedPhoneVerified = localStorage.getItem('hostPhoneVerified');
    const savedPhoneNumber = localStorage.getItem('hostPhoneNumber');
    
    if (savedPhoneVerified === 'true' && savedPhoneNumber) {
      setIsPhoneVerified(true);
      setVerifiedPhoneNumber(savedPhoneNumber);
    }
  }, [])

  const handleLogout = () => {
    console.log('로그아웃 처리 완료')
    setShowLogoutModal(false)
  }

  const handlePhoneVerifySuccess = (callNumber: string, agency: string) => {
    setIsPhoneVerified(true);
    setVerifiedPhoneNumber(callNumber);
    setShowPhoneAuth(false);
    
    // localStorage에 인증 상태 저장
    localStorage.setItem('hostPhoneVerified', 'true');
    localStorage.setItem('hostPhoneNumber', callNumber);
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

        {!isPhoneVerified ? (
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
              <S.Input placeholder="하숙집 이름을 입력해주세요." />
              <AddressInput
                onSelectAddress={(address, lat, lng) => {
                  console.log("선택된 주소:", address, lat, lng);
                  setSelectedPosition({ lat, lng });
                }}
              />
            </S.InputRow>
            <S.InputRow>
              <S.Input placeholder="하숙집 소개를 입력해주세요." />
              <S.Input placeholder="상세정보를 입력해주세요. (ex 301동 1103호)" />
            </S.InputRow>
          </S.Home>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지역</S.SectionTitle>
          <S.InputRow>
            <S.Input placeholder="가까운 역을 입력해주세요. (ex 대연역)" />
            <S.Input placeholder="가까운 대학교를 입력해주세요. (ex 부경대학교)" />
          </S.InputRow>
          <S.Guide>* 하나씩만 정확히 작성해주세요. </S.Guide>
        </S.Section>

        <S.Section>
          <S.SectionTitle>성별 조건</S.SectionTitle>
          <S.RadioRow>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" defaultChecked />
              남
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" />
              여
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" />
              모두
            </S.RadioLabel>
          </S.RadioRow>
        </S.Section>

        <S.Section>
          <S.SectionTitle>식사 제공</S.SectionTitle>
          <S.RadioRow>
            <S.RadioLabel>
              <S.Radio name="meal" type="radio" defaultChecked />
              예
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="meal" type="radio" />
              아니요
            </S.RadioLabel>
          </S.RadioRow>
        </S.Section>
        <Square text="저장하기" status={true} onClick={() => {}} width="100%" />
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
    </S.Con>
  );
}