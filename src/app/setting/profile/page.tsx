'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style'
import Image from 'next/image'
import SettingNav from '@/components/ui/settingNav'
import Logout from '@/components/ui/logout'
import Leave from '@/components/ui/leave'
import Follow from '@/components/ui/follow'
import SettingHeader from '@/components/ui/settingHeader'

const initialUser = {
    userid: 'Happy_y',
    userProfile: '/profile/profile.svg',
    introduction: '하이이ㅣㅣ',
}

export default function ProfilePage() {
    const [profileImg, setProfileImg] = useState(initialUser.userProfile)
    const [userid, setUserid] = useState(initialUser.userid)
    const [nickname, setNickname] = useState('해피해피')
    const [introduction, setIntroduction] = useState(initialUser.introduction)
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
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
            </S.MainContent>
            {showLogoutModal && <Logout
                onLogout={handleLogout}
                onClose={() => setShowLogoutModal(false)}
            />}
            {showLeaveModal && (
                <Leave
                    onLeave={() => {
                        setShowLeaveModal(false)
                    }}
                    onClose={() => setShowLeaveModal(false)}
                />
            )}
            {showFollowerModal && (
                <Follow onClose={() => setShowFollowerModal(false)} />
            )}

        </S.Container>
    )
}
