'use client'

import Image from 'next/image';
import * as S from './[id]/style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import { useState, useRef } from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { useQuery } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { UserProfileResponseDto } from '@/types/profile';
import { useUserStore } from '@/store/user';


export default function MyProfilePage() {
  const router = useRouter()
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const { id, role } = useUserStore(s => s);
  const userId = id;

  const [selected, setSelected] = useState(1);

  const { data, loading, error } = useQuery<{ getUserProfile: UserProfileResponseDto }>(
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
    profile: '/profile/profile.svg',
    userId: userId || '알 수 없음',
    introduce: '소개글이 없습니다.',
  };

  const postList = [
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

  const [imageUrl, setImageUrl] = useState(profile.profile);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (id: number) => {
    router.push(`/post/${id}`)
  }

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const fileInput = () => {
    inputRef.current?.click();
  };

  const handleBtnClick = (path: string) => {
    NProgress.start()
    router.push(path)
  }

  return (
    <S.ProfileWrapper>
      <S.Profile>
        <S.ProfileImage2 onClick={fileInput}>
          <Image
            src={imageUrl}
            alt="프로필"
            fill
            style={{ objectFit: 'cover', zIndex: 0 }}
          />
          <S.PlusIcon>
            <Image src="/icons/plus.svg" alt="추가 아이콘" width={65} height={57} />
          </S.PlusIcon>
          <input
            type="file"
            accept="image/*"
            onChange={imageChange}
            ref={inputRef}
            hidden
          />
        </S.ProfileImage2>

        <S.ProfileMain>
          <S.ButtonRow>
            <S.Nickname>{profile.userId}</S.Nickname>
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
            {postList.map((post) => (
              <PostItem key={post.id} {...post} onClick={handleClick} hideProfile />
            ))}
          </S.List1>
        )}
        {selected === 2 && (
          <S.List2>
            {postList.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </S.List2>
        )}
      </S.PostList>

      {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={profile.userId} />}
      {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={profile.userId} />}
    </S.ProfileWrapper>
  );
}