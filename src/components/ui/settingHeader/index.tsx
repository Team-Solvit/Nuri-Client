'use client'

import * as S from './style';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import SettingNav from '@/components/ui/settingNav';
import Logout from '@/components/ui/logout';
import Leave from '../leave';
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth';
import { useApolloClient } from '@apollo/client';

export default function SettingHeader() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
    const { clear } = useUserStore();
    const { success, error: showError } = useAlertStore();
    const router = useRouter();
    const client = useApolloClient();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await AuthService.logout(client);
            clear();
            setLogoutModalOpen(false);
            // 상태 업데이트를 위한 짧은 지연 후 리다이렉트
            setTimeout(() => {
                success('로그아웃되었습니다.');
                router.push('/');
            }, 100);
        } catch (err) {
            console.error('로그아웃 실패:', err);
            showError('로그아웃 중 오류가 발생했습니다.');
            setLogoutModalOpen(false);
        }
    };

    return (
        <>
            <S.HeaderContainer>
                {isMobile && (
                    <Image
                        src="/icons/ham.svg"
                        alt="메뉴"
                        width={25}
                        height={25}
                        style={{ objectFit: 'cover', zIndex: 0, margin: '1.2rem', cursor: 'pointer' }}
                        onClick={() => setIsNavOpen(true)}
                    />
                )}
            </S.HeaderContainer>

            {isMobile && isNavOpen && (
                <SettingNav
                    onLogoutClick={() => {
                        setIsNavOpen(false);
                        setLogoutModalOpen(true);
                    }}
                    onLeaveClick={() => {
                        setIsNavOpen(false);
                        setLeaveModalOpen(true);
                    }}
                    onClose={() => setIsNavOpen(false)}
                />
            )}

            {isLogoutModalOpen && (
                <Logout
                    onLogout={handleLogout}
                    onClose={() => setLogoutModalOpen(false)}
                />
            )}

            {isLeaveModalOpen && (
                <Leave
                    onClose={() => setLeaveModalOpen(false)}
                />
            )}
        </>
    )
}
