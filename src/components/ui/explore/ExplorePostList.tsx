'use client'

import PostItem from '@/components/ui/postItem';
import { useRouter } from 'next/navigation';
import * as S from './style';

const postList = [
    {
        id: 1,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 2,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 3,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 4,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 5,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 6,
        user: '해ㅠ피',
        title: '해피해피하숙',
        region: '강서구',
        price: '30',
        period: 6,
        gender: 'M',
        thumbnail: '/post/room.svg',
        userProfile: '/profile/profile.svg',
    }
];


export default function ExplorePostList() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/post/${id}`);
  }

  return (
    <S.PostList>
      {postList.map((post) => (
        <PostItem key={post.id} {...post} onClick={handleClick} />
      ))}
    </S.PostList>
  );
}
