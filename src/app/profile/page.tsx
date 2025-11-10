'use client'

import Image from 'next/image';
import * as S from './[id]/style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import { useState, useRef, useEffect, useCallback } from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { useQuery } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { UserProfileResponseDto, UserPostListResponse, UserPost, HostBoardingRoomsResponse, HostBoardingRoom } from '@/types/profile';
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';
import ProfileSkeleton from '@/components/ui/skeleton/ProfileSkeleton';
import { useLoginModalStore } from '@/store/loginModal';


export default function MyProfilePage() {
  const router = useRouter()
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const { id, userId, profile: userProfile } = useUserStore(s => s);
  const { error: showError } = useAlertStore();
  const { open: openLoginModal } = useLoginModalStore();
  const [hydrated, setHydrated] = useState(false);


  const [selected, setSelected] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [allBoardingRooms, setAllBoardingRooms] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!id || !userId) {
      openLoginModal();
      router.push('/');
    }
  }, [hydrated, id, userId, openLoginModal, router]);

  const { data, loading } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
    ProfileGQL.QUERIES.GET_USER_PROFILE,
    {
      variables: { userId: userId || '' },
      skip: !userId,
      fetchPolicy: 'network-only',
    }
  );

  const profile = data?.getUserProfile ?? {
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    profile: userProfile || '/profile/profile.svg',
    userId: userId || '알 수 없음',
    introduce: '소개글이 없습니다.',
    role: 'USER',
  };

  const isHost = profile.role === 'HOST';

  const [initialSelectedSet, setInitialSelectedSet] = useState(false);
  useEffect(() => {
    if (initialSelectedSet) return;
    if (!data?.getUserProfile) return;
    if (data.getUserProfile.role === 'HOST') {
      setSelected(1);
    } else {
      setSelected(2);
    }
    setInitialSelectedSet(true);
  }, [initialSelectedSet, data?.getUserProfile]);

  const { loading: postLoading, error: postError, fetchMore } = useQuery<UserPostListResponse>(
    ProfileGQL.QUERIES.GET_USER_POST_LIST,
    {
      variables: {
        userPostListReadInput: {
          userId: id || '',
          start: 0
        }
      },
      skip: !id || selected !== 2,
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

  const { data: boardingRoomData, loading: boardingRoomLoading, error: boardingRoomError } = useQuery<HostBoardingRoomsResponse>(
    ProfileGQL.QUERIES.GET_HOST_BOARDING_ROOMS,
    {
      variables: {
        userId: userId || ''
      },
      skip: selected !== 1 || !userId || !isHost,
      fetchPolicy: 'cache-first',
    }
  );

  useEffect(() => {
    if (boardingRoomData) {
      const rooms = boardingRoomData.getHostBoardingRooms || [];
      const roomList = rooms.map(convertToBoardingRoomItem);
      setAllBoardingRooms(roomList);
    }
  }, [boardingRoomData]);

  useEffect(() => {
    if (boardingRoomError) {
      console.error('하숙집 로드 실패:', boardingRoomError);
      setAllBoardingRooms([]);
      showError('하숙집 정보를 불러오는 중 오류가 발생했습니다.');
    }
  }, [boardingRoomError, showError]);
	
	const convertToPostItem = (post: UserPost) => ({
			postId: post.postId,
			thumbnail: post.thumbnail || '/post/post-example.png',
			user: userId || '알 수 없음',
			title: '게시물',
			region: '지역',
			price: '0',
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
	    id: firstImage?.roomId || `room_${room.name}_${room.monthlyRent}`,
      user: userId || '알 수 없음',
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
            userId: id || '',
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
  }, [id, allPosts.length, isLoadingMore, hasMore, fetchMore, convertToPostItem]);

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

  const [imageUrl, setImageUrl] = useState(userProfile || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profile.profile && profile.profile !== '/profile/profile.svg') {
      setImageUrl(convertToCdnUrl(profile.profile));
    }
  }, [profile.profile]);

  const handleClick = (id: string) => {
    NProgress.start();
    router.push(`/post/${id}`)
  }

  const fileInput = () => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    inputRef.current?.click();
  };

  const handleBtnClick = (path: string) => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    NProgress.start()
    router.push(path)
  }

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


  const handleFollowerClick = () => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    setShowFollowerModal(true);
  }

  const handleFollowClick = () => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return;
    }
    setShowFollowModal(true);
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <S.ProfileWrapper>
      <S.Profile>
        <S.ProfileImage2 onClick={id ? fileInput : undefined} style={{ cursor: id ? 'pointer' : 'default' }}>
          {userId && imageUrl ? (
            <Image
              src={imageUrl || '/profile/profile.svg'}
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
              {userId && profile.userId ? profile.userId[0] : '?'}
            </div>
          )}
        </S.ProfileImage2>

        <S.ProfileMain>
          <S.ButtonRow>
            <S.Nickname>{userId || '로그인 후 사용해주세요.'}</S.Nickname>
            {id && (
              <S.Button>
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
              </S.Button>
            )}
          </S.ButtonRow>

          <S.Stats>
            <S.Stat>
              <S.StatValue>{profile.postCount}</S.StatValue>
              <S.StatLabel>게시물</S.StatLabel>
            </S.Stat>
            <S.Stat style={{ cursor: 'pointer' }} onClick={handleFollowerClick}>
              <S.StatValue1>{profile.followerCount}</S.StatValue1>
              <S.StatLabelF>팔로워</S.StatLabelF>
            </S.Stat>
            <S.Stat style={{ cursor: 'pointer' }} onClick={handleFollowClick}>
              <S.StatValue2>{profile.followingCount}</S.StatValue2>
              <S.StatLabelF2>팔로잉</S.StatLabelF2>
            </S.Stat>
          </S.Stats>

          <S.introduction>{profile.introduce || '소개글이 없습니다.'}</S.introduction>
        </S.ProfileMain>
      </S.Profile>

      {isHost ? (
        <S.Side isSelected={selected}>
          <S.Tab>
            <p onClick={() => setSelected(1)}>하숙집</p>
          </S.Tab>
          <S.Tab2>
            <p onClick={() => setSelected(2)}>게시물</p>
          </S.Tab2>
        </S.Side>
      ) : null}

      <S.PostList>
        {selected === 1 && (
          <S.List1 style={{ minHeight: '400px' }}>
            {boardingRoomLoading ? (
              <S.EmptyMessage2 marginRight="44rem">하숙집을 불러오는 중...</S.EmptyMessage2>
            ) : allBoardingRooms.length === 0 ? (
              <S.EmptyMessage2 marginRight="44rem">하숙집이 없습니다.</S.EmptyMessage2>
            ) : (
              allBoardingRooms.map(room => (
                <PostItem
                  key={room.id}
                  {...room}
                  userId={userId || ''}
                  onClick={handleClick}
                  hideProfile
                />
              ))
            )}
          </S.List1>
        )}
        {selected === 2 && (
          <S.List2 style={{ minHeight: '400px' }}>
            {postLoading ? (
              <S.EmptyMessage>게시물을 불러오는 중...</S.EmptyMessage>
            ) : postError ? (
              <S.EmptyMessage>오류가 발생했습니다.</S.EmptyMessage>
            ) : allPosts.length === 0 ? (
              <S.EmptyMessage>게시물이 없습니다.</S.EmptyMessage>
            ) : (
              <>
	              {allPosts.map((post) => (
									<Post key={post.postId} post={post} />
                ))}
                {hasMore && (
                  <S.EmptyMessage>
                    {isLoadingMore ? '더 많은 게시물을 불러오는 중...' : ''}
                  </S.EmptyMessage>
                )}
              </>
            )}
          </S.List2>
        )}
      </S.PostList>

      {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={profile.userId} />}
      {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={profile.userId} />}
    </S.ProfileWrapper>
  );
}