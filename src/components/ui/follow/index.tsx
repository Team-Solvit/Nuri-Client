import React, { useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import { useQuery, useMutation } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { FollowUserInfo } from '@/types/profile';

interface FollowProps {
    onClose: () => void;
    userId: string;
}

export default function Follow({ onClose, userId }: FollowProps) {
    // const [search, setSearch] = useState('');

    const { data: followingData, refetch: refetchFollowing } = useQuery(ProfileGQL.QUERIES.GET_FOLLOWING, {
        variables: { userId },
    });

    const [followUser] = useMutation(ProfileGQL.MUTATIONS.FOLLOW);
    const [unfollowUser] = useMutation(ProfileGQL.MUTATIONS.UNFOLLOW);

    const following = followingData?.getFollowingInfo ?? [];

    // const filtered = followers.filter(f => f.userId.includes(search));
    const filtered: FollowUserInfo[] = following;

    const isFollowing = (targetId: string) => following.some((f: FollowUserInfo) => f.userId === targetId);

    const handleFollowToggle = async (targetId: string) => {
        if (isFollowing(targetId)) {
            await unfollowUser({
                variables: { userId: targetId },
                refetchQueries: [
                  { query: ProfileGQL.QUERIES.GET_FOLLOWING, variables: { userId } },
                ],
              });
        } else {
            await followUser({
                variables: { userId: targetId },
                refetchQueries: [
                  { query: ProfileGQL.QUERIES.GET_FOLLOWING, variables: { userId } },
                ],
              });
        }
    };

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
                            <S.Item key={f.id}>
                                <S.ProfileImg>
                                    <Image src={f.profile} alt='프로필' width={55} height={55} />
                                </S.ProfileImg>
                                <S.Info>
                                    <S.Username>{f.userId}</S.Username>
                                    <S.Name>{f.userId}</S.Name>
                                </S.Info>
                                <S.DeleteBtn onClick={() => handleFollowToggle(f.userId)}>
                                    {isFollowing(f.userId) ? '팔로잉' : '팔로우'}
                                </S.DeleteBtn>
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
