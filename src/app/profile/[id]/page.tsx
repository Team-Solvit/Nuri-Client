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
import { UserProfileResponseDto, UserPostListResponse, UserPost } from '@/types/profile';
import { useUserStore } from '@/store/user';
import { useCallback } from 'react';


export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const client = useApolloClient();
    const { userId: currentUserId, id: currentId } = useUserStore(s => s);
    
    const [selected, setSelected] = useState(1);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

    const boardingHouseList = [
        {
          id: 1,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        },
        {
          id: 2,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        },
        {
          id: 3,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        },
        {
          id: 4,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        },
        {
          id: 5,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        },
        {
          id: 6,
          user: '해ㅠ피',
          title: '해피해피하숙',
          region: '강서구',
          price: '30',
          thumbnail: '/post/post-example.png',
          userProfile: '/profile/profile.svg',
        }
      ];

    const isOwnProfile = currentUserId === userId;
    
    useEffect(() => {
        if (isOwnProfile) {
            router.replace('/profile');
        }
    }, [isOwnProfile, router]);

    const { data, loading, error } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
        ProfileGQL.QUERIES.GET_USER_PROFILE,
        {
          variables: { userId },
          skip: !userId,
          fetchPolicy: 'network-only',
        }
      );

    const { data: postData, loading: postLoading, error: postError, fetchMore } = useQuery<UserPostListResponse>(
        ProfileGQL.QUERIES.GET_USER_POST_LIST,
        {
            variables: { 
                userPostListReadInput: { 
                    userId: isOwnProfile ? '' : userId,
                    start: 0 
                } 
            },
            skip: selected !== 2,
            errorPolicy: 'all',
            fetchPolicy: 'cache-first',
            onCompleted: (data) => {
                const posts = data?.getUserPostList || [];
                const postList = posts.map(convertToPostItem);
                setAllPosts(postList);
                setHasMore(posts.length === 20);
            }
        }
    );

    console.log('게시물 요청 변수:', {
        isOwnProfile,
        userId: isOwnProfile ? '' : (data?.getUserProfile?.userId || ''),
        start: 0,
        selected
    });
    useEffect(() => {
      if (data?.getUserProfile) {
        setIsFollowing(data.getUserProfile.isFollowing);
        console.log('data?.getUserProfile?.userId:', data.getUserProfile.userId);
      }
    }, [data]);
    
      const profile = data?.getUserProfile ?? {
        postCount: 0,
        followerCount: 0,
        followingCount: 0,
        profile: '',
        userId: '없는 사용자입니다',
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

    const convertToPostItem = (post: UserPost) => ({
        id: parseInt(post.postId) || Math.random(),
        user: userId,
        title: '게시물',
        region: '지역',
        price: '0',
        thumbnail: post.thumbnail || '/post/post-example.png',
        userProfile: profile.profile,
    });

    const loadMorePosts = useCallback(async () => {
        if (isLoadingMore || !hasMore || allPosts.length === 0) return;
        setIsLoadingMore(true);
        try {
            const result = await fetchMore({
                variables: {
                    userPostListReadInput: { 
                        userId: isOwnProfile ? '' : userId,
                        start: allPosts.length + 1
                    }
                }
            });
            const newPosts = result.data?.getUserPostList || [];
            const newPostList = newPosts.map(convertToPostItem);
            setAllPosts(prev => [...prev, ...newPostList]);
            setHasMore(newPosts.length === 20);
        } catch (error) {
            console.error('추가 데이터 로드 실패:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [isOwnProfile, userId, allPosts.length, isLoadingMore, hasMore, fetchMore, convertToPostItem]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore && allPosts.length > 0) {
                    loadMorePosts();
                }
            },
            { threshold: 0.1 }
        );
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loadMorePosts, hasMore, isLoadingMore, allPosts.length]);

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
                    {profile.profile && profile.profile !== '/profile/profile.svg' && profile.profile !== '' ? (
                        <Image
                            src={profile.profile}
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
                                fontSize: 48,
                                color: '#666',
                            }}
                        >
                            {profile.userId === '없는 사용자입니다' ? '?' : (profile.userId && profile.userId[0]) || '?'}
                        </div>
                    )}
                </S.ProfileImage>

                <S.ProfileMain>
                    <S.ButtonRow>
                        <S.Nickname>{profile.userId}</S.Nickname>
                        <S.Button>
                            {isOwnProfile ? (
                                <>
                                    <Square
                                        text="프로필 편집"
                                        status={true}
                                        onClick={() => handleBtnClick('/setting/profile')}
                                        width="120px"
                                    />
                                    <Square
                                        text="설정"
                                        status={true}
                                        onClick={() => handleBtnClick('/setting')}
                                        width="120px"
                                    />
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
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
                    <S.List1 style={{ minHeight: '400px' }}>
                        {boardingHouseList.map(post => (
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
                    <S.List2 style={{ minHeight: '400px' }}>
                        {postLoading ? (
                            <div style={{ padding: '20px', textAlign: 'center' }}>게시물을 불러오는 중...</div>
                        ) : postError ? (
                            <div style={{ padding: '20px', textAlign: 'center' }}>오류가 발생했습니다.</div>
                        ) : allPosts.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center' }}>게시물이 없습니다.</div>
                        ) : (
                            <>
                                {allPosts.map(post => (
                                    <Post key={post.id} post={post} />
                                ))}
                                {hasMore && (
                                    <div ref={observerRef} style={{ padding: '20px', textAlign: 'center' }}>
                                        {isLoadingMore ? '더 많은 게시물을 불러오는 중...' : ''}
                                    </div>
                                )}
                            </>
                        )}
                    </S.List2>
                )}
            </S.PostList>
            {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={userId} />}
            {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={userId} />}
        </S.ProfileWrapper>
    );
}
