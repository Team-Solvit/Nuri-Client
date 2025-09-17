'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useQuery } from '@apollo/client';
import { SEARCH_BOARDING_ROOM } from '@/services/explore';
import { BoardingRoomSearchFilter, BoardingRoom, PostItemData } from '@/services/explore';
import { useState, useEffect } from 'react';

interface ExplorePostListProps {
  searchFilter: BoardingRoomSearchFilter;
}

export default function ExplorePostList({ searchFilter }: ExplorePostListProps) {
  const navigate = useNavigationWithProgress();
  const [debouncedFilter, setDebouncedFilter] = useState<BoardingRoomSearchFilter>(searchFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { data, loading, error } = useQuery(SEARCH_BOARDING_ROOM, {
    variables: {
      boardingRoomSearchFilter: debouncedFilter
    },
    skip: Object.keys(debouncedFilter).length === 0
  });

  const convertToPostItem = (room: BoardingRoom): PostItemData => ({
    id: room.roomId && !isNaN(Number(room.roomId))
      ? Number(room.roomId)
      : Math.random(),
    user: '해ㅠ피',
    title: room.name,
    price: room.monthlyRent?.toString() ?? '0',
    thumbnail: '/post/post-example.png',
    userProfile: '/profile/profile.svg',
  });

  if (loading) {
    return (
      <S.PostList>
        <div>검색 중...</div>
      </S.PostList>
    );
  }

  if (error) {
    return (
      <S.PostList>
        <div>검색 중 오류가 발생했습니다.</div>
      </S.PostList>
    );
  }

  const rooms = data?.searchBoardingRoom || [];
  const postList = rooms.map(convertToPostItem);

  return (
    <S.PostList>
      {postList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        postList.map((post: PostItemData) => (
          <PostItem key={post.id} {...post} onClick={() => navigate(`/post/${post.id}`)} />
        ))
      )}
    </S.PostList>
  );
}
