'use client'

import React from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import Image from 'next/image'
import Square from '@/components/ui/button/square'

const contactData = [
    { type: 'phone', value: '010-1234-5678', icon: '/icons/call.svg' },
    { type: 'email', value: 'example@email.com', icon: '/icons/mail.svg' },
]

export default function SettingPage() {
    return (
        <S.Layout>
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
                                <S.Delete>삭제</S.Delete>
                            </S.ContactItem>
                        ))}
                    </S.ContactList>
                    <S.AddContact>+ 새 연락처 추가</S.AddContact>
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
                        width='44vw'
                    />
                </S.Section>
            </S.ContentArea>
        </S.Layout>
    )
}
