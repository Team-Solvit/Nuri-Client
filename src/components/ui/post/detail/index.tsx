"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Square from "@/components/ui/button/square";
import RoomTourModal from "./RoomTourModal";
import SendIconSvg from "@/assets/post/send.svg";
import * as S from "./style";
import { radius } from "@/styles/theme";
import MediaSlider from "./parts/MediaSlider";
import SnsPostContent from "./parts/SnsPostContent";
import BoardingPostContent from "./parts/BoardingPostContent";
import ConfirmModal from "./parts/ConfirmModal";
import CommentsPanel from "./parts/CommentsPanel";
import InteractionBar from "./parts/InteractionBar";
import { usePostDetail } from "@/hooks/post-detail/usePostDetail";
import { useMediaSlider } from "@/hooks/post-detail/useMediaSlider";
import { usePostEdit } from "@/hooks/post-detail/usePostEdit";
import { useComments } from "@/hooks/post-detail/useComments";
import { useContract } from "@/hooks/post-detail/useContract";
import ContractPeriodModal from "./ContractPeriodModal";
import { useAlertStore } from "@/store/alert";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import PostDetailSkeleton from "./PostDetailSkeleton";
import { imageCheck } from "@/utils/imageCheck";
import { PostDetailService } from "@/services/postDetail";
import { useApollo } from "@/lib/apolloClient";

interface PostDetailProps { id: string; isModal?: boolean; }

