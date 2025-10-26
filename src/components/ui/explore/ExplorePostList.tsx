'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useQuery } from '@apollo/client';
import { SEARCH_BOARDING_ROOM } from '@/services/explore';
import { BoardingRoomSearchFilter, BoardingRoom, PostItemData } from '@/services/explore';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAlertStore } from '@/store/alert';

interface ExplorePostListProps {
  searchFilter: BoardingRoomSearchFilter;
}

export default function ExplorePostList({ searchFilter }: ExplorePostListProps) {
  const navigate = useNavigationWithProgress();
  const { success } = useAlertStore();
  const [debouncedFilter, setDebouncedFilter] = useState<BoardingRoomSearchFilter>(searchFilter);
  const [allPosts, setAllPosts] = useState<PostItemData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentStart, setCurrentStart] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchFilter);
      setAllPosts([]);
      setHasMore(true);
      setCurrentStart(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { data, loading, error, fetchMore } = useQuery(SEARCH_BOARDING_ROOM, {
    variables: {
      boardingRoomSearchFilter: { ...debouncedFilter, start: 0 }
    },
    skip: !debouncedFilter || Object.keys(debouncedFilter).length === 0 || (Object.keys(debouncedFilter).length === 1 && debouncedFilter.start === 0),
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.searchBoardingRoom) {
        const rooms = data.searchBoardingRoom;
        const postList = rooms.map(convertToPostItem);
        setAllPosts(postList);
        setHasMore(postList.length === 20);
        setIsInitialized(true);
      }
    },
    onError: (error) => {
      console.error('GraphQL 쿼리 오류:', error);
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
    // 첫 번째 이미지 파일의 URL 가져오기
    const firstImage = room.boardingRoomFile?.[0];
    
    // url 필드를 우선 사용, 없으면 fileId 사용 → 둘 다 ID이므로 CDN URL로 변환
    let thumbnailUrl = '';
    if (firstImage) {
      const imageId = firstImage.url || firstImage.fileId;
      if (imageId) {
        thumbnailUrl = `https://cdn.solvit-nuri.com/file/${imageId}`;
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
      const result = await fetchMore({
        variables: {
          boardingRoomSearchFilter: { ...debouncedFilter, start: currentStart }
        }
      });

      const newRooms = result.data?.searchBoardingRoom || [];
      
      if (newRooms.length > 0) {
        const newPosts = newRooms.map(convertToPostItem);
        
        // 중복 제거: 기존 id와 중복되지 않는 항목만 추가
        setAllPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewPosts = newPosts.filter((p: PostItemData) => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPosts];
        });
        
        // start를 1씩 증가
        setCurrentStart(prev => prev + 1);
        
        // 중요: 원본 응답이 1개 미만이면 더 이상 없음
        if (newRooms.length < 1) {
          setHasMore(false);
          success('모든 게시물을 불러왔습니다.');
        }
      } else {
        setHasMore(false);
        success('모든 게시물을 불러왔습니다.');
      }
    } catch (error) {
      console.error('❌ 추가 데이터 로드 실패:', error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [debouncedFilter, currentStart, isLoadingMore, hasMore, fetchMore, loading, success]);

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

  if (error && !isInitialized) {
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
            <PostItem key={post.id} {...post} onClick={() => navigate(`/post/${post.id}`)} />
          ))}
          {hasMore && (
            <div ref={observerRef} style={{ height: '20px', margin: '20px 0' }}>
              {isLoadingMore && <div>더 많은 게시물을 불러오는 중...</div>}
            </div>
          )}
        </>
      )}
    </S.PostList>
  );
}
