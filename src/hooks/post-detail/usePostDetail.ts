"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApollo } from "@/lib/apolloClient";
import { PostDetailService } from "@/services/postDetail";
import type { PostDetailUnion } from "@/types/postDetail";
import { useUserStore } from "@/store/user";
import { useAlertStore } from "@/store/alert";
import { useModalStore } from "@/store/modal";

export function usePostDetail(id: string) {
  const router = useRouter();
  const client = useApollo();
  const { userId: currentUserId } = useUserStore();
  const { success, error } = useAlertStore();
  const { open: openModal, close: closeModal, isOpen } = useModalStore();

  const [postInfo, setPostInfo] = useState<PostDetailUnion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await PostDetailService.getPostById(client, id);
        setPostInfo(post);
        if (post) {
          const currentLikeCount = post.__typename === "SnsPost" ? post.likeCount : post.room.likeCount;
          const currentIsLiked = post.__typename === "SnsPost" ? post.isLiked : post.room.isLiked;
          setLikeCount(currentLikeCount);
          setIsLiked(currentIsLiked || false);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [client, id]);

  const isHousePost = postInfo?.__typename === "BoardingPost";

  const images = useMemo(() => {
    if (!postInfo) return [] as string[];
    if (postInfo.__typename === "SnsPost") return postInfo.files.map((f) => f.url);
    return postInfo.room.boardingRoomFile.map((f) => f.url);
  }, [postInfo]);

  const handleLikeToggle = async () => {
    if (!postInfo || likeLoading) return;

    setLikeLoading(true);
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }

    try {
      await PostDetailService.toggleLike(client, postInfo, previousIsLiked);
      await client.refetchQueries({
        include: ['GetPostList'],
      });
    } catch {
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
    } finally {
      setLikeLoading(false);
    }
  };

  const deletePost = () => {
    if (!postInfo) return;
    const postId = postInfo.__typename === "SnsPost" ? postInfo.postId : postInfo.room.roomId;
    setPostToDelete(postId);
    openModal();
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    try {
      await PostDetailService.deletePost(client, postToDelete);
      success("게시물이 삭제되었습니다.");
      
      // 홈 화면의 게시물 목록 캐시도 업데이트하여 삭제된 게시물 제거
      await client.refetchQueries({
        include: ['GetPostList'],
      });
      
      router.back();
    } catch {
      error("게시물 삭제에 실패했습니다.");
    } finally {
      setPostToDelete(null);
      closeModal();
    }
  };

  const cancelDeletePost = () => {
    setPostToDelete(null);
    closeModal();
  };

  const commentCount = postInfo?.__typename === "SnsPost" ? postInfo?.commentCount : postInfo?.room.commentCount;
  const date = postInfo?.__typename === "SnsPost" ? postInfo?.day : postInfo?.room.day;
  const userProfile = postInfo?.__typename === "SnsPost" ? postInfo?.author.profile : postInfo?.room.boardingHouse.host.user.profile;
  const userId = postInfo?.__typename === "SnsPost" ? postInfo?.author.userId : postInfo?.room.boardingHouse.host.user.userId;
  const desc = postInfo?.__typename === "SnsPost" ? postInfo?.contents : postInfo?.room.description;

  const roomName = isHousePost ? postInfo!.room.name : undefined;
  const monthlyRent = isHousePost ? postInfo!.room.monthlyRent : undefined;
  const periods = isHousePost ? postInfo!.room.contractPeriod.map((p) => p.contractPeriod) : [];
  const options = isHousePost ? postInfo!.room.boardingRoomOption : [];
  const location = isHousePost ? postInfo!.room.boardingHouse.location : undefined;
  const nearestStation = isHousePost ? postInfo!.room.boardingHouse.nearestStation : undefined;
  const nearestSchool = isHousePost ? postInfo!.room.boardingHouse.nearestSchool : undefined;
  const gender = isHousePost ? postInfo!.room.boardingHouse.gender : undefined;
  const isMealProvided = isHousePost ? postInfo!.room.boardingHouse.isMealProvided : undefined;

  return {
    // states
    postInfo,
    setPostInfo,
    loading,
    isLiked,
    likeCount,
    postToDelete,
    isOpen,
    // derived
    isHousePost,
    images,
    commentCount: commentCount ?? 0,
    date,
    userProfile,
    userId,
    currentUserId,
    isPostOwner: Boolean(currentUserId && userId && currentUserId === userId),
    desc,
    roomName,
    monthlyRent,
    periods,
    options,
    location,
    nearestStation,
    nearestSchool,
    gender,
    isMealProvided,
    // actions
    handleLikeToggle,
    deletePost,
    confirmDeletePost,
    cancelDeletePost,
  } as const;
}
