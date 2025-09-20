'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useQuery } from '@apollo/client';
import { SEARCH_BOARDING_ROOM } from '@/services/explore';
import { BoardingRoomSearchFilter, BoardingRoom, PostItemData } from '@/services/explore';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ExplorePostListProps {
  searchFilter: BoardingRoomSearchFilter;
}

export default function ExplorePostList({ searchFilter }: ExplorePostListProps) {
  const navigate = useNavigationWithProgress();
  const [debouncedFilter, setDebouncedFilter] = useState<BoardingRoomSearchFilter>(searchFilter);
  const [allPosts, setAllPosts] = useState<PostItemData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchFilter);
      setAllPosts([]);
      setHasMore(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { data, loading, error, fetchMore } = useQuery(SEARCH_BOARDING_ROOM, {
    variables: {
      boardingRoomSearchFilter: { ...debouncedFilter, start: 0 }
    },
    skip: Object.keys(debouncedFilter).length === 0,
    onCompleted: (data) => {
      const rooms = data?.searchBoardingRoom || [];
      const postList = rooms.map(convertToPostItem);
      setAllPosts(postList);
      setHasMore(postList.length === 20);
    }
  });

  const convertToPostItem = (room: BoardingRoom): PostItemData => ({
    id: room.roomId && !isNaN(Number(room.roomId))
      ? Number(room.roomId)
      : Math.random(),
    user: room.boardingHouse?.host?.user?.name || '알 수 없음',
    title: room.name,
    price: room.monthlyRent?.toString() ?? '0',
    thumbnail: room.boardingRoomFile?.[0]?.fileId,
    userProfile: room.boardingHouse?.host?.user?.profile || '/profile/profile.svg',
  });

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const result = await fetchMore({
        variables: {
          boardingRoomSearchFilter: { ...debouncedFilter, start: allPosts.length + 1 }
        }
      });

      const newRooms = result.data?.searchBoardingRoom || [];
      const newPosts = newRooms.map(convertToPostItem);
      
      setAllPosts(prev => [...prev, ...newPosts]);
      setHasMore(newPosts.length === 20);
    } catch (error) {
      console.error('추가 데이터 로드 실패:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [debouncedFilter, allPosts.length, isLoadingMore, hasMore, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
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
  }, [loadMorePosts, hasMore, isLoadingMore]);

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

  return (
    <S.PostList>
      {allPosts.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {allPosts.map((post: PostItemData) => (
            <PostItem key={post.id} {...post} onClick={() => navigate(`/post/${post.id}`)} />
          ))}
          {hasMore && (
            <div ref={observerRef} style={{ height: '20px', margin: '20px 0' }}>
              {isLoadingMore && <div>더 많은 게시물을 불러오는 중...</div>}
            </div>
          )}
          {!hasMore && allPosts.length > 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              모든 게시물을 불러왔습니다.
            </div>
          )}
        </>
      )}
    </S.PostList>
  );
}
