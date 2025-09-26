"use client";

import { useEffect, useRef, useState } from "react";
import type { PostComment, PostDetailUnion } from "@/types/postDetail";
import { PostDetailService } from "@/services/postDetail";
import { useAlertStore } from "@/store/alert";
import { useModalStore } from "@/store/modal";
import { useApollo } from "@/lib/apolloClient";

export function useComments(postInfo: PostDetailUnion | null) {
  const client = useApollo();
  const { success, error } = useAlertStore();
  const { open: openModal, close: closeModal, isOpen } = useModalStore();

  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [openCommentMenuId, setOpenCommentMenuId] = useState<string | null>(null);

  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const loadComments = async () => {
    if (!postInfo) return;
    try {
      setCommentsLoading(true);
      const list = await PostDetailService.getPostComments(client, postInfo);
      setComments(list);
    } catch (e) {
      console.error("댓글 로드 실패:", e);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (postInfo && showComments) loadComments();
  }, [postInfo, showComments]);

  const submitComment = async () => {
    if (!commentText.trim() || !postInfo) return;
    try {
      await PostDetailService.createPostComment(client, postInfo, commentText);
      setCommentText("");
      await loadComments();
      success("댓글이 작성되었습니다.");
    } catch (e) {
      console.error("댓글 작성 실패:", e);
      error("댓글 작성에 실패했습니다.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitComment();
    }
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentContent);
  };

  const saveEditComment = async () => {
    if (!editingCommentId || !editingText.trim() || !postInfo) return;
    try {
      await PostDetailService.updatePostComment(client, postInfo, editingCommentId, editingText);
      setEditingCommentId(null);
      setEditingText("");
      await loadComments();
      success("댓글이 수정되었습니다.");
    } catch (e) {
      console.error("댓글 수정 실패:", e);
      error("댓글 수정에 실패했습니다.");
    }
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const deleteComment = async (commentId: string) => {
    setCommentToDelete(commentId);
    openModal();
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete || !postInfo) return;
    try {
      await PostDetailService.deletePostComment(client, postInfo, commentToDelete);
      await loadComments();
      success("댓글이 삭제되었습니다.");
    } catch (e) {
      console.error("댓글 삭제 실패:", e);
      error("댓글 삭제에 실패했습니다.");
    } finally {
      setCommentToDelete(null);
      closeModal();
    }
  };

  const cancelDeleteComment = () => {
    setCommentToDelete(null);
    closeModal();
  };

  return {
    // states
    comments,
    commentsLoading,
    showComments,
    commentText,
    editingCommentId,
    editingText,
    setEditingText,
    commentToDelete,
    openCommentMenuId,
    actionMenuRef,
    // actions
    setShowComments,
    setCommentText,
    setOpenCommentMenuId,
    handleKeyPress,
    submitComment,
    handleEditComment,
    saveEditComment,
    cancelEditComment,
    deleteComment,
    confirmDeleteComment,
    cancelDeleteComment,
    loadComments,
  } as const;
}
