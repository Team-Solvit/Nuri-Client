'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
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

  // 디바운싱: 필터 변경 후 500ms 후에 검색 실행
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
    skip: Object.keys(debouncedFilter).length === 0 // 필터가 없으면 쿼리 실행하지 않음
  });

  // BoardingRoom을 PostItem 형식으로 변환
  const convertToPostItem = (room: BoardingRoom): PostItemData => ({
    id: parseInt(room.roomId),
    user: '해ㅠ피', // 실제로는 room에서 가져와야 함
    title: room.name,
    region: '강서구', // 실제로는 room에서 가져와야 함
    price: room.monthlyRent.toString(),
    period: 6, // 실제로는 room에서 가져와야 함
    gender: 'M', // 실제로는 room에서 가져와야 함
    thumbnail: '/post/post-example.png', // 실제로는 room에서 가져와야 함
    userProfile: '/profile/profile.svg', // 실제로는 room에서 가져와야 함
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
          <PostItem key={post.id} {...post} onClick={() => navigate(`/post/${post.id}`)}/>
        ))
      )}
    </S.PostList>
  );
}
