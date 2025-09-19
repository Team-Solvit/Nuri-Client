'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import SettingNav from '@/components/ui/settingNav'
import SettingHeader from '@/components/ui/settingHeader'
import Image from 'next/image'
import Square from '@/components/ui/button/square'
import { useMutation } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';

const contactData = [
    { type: 'phone', value: '010-1234-5678', icon: '/icons/call.svg' },
    { type: 'email', value: 'example@email.com', icon: '/icons/mail.svg' },
]

export default function SettingPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const [changePassword] = useMutation(ProfileGQL.MUTATIONS.CHANGE_PASSWORD);

    const handleChangePassword = async () => {
        if (newPw !== confirmPw) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const { data } = await changePassword({
                variables: { passwordRequestDto: { password: currentPw, newPassword: newPw } },
            });
            if (data.changePassword) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
            } else {
                alert('비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

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
                        width="44vw"
                        onClick={handleChangePassword}
                    />
                </S.Section>
            </S.ContentArea>
        </S.Layout>
    )
}
