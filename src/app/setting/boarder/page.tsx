'use client'

import React from "react";
import * as S from "../host/style";
import SettingNav from "@/components/ui/settingNav";
import Logout from "@/components/ui/logout";
import { useState, useEffect } from "react";
import Leave from "@/components/ui/leave";
import SettingHeader from "@/components/ui/settingHeader";
import Square from "@/components/ui/button/square";
import PhoneAuth from "@/components/ui/phoneAuth";
import { useUserStore } from "@/store/user";
import { useAlertStore } from "@/store/alert";
import Alert from "@/components/ui/alert";
import { useApolloClient } from "@apollo/client";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { clearAccessToken } from '@/utils/token';

export default function Boarder() {
  const userStore = useUserStore(s => s);
  const { role, phoneNumber, clear, setRole } = userStore;
  const { success, error: showError } = useAlertStore();
  const apolloClient = useApolloClient();
  const router = useRouter();
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string>('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log('Current role:', role);
    console.log('Current phoneNumber:', phoneNumber);
    if (role === 'BOARDER') {
      console.log('User is a BOARDER, auto-verifying phone');
      setIsPhoneVerified(true);
      setVerifiedPhoneNumber(phoneNumber || '인증 완료');
      return;
    }
    const savedPhoneVerified = localStorage.getItem('boarderPhoneVerified');
    const savedPhoneNumber = localStorage.getItem('boarderPhoneNumber');
    
    if (savedPhoneVerified === 'true' && savedPhoneNumber) {
      console.log('Restoring boarder phone verification from localStorage');
      setIsPhoneVerified(true);
      setVerifiedPhoneNumber(savedPhoneNumber);
    }
  }, [role, phoneNumber])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await AuthService.logout(apolloClient);
      // clear local access token and Apollo cache
      try {
        clearAccessToken();
        await apolloClient.clearStore();
      } catch (e) {
        console.error('Error clearing client state on logout:', e);
      }
  clear();
  try { localStorage.removeItem('nuri-user'); } catch (e) { /* ignore */ }
      success('로그아웃되었습니다.');
      router.push('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      showError('로그아웃 중 오류가 발생했습니다.');
      setIsLoggingOut(false)
    }
    setShowLogoutModal(false)
  }

  const handlePhoneVerifySuccess = (callNumber: string, agency: string) => {
    setIsPhoneVerified(true);
    setVerifiedPhoneNumber(callNumber);
    setShowPhoneAuth(false);
    
    localStorage.setItem('boarderPhoneVerified', 'true');
    localStorage.setItem('boarderPhoneNumber', callNumber);
    
    // 하숙생 role로 즉시 업데이트
    setRole('INTERNATIONAL_STUDENT');
    
    // 인증 성공 메시지
    success('하숙생 인증이 완료되었습니다.');
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
        <S.Title>하숙생 인증</S.Title>

        {!isPhoneVerified ? (
          <S.AuthSection>
            <S.AuthTitle>휴대폰 인증</S.AuthTitle>
            <S.AuthDescription>
              하숙생 인증을 위해 휴대폰 인증이 필요합니다.
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
          <S.AuthSection>
            <S.AuthTitle>인증 완료</S.AuthTitle>
            <S.AuthDescription>
              하숙생 인증이 완료되었습니다.
              <br />
              인증 번호: {verifiedPhoneNumber}
            </S.AuthDescription>
          </S.AuthSection>
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
          role="BOARDER"
        />
      )}
      <Alert />
    </S.Con>
  );
}
