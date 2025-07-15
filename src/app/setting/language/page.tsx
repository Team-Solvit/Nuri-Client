'use client'

import React, { useState } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import Logout from '@/components/ui/logout'

export default function LanguagePage() {
    const [selectedLang, setSelectedLang] = useState<'ko' | 'en'>('ko')
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        console.log('로그아웃 처리 완료')
        setShowLogoutModal(false)
    }

    return (
        <S.Layout>
            <S.NavArea>
                <SettingNav onLogoutClick={() => setShowLogoutModal(true)} />
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

        </S.Layout>
    )
}
