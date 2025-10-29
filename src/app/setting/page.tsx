'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import SettingHeader from '@/components/ui/settingHeader'
import Image from 'next/image'
import Square from '@/components/ui/button/square'
import { useMutation } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { useUserStore } from '@/store/user';
import { AuthService } from '@/services/auth';
import { useApollo } from '@/lib/apolloClient';
import { clearAccessToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import Logout from '@/components/ui/logout';
import Leave from '@/components/ui/leave';
import { useAlertStore } from '@/store/alert';
import Alert from '@/components/ui/alert';

export default function SettingPage() {
    const { email, phoneNumber, id, clear } = useUserStore(s => s);
    const apolloClient = useApollo();
    const router = useRouter();
    const { success, error } = useAlertStore();
    const [isMobile, setIsMobile] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showLeaveModal, setShowLeaveModal] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const contactData = [
        { type: 'phone', value: phoneNumber || '전화번호 없음', icon: '/icons/call.svg' },
        { type: 'email', value: email || '이메일 없음', icon: '/icons/mail.svg' },
    ]

    const [changePassword] = useMutation(ProfileGQL.MUTATIONS.CHANGE_PASSWORD);

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await AuthService.logout(apolloClient);
            // clear local access token and Apollo cache
            clearAccessToken();
            await apolloClient.clearStore();
            // clear persisted user store
            clear();
            // remove persisted zustand storage key
            try { localStorage.removeItem('nuri-user'); } catch (e) { /* ignore */ }
            success('로그아웃되었습니다.');
            router.push('/');
        } catch (err) {
            console.error('로그아웃 실패:', err);
            error('로그아웃 중 오류가 발생했습니다.');
            setIsLoggingOut(false)
        }
        setShowLogoutModal(false)
    };

    const handleChangePassword = async () => {
        if (newPw !== confirmPw) {
            error('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const { data } = await changePassword({
                variables: { passwordRequestDto: { password: currentPw, newPassword: newPw } },
            });
            if (data.changePassword) {
                success('비밀번호가 성공적으로 변경되었습니다.');
            } else {
                error('비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            error('오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        setIsClient(true)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 로그인 상태 확인 (클라이언트 사이드에서만)
    useEffect(() => {
        if (isClient && !id && !isLoggingOut) {
            error('로그인이 필요합니다.');
            router.push('/');
            return;
        }
    }, [isClient, id, router, isLoggingOut, error])
    return (
        <S.Layout>
            {isMobile && <SettingHeader />}

            <S.NavArea>
                <SettingNav 
                    onLogoutClick={() => setShowLogoutModal(true)}
                    onLeaveClick={() => setShowLeaveModal(true)}
                />
            </S.NavArea>

            <S.ContentArea>
                <S.Title>개인 정보 설정</S.Title>

                <S.Section>
                    <S.SectionTitle>연락처 정보</S.SectionTitle>
                    <S.ContactList>
                        {contactData.map((contact, index) => (
                            <S.ContactItem key={index}>
                                <S.ContactInfo>
                                  <Image src={contact.icon} alt="icon" width={20} height={20} />
                                    <S.ContactText>{contact.value}</S.ContactText>
                                </S.ContactInfo>
                            </S.ContactItem>
                        ))}
                    </S.ContactList>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>비밀번호 변경</S.SectionTitle>
                    <S.InputBox>
                        <S.Input
                            type="password"
                            placeholder="현재 비밀번호"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                        />
                        <S.Input
                            type="password"
                            placeholder="새 비밀번호"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                        />
                        <S.Input
                            type="password"
                            placeholder="새 비밀번호 확인"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                        />
                    </S.InputBox>
                    <Square
                        text="비밀번호 변경"
                        status={true}
                        width="100%"
                        onClick={handleChangePassword}
                    />
                </S.Section>
            </S.ContentArea>
            
            {showLogoutModal && (
                <Logout
                    onLogout={handleLogout}
                    onClose={() => setShowLogoutModal(false)}
                />
            )}
            {showLeaveModal && (
                <Leave
                    onLeave={() => {
                        console.log('회원탈퇴 처리 완료')
                        setShowLeaveModal(false)
                    }}
                    onClose={() => setShowLeaveModal(false)}
                />
            )}
            <Alert />
        </S.Layout>
    )
}
