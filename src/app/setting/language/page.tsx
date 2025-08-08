'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import Logout from '@/components/ui/logout'
import Leave from '@/components/ui/leave'
import SettingHeader from '@/components/ui/settingHeader'

export default function LanguagePage() {
    const [selectedLang, setSelectedLang] = useState<'ko' | 'en'>('ko')
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleLogout = () => {
        console.log('로그아웃 처리 완료')
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
                <S.SearchBox>
                    <S.SearchText
                        type="text"
                        placeholder='검색'
                    />
                </S.SearchBox>

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
