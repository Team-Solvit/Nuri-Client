'use client'

import * as S from './style';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import SettingNav from '@/components/ui/settingNav';
import Logout from '@/components/ui/logout';
import Leave from '../leave';

export default function SettingHeader() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    onLogout={() => {
                        setLogoutModalOpen(false);
                    }}
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
