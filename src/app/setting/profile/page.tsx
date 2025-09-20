'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import Image from 'next/image'
import SettingNav from '@/components/ui/settingNav'
import Logout from '@/components/ui/logout'
import Leave from '@/components/ui/leave'
import Follow from '@/components/ui/follow'
import SettingHeader from '@/components/ui/settingHeader'
import Square from '@/components/ui/button/square'
import { useUserStore } from '@/store/user'
import { AuthService } from '@/services/auth';
import { useApollo } from '@/lib/apolloClient';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { userId, name, profile, email, clear, id } = useUserStore(s => s);
    const apolloClient = useApollo();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    
    const [profileImg, setProfileImg] = useState(profile || '/profile/profile.svg')
    const [userid, setUserid] = useState(userId || '')
    const [nickname, setNickname] = useState(name || '')
    const [introduction, setIntroduction] = useState('소개글이 없습니다.')
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
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

    useEffect(() => {
        if (profile) setProfileImg(profile)
        if (userId) setUserid(userId)
        if (name) setNickname(name)
    }, [profile, userId, name])

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setProfileImg(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <S.Container>
            {isMobile && <SettingHeader />}
            <S.Sidebar>
                <SettingNav
                    onLogoutClick={() => setShowLogoutModal(true)}
                    onLeaveClick={() => setShowLeaveModal(true)}
                />

            </S.Sidebar>

            <S.MainContent>
                <S.Title>프로필 편집</S.Title>
                <S.ProfileRow>
                    <S.ProfileImageWrap>
                        <Image
                            src={profileImg}
                            alt="프로필"
                            fill
                            style={{ objectFit: 'cover', zIndex: 0 }}
                            unoptimized
                        />
                    </S.ProfileImageWrap>

                    <S.ProfileInfo>
                        <S.Button>
                            <S.NameInput
                                placeholder="이름"
                                value={userid}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserid(e.target.value)}
                            />
                            <S.NickInput
                                placeholder="닉네임"
                                value={nickname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                            />
                        </S.Button>
                        <S.Change>
                            <S.ChangePhotoBtn as="label" htmlFor="profileUpload">
                                사진 변경
                            </S.ChangePhotoBtn>
                            <input
                                type="file"
                                id="profileUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </S.Change>
                    </S.ProfileInfo>
                </S.ProfileRow>

                <S.Intro>소개</S.Intro>
                <S.BioSection>
                    <S.BioInput
                        placeholder="소개 글을 작성해주세요."
                        value={introduction}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIntroduction(e.target.value)}
                    />
                </S.BioSection>
                <Square text='저장하기' status={true} width='100%'/>
            </S.MainContent>
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
            {showFollowerModal && (
                <Follow onClose={() => setShowFollowerModal(false)} userId={userid} />
            )}

        </S.Container>
    )
}
