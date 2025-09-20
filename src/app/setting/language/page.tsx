'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import Logout from '@/components/ui/logout'
import Leave from '@/components/ui/leave'
import SettingHeader from '@/components/ui/settingHeader'
import Square from '@/components/ui/button/square'
import { useUserStore } from '@/store/user';
import { AuthService } from '@/services/auth';
import { useApollo } from '@/lib/apolloClient';
import { useRouter } from 'next/navigation';

export default function LanguagePage() {
    const { clear, id } = useUserStore(s => s);
    const apolloClient = useApollo();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [selectedLang, setSelectedLang] = useState<'ko' | 'en'>('ko')
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false)

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
            alert('로그인이 필요합니다.');
            router.push('/');
        }
    }, [isClient, id, router, isLoggingOut])

    // 클라이언트 사이드 로딩 중이거나 로그인하지 않은 경우
    if (!isClient || (isClient && !id)) {
        return <div>로딩 중...</div>;
    }

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await AuthService.logout(apolloClient);
            clear(); // 사용자 스토어 초기화
            alert('로그아웃되었습니다.');
            router.push('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
            setIsLoggingOut(false)
        }
        setShowLogoutModal(false)
    }

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
                <S.Title>언어 설정</S.Title>
                {/* <S.SearchBox>
                    <S.SearchText
                        type="text"
                        placeholder='검색'
                    />
                </S.SearchBox> */}
                
                <S.RadioGroup>
                    <S.RadioLabel>
                        <S.LangName>한국어</S.LangName>
                        <S.Radio
                            type="radio"
                            name="lang"
                            value="ko"
                            checked={selectedLang === 'ko'}
                            onChange={() => setSelectedLang('ko')}
                        />
                    </S.RadioLabel>

                    <S.RadioLabel>
                        <S.LangName>English</S.LangName>
                        <S.Radio
                            type="radio"
                            name="lang"
                            value="en"
                            checked={selectedLang === 'en'}
                            onChange={() => setSelectedLang('en')}
                        />
                    </S.RadioLabel>
                </S.RadioGroup>

                <Square
                    text="저장하기"
                    status={true}
                    width={isMobile ? '100%' : '50vw'}
                />
            </S.ContentArea>
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

        </S.Layout>
    )
}
