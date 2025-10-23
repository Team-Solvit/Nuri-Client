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
import { UserProfileResponseDto, UserPostListResponse, UserPost } from '@/types/profile';
import { useUserStore } from '@/store/user';


export default function MyProfilePage() {
  const router = useRouter()
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const { id, userId, name, profile: userProfile } = useUserStore(s => s);


  const [selected, setSelected] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
    ProfileGQL.QUERIES.GET_USER_PROFILE,
    {
      variables: { userId: userId || '' },
      skip: !userId,
      fetchPolicy: 'network-only',
    }
  );

  const { data: postData, loading: postLoading, error: postError, fetchMore } = useQuery<UserPostListResponse>(
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

  const profile = data?.getUserProfile ?? {
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    profile: userProfile || '/profile/profile.svg',
    userId: userId || '알 수 없음',
    introduce: '소개글이 없습니다.',
  };

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

  const convertToPostItem = (post: UserPost) => ({
    id: parseInt(post.postId) || Math.random(),
    user: userId || '알 수 없음',
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

  const handleClick = (id: number) => {
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
            <S.Nickname>{name || '로그인 후 사용해주세요.'}</S.Nickname>
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
            {boardingHouseList.map((post) => (
              <PostItem key={post.id} {...post} onClick={handleClick} hideProfile />
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
                {allPosts.map((post) => (
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

      {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={profile.userId} />}
      {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={profile.userId} />}
    </S.ProfileWrapper>
  );
}