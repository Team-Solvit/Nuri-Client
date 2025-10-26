import React, { useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import { useQuery, useMutation } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { FollowUserInfo } from '@/types/profile';
import { useRouter } from 'next/navigation';

interface FollowProps {
    onClose: () => void;
    userId: string;
}

export default function Follow({ onClose, userId }: FollowProps) {
    // const [search, setSearch] = useState('');
    const router = useRouter();

    const { data: followingData, refetch: refetchFollowing } = useQuery(ProfileGQL.QUERIES.GET_FOLLOWING, {
        variables: { userId },
    });

    const [followUser] = useMutation(ProfileGQL.MUTATIONS.FOLLOW);
    const [unfollowUser] = useMutation(ProfileGQL.MUTATIONS.UNFOLLOW);

    const following = followingData?.getFollowingInfo ?? [];

    // const filtered = followers.filter(f => f.userId.includes(search));
    const filtered: FollowUserInfo[] = following;

    const isFollowing = (targetId: string) => following.some((f: FollowUserInfo) => f.userId === targetId);

    // URL 유효성 검사 함수
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    // 프로필 이미지 URL 변환 함수
    const getProfileImageUrl = (profile: string): string => {
        if (!profile) return '/profile/profile.svg';
        
        // 이미 완전한 URL이면 그대로 반환
        if (isValidUrl(profile)) {
            return profile;
        }
        
        // 파일 ID인 경우 CDN URL로 변환
        return `https://cdn.solvit-nuri.com/file/${profile}`;
    };

    const handleProfileClick = (targetUserId: string) => {
        onClose();
        router.push(`/profile/${targetUserId}`);
    };

    // const handleFollowToggle = async (targetId: string) => {
    //     if (isFollowing(targetId)) {
    //         await unfollowUser({
    //             variables: { userId: targetId },
    //             refetchQueries: [
    //               { query: ProfileGQL.QUERIES.GET_FOLLOWING, variables: { userId } },
    //             ],
    //           });
    //     } else {
    //         await followUser({
    //             variables: { userId: targetId },
    //             refetchQueries: [
    //               { query: ProfileGQL.QUERIES.GET_FOLLOWING, variables: { userId } },
    //             ],
    //           });
    //     }
    // };

    return (
        <S.Overlay onClick={onClose}>
            <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
                <S.Container>
                    <S.Title>팔로잉</S.Title>

                    {/* <S.SearchBox>
                        <Image
                            src='/icons/search.svg'
                            alt="search"
                            width={22}
                            height={22}
                        />
                        <S.SearchInput
                            placeholder="검색어를 입력하세요."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </S.SearchBox> */}

                    <S.List>
                        {filtered.map((f: FollowUserInfo) => (
                            <S.Item key={f.id} onClick={() => handleProfileClick(f.userId)} style={{ cursor: 'pointer' }}>
                                <S.ProfileImg>
                                    {f.profile && getProfileImageUrl(f.profile) !== '/profile/profile.svg' ? (
                                        <Image 
                                            src={getProfileImageUrl(f.profile)} 
                                            alt='프로필' 
                                            width={55} 
                                            height={55}
                                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: 55,
                                                height: 55,
                                                borderRadius: '50%',
                                                background: '#e0e0e0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: 20,
                                                color: '#666',
                                            }}
                                        >
                                            {f.userId && f.userId[0] ? f.userId[0] : '?'}
                                        </div>
                                    )}
                                </S.ProfileImg>
                                <S.Info>
                                    <S.Username>{f.userId}</S.Username>
                                    <S.Name>{f.userId}</S.Name>
                                </S.Info>
                                {/* <S.DeleteBtn onClick={() => handleFollowToggle(f.userId)}>
                                    {isFollowing(f.userId) ? '팔로잉' : '팔로우'}
                                </S.DeleteBtn> */}
                            </S.Item>
                        ))}
                    </S.List>

                    <S.ConfirmButtonWrap>
                        <Square
                            text='확인'
                            status={true}
                            width='100%'
                            onClick={onClose}
                        />
                    </S.ConfirmButtonWrap>
                </S.Container>
            </S.ModalWrapper>
        </S.Overlay>
    );
}
