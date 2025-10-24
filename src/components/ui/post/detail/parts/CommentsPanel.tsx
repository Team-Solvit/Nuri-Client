"use client";

import React from "react";
import Image from "next/image";
import * as S from "../style";
import EllipsisIcon from "@/assets/post/ellipsis.svg";
import CommentsSkeleton from "./CommentsSkeleton";
import type { PostComment } from "@/types/postDetail";

interface CommentsPanelProps {
  show: boolean;
  isModal?: boolean;
  comments: PostComment[];
  commentsLoading: boolean;
  currentUserId?: string;
  editingCommentId: string | null;
  editingText: string;
  onChangeEditingText: (v: string) => void;
  onEditComment: (id: string, content: string) => void;
  onSaveEditComment: () => void;
  onCancelEditComment: () => void;
  onDeleteComment: (id: string) => void;
  openCommentMenuId: string | null;
  setOpenCommentMenuId: (id: string | null) => void;
  onClose: () => void;
}

export default function CommentsPanel({
  show,
  isModal,
  comments,
  commentsLoading,
  currentUserId,
  editingCommentId,
  editingText,
  onChangeEditingText,
  onEditComment,
  onSaveEditComment,
  onCancelEditComment,
  onDeleteComment,
  openCommentMenuId,
  setOpenCommentMenuId,
  onClose,
}: CommentsPanelProps) {
  return (
    <S.CommentsSection show={show} isModal={isModal}>
      <S.CommentsHeader>
        <S.CommentsTitle>댓글 {comments.length}개</S.CommentsTitle>
        <S.CommentsCloseButton onClick={onClose}>×</S.CommentsCloseButton>
      </S.CommentsHeader>
      <S.CommentsList>
        {commentsLoading ? (
          <CommentsSkeleton count={3} />
        ) : comments.length === 0 ? (
          <S.CommentsEmpty>
            아직 댓글이 없습니다.<br />
            첫 댓글을 작성해보세요!
          </S.CommentsEmpty>
        ) : (
          comments.map((comment: PostComment) => (
            <S.CommentItem key={comment.commentId}>
              <S.CommentAvatar>
                {comment.commenter.profile ? (
                  <Image src={comment.commenter.profile} alt={comment.commenter.userId} fill style={{ objectFit: "cover" }} />
                ) : (
                  <S.CommentAvatarFallback>
                    {(comment.commenter.name || comment.commenter.userId || "?").charAt(0)}
                  </S.CommentAvatarFallback>
                )}
              </S.CommentAvatar>
              <S.CommentContent>
                <S.CommentAuthor>{comment.commenter.userId}</S.CommentAuthor>
                {editingCommentId === comment.commentId ? (
                  <S.CommentEditContainer>
                    <S.CommentEditTextarea
                      value={editingText}
                      onChange={(e) => onChangeEditingText(e.target.value)}
                      placeholder="댓글을 수정하세요..."
                    />
                    <S.CommentEditButtons>
                      <S.CommentEditSaveButton onClick={onSaveEditComment}>저장</S.CommentEditSaveButton>
                      <S.CommentEditCancelButton onClick={onCancelEditComment}>취소</S.CommentEditCancelButton>
                    </S.CommentEditButtons>
                  </S.CommentEditContainer>
                ) : (
                  <S.CommentText>{comment.content}</S.CommentText>
                )}
              </S.CommentContent>
              {currentUserId === comment.commenter.userId && (
                <S.MenuButton onClick={(e) => e.stopPropagation()}>
                  <S.CommentMenu
                    onClick={(e) => {
                      e.stopPropagation();
                      const opening = openCommentMenuId !== comment.commentId;
                      setOpenCommentMenuId(opening ? comment.commentId : null);
                    }}
                  >
                    <Image src={EllipsisIcon} alt="메뉴" width={16} height={16} />
                  </S.CommentMenu>
                  {openCommentMenuId === comment.commentId && (
                    <S.MenuDropdown placement="down">
                      <S.MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditComment(comment.commentId, comment.content);
                          setOpenCommentMenuId(null);
                        }}
                      >
                        수정
                      </S.MenuItem>
                      <S.MenuItem
                        red
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComment(comment.commentId);
                          setOpenCommentMenuId(null);
                        }}
                      >
                        삭제
                      </S.MenuItem>
                    </S.MenuDropdown>
                  )}
                </S.MenuButton>
              )}
            </S.CommentItem>
          ))
        )}
      </S.CommentsList>
    </S.CommentsSection>
  );
}
