"use client";

import React from "react";
import Image from "next/image";
import * as S from "../style";
import HeartIcon from "@/assets/post/heart.svg";
import CommentIcon from "@/assets/post/comment.svg";
import EllipsisIcon from "@/assets/post/ellipsis.svg";

interface InteractionBarProps {
  isModal?: boolean;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isPostOwner: boolean;
  menuOpen: boolean;
  menuRef?: React.RefObject<HTMLDivElement | null>;
  onToggleLike: () => void;
  onOpenComments: () => void;
  onToggleMenu: () => void;
  onEditPost?: () => void;
  onDeletePost: () => void;
}

export default function InteractionBar({
  isModal,
  isLiked,
  likeCount,
  commentCount,
  isPostOwner,
  menuOpen,
  menuRef,
  onToggleLike,
  onOpenComments,
  onToggleMenu,
  onEditPost,
  onDeletePost,
}: InteractionBarProps) {
  return (
    <S.InteractionBar isModal={isModal}>
      <S.InteractionButtons>
        <S.ActionButton onClick={onToggleLike}>
          <Image
            src={HeartIcon}
            alt="like"
            width={24}
            height={24}
            style={{
              filter: isLiked
                ? "brightness(0) saturate(100%) invert(30%) sepia(74%) saturate(4662%) hue-rotate(344deg) brightness(94%) contrast(93%)"
                : "none",
            }}
          />
          <S.ActionCount>{likeCount}</S.ActionCount>
        </S.ActionButton>
        <S.ActionButton onClick={onOpenComments}>
          <Image src={CommentIcon} alt="comment" width={22} height={22} />
          <S.ActionCount>{commentCount}</S.ActionCount>
        </S.ActionButton>
        <S.MenuButton ref={menuRef} onClick={onToggleMenu}>
          <Image src={EllipsisIcon} alt="menu" width={24} height={24} />
          {menuOpen && (
            <S.MenuDropdown>
              {isPostOwner && (
                <>
                  {onEditPost && <S.MenuItem onClick={onEditPost}>수정</S.MenuItem>}
                  <S.MenuItem onClick={onDeletePost} red>
                    삭제
                  </S.MenuItem>
                </>
              )}
              {!isPostOwner && (
                <S.MenuItem
                  onClick={() => window.open('https://forms.gle/kFGiF6KmmCyaDwos5', '_blank')}
                >
                  신고
                </S.MenuItem>
              )}
            </S.MenuDropdown>
          )}
        </S.MenuButton>
      </S.InteractionButtons>
    </S.InteractionBar>
  );
}
