'use client';

import PostItem from '@/components/ui/postItem';
import { useRouter } from 'next/navigation';
import * as S from './style';
import { FilterState } from './ExploreFilter';

interface ExplorePostListProps {
  filter: FilterState;
  priceFilterActive: boolean;
  periodFilterActive: boolean;
}

const postList = [
  {
    id: 1,
    user: '해ㅠ피',
    title: '해피해피하숙',
    school: '부경대학교',
    region: '남구',
    station: '경성대·부경대역',
    price: 900000,
    period: 6,
    gender: 'M',
    thumbnail: '/post/room.svg',
    userProfile: '/profile/profile.svg',
  },
  {
    id: 2,
    user: '해ㅠ피',
    title: '해피해피하숙',
    school: '경성대학교',
    region: '남구',
    station: '부산역',
    price: 900000,
    period: 12,
    gender: 'M',
    thumbnail: '/post/room.svg',
    userProfile: '/profile/profile.svg',
  },
  {
    id: 3,
    user: '해ㅠ피',
    title: '해피해피하숙',
    school: '부경대학교',
    region: '남구',
    station: '경성대·부경대역',
    price: 600000,
    period: 6,
    gender: 'M',
    thumbnail: '/post/room.svg',
    userProfile: '/profile/profile.svg',
  },
  {
    id: 4,
    user: '해ㅠ피',
    title: '해피해피하숙',
    school: '부경대학교',
    region: '남구',
    station: '경성대·부경대역',
    price: 600000,
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
    price: 300000,
    period: 6,
    gender: 'M',
    thumbnail: '/post/room.svg',
    userProfile: '/profile/profile.svg',
  },
  {
    id: 6,
    user: '해ㅠ피',
    title: '해피해피하숙',
    school: '동명대학교',
    region: '남구',
    station: '경성대·부경대역',
    price: 300000,
    period: 6,
    gender: 'M',
    thumbnail: '/post/room.svg',
    userProfile: '/profile/profile.svg',
  },
];

export default function ExplorePostList({
  filter,
  priceFilterActive,
  periodFilterActive,
}: ExplorePostListProps) {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  const filteredPosts = postList.filter((post) => {
    if (priceFilterActive && post.id === 1) return false;
    if (periodFilterActive && post.id === 3) return false;

    if (filter.region && post.region !== filter.region) return false;
    if (filter.station && post.station !== filter.station) return false;
    if (filter.school && post.school !== filter.school) return false;
    if (post.period && post.period > filter.period) return false;

    return true;
  });

  return (
    <S.PostList>
      {filteredPosts.map((post) => (
        <PostItem key={post.id} {...post} onClick={handleClick} />
      ))}
    </S.PostList>
  );
}
