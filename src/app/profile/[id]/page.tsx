'use client'

import Image from 'next/image';
import * as S from './style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import {useState, useRef, useEffect} from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import {useRouter, useParams} from 'next/navigation';
import { useQuery } from '@apollo/client';
import NProgress from 'nprogress';
import { useApolloClient } from '@apollo/client';
import { followUser, unfollowUser } from '@/services/profile';
import { ProfileGQL } from '@/services/profile';
import { UserProfileResponseDto } from '@/types/profile';


export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const client = useApolloClient();
    
    const [selected, setSelected] = useState(1);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { data, loading, error } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
        ProfileGQL.QUERIES.GET_USER_PROFILE,
        {
          variables: { userId },
          skip: !userId,
          fetchPolicy: 'network-only',
          onCompleted: (data) => {
            setIsFollowing(data.getUserProfile.isFollowing);
          },
        }
      );
    
      const profile = data?.getUserProfile ?? {
        postCount: 0,
        followerCount: 0,
        followingCount: 0,
        profile: '/profile/profile.svg',
        userId: userId || '알 수 없음',
        introduce: '소개글이 없습니다.',
      };

      const handleFollowToggle = async () => {
        try {
          if (isFollowing) {
            const success = await unfollowUser(client, userId);
            if (success) setIsFollowing(false);
          } else {
            const success = await followUser(client, userId);
            if (success) setIsFollowing(true);
          }
        } catch (e) {
          console.error("팔로우 요청 실패:", e);
        }
      };


    const postList = [
        {
            id: 1,
            user: userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        },
        {
            id: 2,
            user: userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        },
        {
            id: 3,
            user: userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        },
        {
            id: 4,
            user: userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        },
        {
            id: 5,
            user: userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        },
        {
            id: 6,
            user: profile.userId,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.profile,
        }
    ];

    const handleClick = (id: number) => {
        router.push(`/post/${id}`)
    }

    const handleBtnClick = (path: string) => {
        NProgress.start()
        router.push(path)
    }

    return (
        <S.ProfileWrapper>
            <S.Profile>
                <S.ProfileImage>
                    <Image
                        src={profile.profile}
                        alt="프로필"
                        fill
                        style={{ objectFit: 'cover', zIndex: 0 }}
                    />
                </S.ProfileImage>

                <S.ProfileMain>
                    <S.ButtonRow>
                        <S.Nickname>{userId}</S.Nickname>
                        <S.Button>
                            <Square
                                text={isFollowing ? "언팔로우" : "팔로우"}
                                status={!isFollowing}
                                onClick={handleFollowToggle}
                                width="120px"
                            />
                            <Square
                                text="메시지"
                                status={true}
                                onClick={() => handleBtnClick(`/message/${userId}`)}
                                width="120px"
                            />
                        </S.Button>
                    </S.ButtonRow>
                    <S.Stats>
                        <S.Stat>
                            <S.StatValue>{profile.postCount}</S.StatValue>
                            <S.StatLabel>게시물</S.StatLabel>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowerModal(true)}>
                            <S.StatValue1>{profile.followerCount}</S.StatValue1>
                            <S.StatLabelF>팔로워</S.StatLabelF>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowModal(true)}>
                            <S.StatValue2>{profile.followingCount}</S.StatValue2>
                            <S.StatLabelF2>팔로잉</S.StatLabelF2>
                        </S.Stat>
                    </S.Stats>
                    <S.introduction>{profile.introduce}</S.introduction>
                </S.ProfileMain>
            </S.Profile>
            <S.Side isSelected={selected}>
                <S.Tab>
                    <p onClick={() => setSelected(1)}>하숙집</p>
                </S.Tab>
                <S.Tab2>
                    <p onClick={() => setSelected(2)}>게시물</p>
                </S.Tab2>
            </S.Side>
            <S.PostList>
                {selected === 1 && (
                    <S.List1>
                        {postList.map(post => (
                            <PostItem
                                key={post.id}
                                {...post}
                                onClick={handleClick}
                                hideProfile
                            />
                        ))}
                    </S.List1>
                )}
                {selected === 2 && (
                    <S.List2>
                        {postList.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </S.List2>
                )}
            </S.PostList>
            {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={userId} />}
            {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={userId} />}
        </S.ProfileWrapper>
    );
}
