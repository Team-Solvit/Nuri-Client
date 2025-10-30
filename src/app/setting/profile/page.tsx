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
import { clearAccessToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { ProfileGQL, updateProfile } from '@/services/profile';
import { UserProfileResponseDto } from '@/types/profile';
import { useAlertStore } from '@/store/alert';
import Alert from '@/components/ui/alert';
import { useFileUpload } from '@/hooks/useFileUpload';

export default function ProfilePage() {
	const { userId, name, profile, clear, id } = useUserStore(s => s);
	const apolloClient = useApollo();
    const router = useRouter();
    const { success, error } = useAlertStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const { upload, loading: uploadingImage } = useFileUpload();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Zustand 복원 완료 후 실행
        const unsub = useUserStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });
        setHydrated(true); // 혹시 이미 복원되어 있을 경우 대비
        return unsub;
    }, []);


    const convertToCdnUrl = (uuid: string) => {
        if (!uuid) return '';
        if (uuid.startsWith('http')) return uuid;
        if (uuid.startsWith('blob:')) return uuid;

        const rawCdn =
            process.env.NEXT_PUBLIC_IMAGE_CDN_URL ||
            process.env.NEXT_PUBLIC_IMAGE_URL?.replace('/upload', '') ||
            '';
        const cdnBase = rawCdn.replace(/\/+$/, '');
        const cleanUuid = uuid.replace(/^\/+/, '');

        return cdnBase ? `${cdnBase}/${cleanUuid}` : cleanUuid;
    };


    const { data: profileData } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
        ProfileGQL.QUERIES.GET_USER_PROFILE,
        {
            variables: { userId: userId || '' },
            skip: !userId,
            fetchPolicy: 'network-only',
        }
    );

    const [profileImg, setProfileImg] = useState(profile || '')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [userid, setUserid] = useState(userId || '')
    const [nickname, setNickname] = useState(name || '')
    const [introduction, setIntroduction] = useState('')

    const [initialValues, setInitialValues] = useState({
        profileImg: profile || '',
        userid: userId || '',
        nickname: name || '',
        introduction: ''
    })
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

    useEffect(() => {
        const gqlProfile = profileData?.getUserProfile?.profile;
        const gqlIntro = profileData?.getUserProfile?.introduce;

        if (gqlProfile && gqlProfile !== profileImg) {
            setProfileImg(convertToCdnUrl(gqlProfile));
        } else if (profile && profile !== profileImg) {
            setProfileImg(convertToCdnUrl(profile));
        }

        if (userId) setUserid(userId);
        if (name) setNickname(name);
        if (gqlIntro && gqlIntro !== '소개글이 없습니다.') {
            setIntroduction(gqlIntro);
        }

        if (profile || gqlProfile || userId || name || gqlIntro) {
            setInitialValues({
                profileImg: convertToCdnUrl(gqlProfile || profile || ''),
                userid: userId || '',
                nickname: name || '',
                introduction: (gqlIntro && gqlIntro !== '소개글이 없습니다.') ? gqlIntro : '',
            });
        }
    }, [profile, userId, name, profileData]);


    useEffect(() => {
        if (!hydrated) return;
        if (typeof window !== 'undefined' && !id && !isLoggingOut) {
            error('로그인이 필요합니다.');
            router.push('/');
        }
    }, [hydrated, id, router, isLoggingOut, error]);



    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
                await AuthService.logout(apolloClient);
                // clear local access token and Apollo cache
                try {
                    clearAccessToken();
                    await apolloClient.clearStore();
                } catch (e) {
                    console.error('Error clearing client state on logout:', e);
                }
                // clear persisted user store
                clear();
                try { localStorage.removeItem('nuri-user'); } catch (e:unknown) {
	                console.error(e) }
                success('로그아웃되었습니다.');
                router.push('/');
        } catch (err) {
            console.error('로그아웃 실패:', err);
            error('로그아웃 중 오류가 발생했습니다.');
            setIsLoggingOut(false)
        }
        setShowLogoutModal(false)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedFile(file)
        const previewUrl = URL.createObjectURL(file);
        setProfileImg(previewUrl);
        setTimeout(() => URL.revokeObjectURL(previewUrl), 0);
    }

    const handleSave = async () => {
        const hasChanges =
            profileImg !== initialValues.profileImg ||
            userid !== initialValues.userid ||
            nickname !== initialValues.nickname ||
            introduction !== initialValues.introduction;

        if (!hasChanges) {
            error('변경된 내용이 없습니다.');
            return;
        }

        try {
            let finalProfile = profileImg;
            if (selectedFile) {
                const [cdnUrl] = await upload([selectedFile]);
                if (!cdnUrl) throw new Error('이미지 업로드 실패');
                finalProfile = cdnUrl;
                setProfileImg(cdnUrl);
                setSelectedFile(null);
            }
            const updateResult = await updateProfile(apolloClient, {
                introduce: introduction,
                profile: finalProfile,
                userId: userid,
                username: nickname
            });

            if (updateResult) {
                success('프로필이 성공적으로 저장되었습니다.');
                const currentUser = useUserStore.getState();
                currentUser.setAuth({
                    id: currentUser.id || '',
                    userId: userid,
                    country: currentUser.country || '',
                    language: currentUser.language || '',
                    name: nickname,
                    email: currentUser.email || '',
                    phoneNumber: currentUser.phoneNumber || '',
                    profile: finalProfile,
                    role: currentUser.role || '',
                });

                setInitialValues({
                    profileImg: finalProfile,
                    userid,
                    nickname,
                    introduction
                });
                router.push('/profile');
            } else {
                error('프로필 저장에 실패했습니다.');
            }
        } catch (err) {
            console.error('프로필 저장 오류:', err);
            error('프로필 저장 중 오류가 발생했습니다.');
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
                        {profileImg ? (
                            <Image
                                src={profileImg}
                                alt="프로필"
                                fill
                                style={{ objectFit: 'cover', zIndex: 0 }}
                                unoptimized
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: 24,
                                    color: '#666',
                                }}
                            >
                                {(userid && userid[0]) || '?'}
                            </div>
                        )}
                    </S.ProfileImageWrap>

                    <S.ProfileInfo>
                        <S.Button>
                            <S.NameInput
                                placeholder="아이디"
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
                <Square text={uploadingImage ? '업로드 중...' : '저장하기'} status={!uploadingImage} width='100%' onClick={handleSave} />
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
                <Follow onClose={() => setShowFollowerModal(false)} userId={userid} />
            )}
            <Alert />

        </S.Container>
    )
}
