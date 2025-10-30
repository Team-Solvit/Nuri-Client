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
    viewerId?: string;
}

export default function Follow({ onClose, userId, viewerId }: FollowProps) {
    const router = useRouter();
    const { data: followingData } = useQuery(
      ProfileGQL.QUERIES.GET_FOLLOWING,
      { variables: { userId } }
    );
    const { data: myFollowingData, refetch: refetchMyFollowing } = useQuery(
      ProfileGQL.QUERIES.GET_FOLLOWING,
      { variables: { userId: viewerId! }, skip: !viewerId }
    );

    const [followUser, { loading: followLoading, error: followError }] =
      useMutation(ProfileGQL.MUTATIONS.FOLLOW);
    const [unfollowUser, { loading: unfollowLoading, error: unfollowError }] =
      useMutation(ProfileGQL.MUTATIONS.UNFOLLOW);

    const following = followingData?.getFollowingInfo ?? []; 
    const myFollowing = myFollowingData?.getFollowingInfo ?? [];

    const filtered: FollowUserInfo[] = following;

    const isFollowing = (targetId: string) =>
        (viewerId ? myFollowing : following).some((f: FollowUserInfo) => f.userId === targetId);

    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const getProfileImageUrl = (profile: string): string => {
        if (!profile) return '/profile/profile.svg';
        if (isValidUrl(profile)) {
            return profile;
        }
        return `https://cdn.solvit-nuri.com/file/${profile}`;
    };

    const handleProfileClick = (targetUserId: string) => {
        onClose();
        router.push(`/profile/${targetUserId}`);
    };

    return (
        <S.Overlay onClick={onClose}>
            <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
                <S.Container>
                    <S.Title>팔로잉</S.Title>

                    <S.List>
                        {filtered.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                팔로잉이 없습니다.
                            </div>
                        ) : (
                            filtered.map((f: FollowUserInfo) => (
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
                                    </S.Info>
                                </S.Item>
                            ))
                        )}
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