export default function PostDetail({ id, isModal }: PostDetailProps) {
  const router = useRouter();
  const navigate = useNavigationWithProgress();
  const client = useApollo();
  const {
    postInfo,
    setPostInfo,
    loading,
    isLiked,
    likeCount,
    isOpen,
    postToDelete,
    isHousePost,
    images,
    commentCount,
    date,
    userProfile,
    userId,
    currentUserId,
    isPostOwner,
    desc,
    roomName,
    handleLikeToggle,
    deletePost,
    confirmDeletePost,
    cancelDeletePost,
  } = usePostDetail(id);

  const { current, fitMode, handleSlide, handleImageLoadForFit } = useMediaSlider(images);

  const {
    uploading,
    isEditingPost,
    editingPostContent,
    editingImages,
    newImages,
    setEditingPostContent,
    handleEditPost,
    saveEditPost,
    cancelEditPost,
    removeImage,
    handleImageUpload,
    removeNewImage,
    displayDesc,
  } = usePostEdit(postInfo, async (postId: string) => {
    const updated = await PostDetailService.getPostById(client, postId);
    if (updated) {
      setPostInfo(updated);
    }
    return updated;
  });

  const {
    comments,
    commentsLoading,
    showComments,
    commentText,
    editingCommentId,
    editingText,
    setEditingText,
    openCommentMenuId,
    actionMenuRef,
    commentToDelete,
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
  } = useComments(postInfo);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showRoomTour, setShowRoomTour] = useState(false);
  const roomTourRef = useRef<HTMLDivElement | null>(null);
  const [showContractPeriods, setShowContractPeriods] = useState(false);
  const { error } = useAlertStore();
  const { creating: creatingContract, sendContract } = useContract(postInfo, currentUserId);

  const openContractPeriodPicker = () => {
    if (!postInfo || postInfo.__typename !== 'BoardingPost') return;
    if (!postInfo.room.contractPeriod?.length) {
      error('개월을 선택해주세요.');
      return;
    }
    setShowContractPeriods(prev => {
      const next = !prev;
      if (next) {
        setShowRoomTour(false);
        setMenuOpen(false);
        setOpenCommentMenuId(null);
      }
      return next;
    });
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (showRoomTour && roomTourRef.current && !roomTourRef.current.contains(target)) setShowRoomTour(false);
      if (menuOpen && actionMenuRef.current && !actionMenuRef.current.contains(target)) setMenuOpen(false);
      if (openCommentMenuId !== null) setOpenCommentMenuId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen, showRoomTour, showContractPeriods, openCommentMenuId]);

  if (loading) return <PostDetailSkeleton isModal={isModal} />;
  if (!postInfo) {
    return (
      <S.Wrapper>
        <S.ErrorContainer>
          <S.ErrorIcon>⚠️</S.ErrorIcon>
          <S.ErrorTitle>게시물을 불러올 수 없습니다</S.ErrorTitle>
          <S.ErrorMessage>
            게시물이 삭제되었거나 존재하지 않습니다.
          </S.ErrorMessage>
          <Square
            text="돌아가기"
            onClick={() => router.back()}
            status={true}
            width="200px"
          />
        </S.ErrorContainer>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      {isModal && <S.MobileClose onClick={() => history.back()}>×</S.MobileClose>}
      <S.Left>
        <MediaSlider
          images={images}
          current={current}
          fitMode={fitMode}
          onPrev={() => handleSlide('prev')}
          onNext={() => handleSlide('next')}
          onImageLoadForFit={handleImageLoadForFit}
        />
        <S.Footer>
          <S.Profile>
            <Image src={imageCheck(userProfile ?? undefined)} alt="user thumbnail" width={40} height={40} style={{ borderRadius: radius.full }} />
            <div>
              <p>{userId}</p>
              <p>{date}</p>
            </div>
          </S.Profile>
          {isHousePost && (
            <S.Buttons>
              <S.RoomTourWrapper ref={roomTourRef}>
                <Square text="룸투어" onClick={() => setShowRoomTour(prev => { const next = !prev; if (next) { setMenuOpen(false); setOpenCommentMenuId(null); } return next; })} status={true} width="max-content" />
                {showRoomTour && (
                  <RoomTourModal
                    boardingRoomId={postInfo.__typename === 'BoardingPost' ? postInfo.room.roomId : undefined}
                    onSuccess={() => {
                      if (postInfo.__typename === 'BoardingPost') {
                        const user = [postInfo.room.boardingHouse.host.user.userId, currentUserId].sort();
                        setShowRoomTour(false);
                        router.prefetch(`/message/${user.join(':')}`);
                        router.back();
                        setTimeout(() => {
                          navigate(`/message/${user.join(':')}`);
                        }, 300);
                      }
                    }}
                  />
                )}
              </S.RoomTourWrapper>
              <S.RoomTourWrapper>
                <Square text={creatingContract ? "보내는 중..." : "계약"} onClick={openContractPeriodPicker} status={true} width="max-content" />
                {showContractPeriods && (
                  <ContractPeriodModal
                    periods={(postInfo.__typename === 'BoardingPost' ? postInfo.room.contractPeriod || [] : []).map(p => p.contractPeriod)}
                    onConfirm={async (p) => {
                      await sendContract(p);
                      setShowContractPeriods(false);
                    }}
                    onClose={() => setShowContractPeriods(false)}
                  />
                )}
              </S.RoomTourWrapper>
            </S.Buttons>
          )}
        </S.Footer>
      </S.Left>
      <S.Right>
        <S.RightContent showComments={showComments} isModal={isModal}>
          {isHousePost ? (
            <BoardingPostContent
              isModal={isModal}
              roomName={roomName}
              headCount={postInfo.__typename === 'BoardingPost' ? postInfo.room.headCount : 0}
              location={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingHouse.location : undefined}
              desc={desc ?? ''}
              monthlyRent={postInfo.__typename === 'BoardingPost' ? postInfo.room.monthlyRent : undefined}
              periods={postInfo.__typename === 'BoardingPost' ? postInfo.room.contractPeriod.map(p => p.contractPeriod) : []}
              nearestStation={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingHouse.nearestStation : undefined}
              nearestSchool={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingHouse.nearestSchool : undefined}
              gender={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingHouse.gender : undefined}
              isMealProvided={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingHouse.isMealProvided : undefined}
              options={postInfo.__typename === 'BoardingPost' ? postInfo.room.boardingRoomOption : []}
            />
          ) : (
            <SnsPostContent
              date={date || ''}
              hashtags={postInfo.__typename === 'SnsPost' ? postInfo.hashtags : undefined}
              isEditingPost={isEditingPost}
              editingPostContent={editingPostContent}
              editingImages={editingImages}
              newImages={newImages}
              uploading={uploading}
              title={postInfo.__typename === 'SnsPost' ? postInfo.title : ''}
              displayDesc={displayDesc}
              onChangeContent={setEditingPostContent}
              onRemoveImage={removeImage}
              onRemoveNewImage={removeNewImage}
              onImageUpload={handleImageUpload}
              onCancelEdit={cancelEditPost}
              onSaveEdit={saveEditPost}
            />
          )}
        </S.RightContent>
        <CommentsPanel
          show={showComments}
          isModal={isModal}
          comments={comments}
          commentsLoading={commentsLoading}
          currentUserId={currentUserId ?? undefined}
          editingCommentId={editingCommentId}
          editingText={editingText}
          onChangeEditingText={setEditingText}
          onEditComment={handleEditComment}
          onSaveEditComment={saveEditComment}
          onCancelEditComment={cancelEditComment}
          onDeleteComment={(id) => deleteComment(id)}
          openCommentMenuId={openCommentMenuId}
          setOpenCommentMenuId={(id) => setOpenCommentMenuId(id)}
          onClose={() => setShowComments(false)}
        />
        {showComments ? (
          <S.InteractionBar isModal={isModal}>
            <S.CommentInputContainer>
              <S.CommentInput
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <S.SendButton onClick={submitComment} disabled={!commentText.trim()}>
                <Image src={SendIconSvg} alt="send" width={20} height={20} />
              </S.SendButton>
            </S.CommentInputContainer>
          </S.InteractionBar>
        ) : (
          <InteractionBar
            isModal={isModal}
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={commentCount}
            isPostOwner={isPostOwner}
            menuOpen={menuOpen}
            menuRef={actionMenuRef}
            onToggleLike={handleLikeToggle}
            onOpenComments={() => setShowComments(true)}
            onToggleMenu={() => setMenuOpen((prev) => { const next = !prev; if (next) { setShowRoomTour(false); setOpenCommentMenuId(null); } return next; })}
            onEditPost={postInfo.__typename === 'SnsPost' ? () => { handleEditPost(); setMenuOpen(false); } : undefined}
            onDeletePost={() => { deletePost(); setMenuOpen(false); }}
          />
        )}
      </S.Right>

      <ConfirmModal
        visible={Boolean(isOpen && commentToDelete !== null)}
        title="댓글 삭제"
        message={<>정말 댓글을 삭제하시겠습니까?</>}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDeleteComment}
        onCancel={cancelDeleteComment}
      />

      <ConfirmModal
        visible={Boolean(isOpen && postToDelete !== null)}
        title="게시물 삭제"
        message={<>정말 게시물을 삭제하시겠습니까?<br />삭제된 게시물은 복구할 수 없습니다.</>}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={confirmDeletePost}
        onCancel={cancelDeletePost}
      />
    </S.Wrapper>
  );
}