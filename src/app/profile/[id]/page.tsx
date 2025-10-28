'use client'

import Image from 'next/image';
import * as S from './style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import { useState, useRef, useEffect } from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import NProgress from 'nprogress';
import { useApolloClient } from '@apollo/client';
import { followUser, unfollowUser } from '@/services/profile';
import { ProfileGQL } from '@/services/profile';
import { UserProfileResponseDto, UserPostListResponse, UserPost, HostBoardingRoomsResponse, HostBoardingRoom } from '@/types/profile';
import { useUserStore } from '@/store/user';
import { useCallback } from 'react';
import { useAlertStore } from '@/store/alert';
import ProfileSkeleton from '@/components/ui/skeleton/ProfileSkeleton'
import { useLoginModalStore } from '@/store/loginModal';


export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const client = useApolloClient();
    const { userId: currentUserId, id: currentId } = useUserStore(s => s);
    const { error: showError } = useAlertStore();
    const { open: openLoginModal } = useLoginModalStore();

    const [selected, setSelected] = useState(1);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [allBoardingRooms, setAllBoardingRooms] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

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
                    userId: isOwnProfile ? '' : (data?.getUserProfile?.userUUID || ''),
                    start: 0
                }
            },
            skip: selected !== 2 || !data?.getUserProfile?.userUUID,
            errorPolicy: 'all',
            fetchPolicy: 'cache-first',
            onCompleted: (data) => {
                const posts = data?.getUserPostList || [];
                const postList = posts.map(convertToPostItem);
                setAllPosts(postList);
                setHasMore(posts.length === 20);
            },
            onError: (error) => {
                console.error('게시물 로드 실패:', error);
                showError('게시물을 불러오는 중 오류가 발생했습니다.');
            }
        }
    );

    const { data: boardingRoomData, loading: boardingRoomLoading, error: boardingRoomError } = useQuery<HostBoardingRoomsResponse>(
        ProfileGQL.QUERIES.GET_HOST_BOARDING_ROOMS,
        {
            variables: {
                userId: isOwnProfile ? '' : userId
            },
            skip: selected !== 1 || !userId || (data?.getUserProfile?.role !== 'HOST' && data?.getUserProfile?.role !== 'BOARDER'),
            fetchPolicy: 'cache-first',
            onCompleted: (data) => {
                const rooms = data?.getHostBoardingRooms || [];
                const roomList = rooms.map(convertToBoardingRoomItem);
                setAllBoardingRooms(roomList);
            },
            onError: (error) => {
                console.error('하숙집 로드 실패:', error);
                setAllBoardingRooms([]);
                showError('하숙집 정보를 불러오는 중 오류가 발생했습니다.');
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
        role: 'USER',
    };

    const isValidUser = data?.getUserProfile !== undefined && data?.getUserProfile !== null;
    const isHost = profile.role === 'HOST' || profile.role === 'BOARDER';

    // role이 USER면 게시물 탭(2)으로 초기화
    useEffect(() => {
        if (!isHost && selected === 1) {
            setSelected(2);
        }
    }, [isHost, selected]);

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

    const convertToBoardingRoomItem = (room: HostBoardingRoom) => {
        const firstImage = room.boardingRoomFile?.[0];
        let thumbnailUrl = '/post/post-example.png';

        if (firstImage) {
            const imageId = firstImage.url || firstImage.fileId;
            if (imageId && imageId.trim() !== '') {
                if (imageId.startsWith('http')) {
                    thumbnailUrl = imageId;
                } else {
                    thumbnailUrl = `https://cdn.solvit-nuri.com/file/${imageId}`;
                }
            }
        }

        return {
            id: firstImage?.roomId || `room_${Math.random()}`,
            user: userId,
            title: room.name || '하숙집',
            region: '지역 정보 없음',
            price: room.monthlyRent?.toString() || '0',
            thumbnail: thumbnailUrl,
            userProfile: profile.profile,
        };
    };

    const loadMorePosts = useCallback(async () => {
        if (isLoadingMore || !hasMore || allPosts.length === 0) return;
        setIsLoadingMore(true);
        try {
            const result = await fetchMore({
                variables: {
                    userPostListReadInput: {
                        userId: isOwnProfile ? '' : (data?.getUserProfile?.userUUID || ''),
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
            showError('게시물을 더 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoadingMore(false);
        }
    }, [isOwnProfile, data?.getUserProfile?.userUUID, allPosts.length, isLoadingMore, hasMore, fetchMore, convertToPostItem, showError]);

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

    const handleClick = (id: string) => {
        NProgress.start();
        router.push(`/post/${id}`);
    }

    const handleBtnClick = (path: string) => {
        NProgress.start()
        router.push(path)
    }

    // 로딩 중일 때 스켈레톤 UI 표시
    if (loading) {
        return <ProfileSkeleton />;
    }

    // 로그인 안 된 상태에서 접근 시
    if (!currentId && !loading) {
        openLoginModal();
        router.push('/');
        return null;
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
                        {isValidUser && (
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
                        )}
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
                {isHost && (
                    <S.Tab>
                        <p onClick={() => setSelected(1)}>하숙집</p>
                    </S.Tab>
                )}
                <S.Tab2 style={!isHost ? { marginLeft: '17.2rem' } : {}}>
                    <p onClick={() => setSelected(2)}>게시물</p>
                </S.Tab2>
            </S.Side>
            <S.PostList>
                {selected === 1 && (
                    <S.List1 style={{ minHeight: '400px', marginRight: '50rem' }}>
                        {allBoardingRooms.length === 0 ? (
                            <div style={{ padding: '20px', marginRight: '50rem' }}>하숙집이 없습니다.</div>
                        ) : (
                            allBoardingRooms.map(room => (
                                <PostItem
                                    key={room.id}
                                    {...room}
                                    userId={userId}
                                    onClick={handleClick}
                                    hideProfile
                                />
                            ))
                        )}
                    </S.List1>
                )}
                {selected === 2 && (
                    <S.List2 style={{ minHeight: '400px' }}>
                        {allPosts.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'left' }}>게시물이 없습니다.</div>
                        ) : (
                            <>
                                {allPosts.map(post => (
                                    <Post key={post.id} post={post} />
                                ))}
                                {hasMore && (
                                    <div ref={observerRef} style={{ padding: '20px' }}>
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
