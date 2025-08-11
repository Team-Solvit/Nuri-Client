'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import SettingHeader from '@/components/ui/settingHeader'
import Image from 'next/image'
import Square from '@/components/ui/button/square'

const contactData = [
    { type: 'phone', value: '010-1234-5678', icon: '/icons/call.svg' },
    { type: 'email', value: 'example@email.com', icon: '/icons/mail.svg' },
]

export default function SettingPage() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <S.Layout>
            {isMobile && <SettingHeader />}

            <S.NavArea>
                <SettingNav />
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
                        <S.Input placeholder="현재 비밀번호를 입력해주세요" />
                        <S.Input placeholder="새로운 비밀번호를 입력해주세요" />
                        <S.Input placeholder="새로운 비밀번호를 다시 입력해주세요" />
                    </S.InputBox>
                    <Square
                        text='비밀번호 변경'
                        status={true}
                        width={isMobile ? '90vw' : '44vw'}
                    />
                </S.Section>
            </S.ContentArea>
        </S.Layout>
    )
}
