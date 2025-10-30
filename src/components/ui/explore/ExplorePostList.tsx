'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useQuery } from '@apollo/client';
import { SEARCH_BOARDING_ROOM } from '@/services/explore';
import { BoardingRoomSearchFilter, BoardingRoom, PostItemData } from '@/services/explore';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAlertStore } from '@/store/alert';
import ExplorePostItemSkeleton from '@/components/ui/skeleton/ExplorePostItemSkeleton';

interface ExplorePostListProps {
  searchFilter: BoardingRoomSearchFilter;
}

export default function ExplorePostList({ searchFilter }: ExplorePostListProps) {
  const navigate = useNavigationWithProgress();
  const { success, error } = useAlertStore();
  const [debouncedFilter, setDebouncedFilter] = useState<BoardingRoomSearchFilter>(searchFilter);
  const [allPosts, setAllPosts] = useState<PostItemData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 20;


  const handlePostClick = useCallback((id: string) => {
    navigate(`/post/${id}`);
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchFilter);
      setAllPosts([]);
      setHasMore(true);
      setCurrentPage(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { loading, fetchMore } = useQuery(SEARCH_BOARDING_ROOM, {
    variables: {
      boardingRoomSearchFilter: { ...debouncedFilter, start: 0 }
    },
    skip: !debouncedFilter || Object.keys(debouncedFilter).filter(k => k !== 'start').length === 0,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.searchBoardingRoom) {
        const rooms = data.searchBoardingRoom;
        const postList = rooms.map(convertToPostItem);
        setAllPosts(postList);
        setCurrentPage(1);
        setHasMore(postList.length >= PAGE_SIZE);
        setIsInitialized(true);
      }
    },
    onError: () => {
      error('게시물 목록을 불러오는 중 오류가 발생했습니다.');
      setHasMore(false);
    }
  });

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const convertToPostItem = (room: BoardingRoom): PostItemData => {
    const firstImage = room.boardingRoomFile?.[0];
    let thumbnailUrl = '';

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

    const userProfileUrl = room.boardingHouse?.host?.user?.profile;

    return {
      id: room.roomId || `room_${Math.random().toString(36).substr(2, 9)}`,
      user: room.boardingHouse?.host?.user?.name || '알 수 없음',
      userId: room.boardingHouse?.host?.user?.userId || '',
      title: room.name,
      price: room.monthlyRent?.toString() ?? '0',
      thumbnail: thumbnailUrl,
      userProfile: userProfileUrl && isValidUrl(userProfileUrl) ? userProfileUrl : '/profile/profile.svg',
    };
  };

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading) return;

    setIsLoadingMore(true);
    try {
      const nextStart = currentPage;
      const result = await fetchMore({
        variables: {
          boardingRoomSearchFilter: { ...debouncedFilter, start: nextStart }
        }
      });

      const newRooms = result.data?.searchBoardingRoom || [];

      if (newRooms.length > 0) {
        const newPosts = newRooms.map(convertToPostItem);

        setAllPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewPosts = newPosts.filter((p: PostItemData) => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPosts];
        });

        setCurrentPage(prev => prev + 1);

        if (newRooms.length < PAGE_SIZE) {
          setHasMore(false);
          success('모든 게시물을 불러왔습니다.');
        }
      } else {
        setHasMore(false);
        success('모든 게시물을 불러왔습니다.');
      }
    } catch {
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [debouncedFilter, currentPage, isLoadingMore, hasMore, fetchMore, loading, success]);

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

  const isInitialLoading = loading && !isInitialized;

  if (!isInitialized) {
    return (
      <S.PostList>
        <div>검색 중 오류가 발생했습니다. 다시 시도해주세요.</div>
      </S.PostList>
    );
  }

  return (
    <S.PostList>
      {isInitialLoading ? (
        <div>검색 중...</div>
      ) : allPosts.length === 0 && isInitialized ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {allPosts.map((post: PostItemData) => (
            <PostItem key={post.id} {...post} onClick={handlePostClick} />
          ))}
          {hasMore && isLoadingMore && (
            <>
              <ExplorePostItemSkeleton />
              <ExplorePostItemSkeleton />
            </>
          )}
          {hasMore && <div ref={observerRef} style={{ height: '1px' }} />}
        </>
      )}
    </S.PostList>
  );
}
