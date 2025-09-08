'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Arrow from '@/assets/post/arrow-right.svg';
import Square from '@/components/ui/button/square';
import RoomTourModal from './RoomTourModal';
import HeartIcon from '@/assets/post/heart.svg';
import CommentIcon from '@/assets/post/comment.svg';
import EllipsisIcon from '@/assets/post/ellipsis.svg';
import SendIconSvg from '@/assets/post/send.svg';
import * as S from './style';
import { radius } from '@/styles/theme';
import { useRouter } from 'next/navigation';
import { useApollo } from '@/lib/apolloClient';
import { PostDetailService } from '@/services/postDetail';
import type { PostDetailUnion, PostComment } from '@/types/postDetail';
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';
import { useModalStore } from '@/store/modal';
import { useFileUpload } from '@/hooks/useFileUpload';
import Modal from '@/components/layout/modal';

interface PostDetailProps { id: string; isModal?: boolean; }

export default function PostDetail({ id, isModal }: PostDetailProps) {
  const router = useRouter();
  const client = useApollo();
  const { id: currentUserId } = useUserStore();
  const { success, error } = useAlertStore();
  const { open: openModal, close: closeModal, isOpen } = useModalStore();
  const { upload: uploadFiles, loading: uploading } = useFileUpload();
  const [postInfo, setPostInfo] = useState<PostDetailUnion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostContent, setEditingPostContent] = useState('');
  const [editingImages, setEditingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await PostDetailService.getPostById(client, id);
        setPostInfo(post);
        if (post) {
          const currentLikeCount = post.__typename === 'SnsPost' ? post.likeCount : post.room.likeCount;
          const currentIsLiked = post.__typename === 'SnsPost' ? post.isLiked : post.room.isLiked;
          setLikeCount(currentLikeCount);
          setIsLiked(currentIsLiked || false);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [client, id]);

  const loadComments = async () => {
    if (!postInfo) return;

    try {
      setCommentsLoading(true);
      const postId = postInfo.__typename === 'SnsPost' ? postInfo.postId : postInfo.room.roomId;
      const commentList = await PostDetailService.getComments(client, postId);
      setComments(commentList);
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (postInfo && showComments) {
      loadComments();
    }
  }, [postInfo, showComments]);

  const isHousePost = postInfo?.__typename === 'BoardingPost';

  const images = useMemo(() => {
    if (!postInfo) return [] as string[];
    if (postInfo.__typename === 'SnsPost') return postInfo.files.map(f => f.url);
    return postInfo.room.boardingRoomFile.map(f => f.url);
  }, [postInfo]);

  const [current, setCurrent] = useState(0);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  useEffect(() => { setCurrent(0); }, [id]);
  const max = images.length - 1;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showRoomTour, setShowRoomTour] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [openCommentMenuId, setOpenCommentMenuId] = useState<string | null>(null);
  const roomTourRef = useRef<HTMLDivElement | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (showRoomTour && roomTourRef.current && !roomTourRef.current.contains(target)) setShowRoomTour(false);
      if (menuOpen && actionMenuRef.current && !actionMenuRef.current.contains(target)) setMenuOpen(false);
      if (openCommentMenuId !== null) setOpenCommentMenuId(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [menuOpen, showRoomTour, openCommentMenuId]);

  useEffect(() => { setFitMode('cover'); }, [current, images]);

  if (loading) return <div>불러오는 중...</div>;
  if (!postInfo) return <div>게시물을 불러올 수 없습니다.</div>;

  const handleSlide = (direction: 'next' | 'prev') => setCurrent(prev => direction === 'next' ? (prev < max ? prev + 1 : 0) : (prev > 0 ? prev - 1 : max));

  const submitComment = async () => {
    if (!commentText.trim() || !postInfo) return;

    try {
      const postId = postInfo.__typename === 'SnsPost' ? postInfo.postId : postInfo.room.roomId;
      await PostDetailService.createComment(client, postId, commentText);
      setCommentText('');
      await loadComments();
      success('댓글이 작성되었습니다.');
    } catch (err) {
      console.error('댓글 작성 실패:', err);
      error('댓글 작성에 실패했습니다.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitComment();
    }
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentContent);
  };

  const saveEditComment = async () => {
    if (!editingCommentId || !editingText.trim()) return;

    try {
      await PostDetailService.updateComment(client, editingCommentId, editingText);
      setEditingCommentId(null);
      setEditingText('');
      await loadComments();
      success('댓글이 수정되었습니다.');
    } catch (err) {
      console.error('댓글 수정 실패:', err);
      error('댓글 수정에 실패했습니다.');
    }
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const deleteComment = async (commentId: string) => {
    setCommentToDelete(commentId);
    openModal();
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      await PostDetailService.deleteComment(client, commentToDelete);
      await loadComments();
      success('댓글이 삭제되었습니다.');
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
      error('댓글 삭제에 실패했습니다.');
    } finally {
      setCommentToDelete(null);
      closeModal();
    }
  };

  const cancelDeleteComment = () => {
    setCommentToDelete(null);
    closeModal();
  };

  const handleEditPost = () => {
    if (!postInfo || postInfo.__typename !== 'SnsPost') return;

    setEditingPostContent(postInfo.contents);
    setEditingImages(postInfo.files.map(f => f.url));
    setNewImages([]);
    setIsEditingPost(true);
  };

  const saveEditPost = async () => {
    if (!postInfo || postInfo.__typename !== 'SnsPost' || !editingPostContent.trim()) return;

    try {
      let uploadedImageIds: string[] = [];
      if (newImages.length > 0) {
        uploadedImageIds = await uploadFiles(newImages);
      }

      const allImageIds = [...editingImages, ...uploadedImageIds];

      const hashTagMatches = editingPostContent.match(/#[^\s#]+/g) || [];
      const hashTags = hashTagMatches.map(tag => tag.substring(1));

      const postUpdateInput = {
        postId: postInfo.postId,
        postInfo: {
          title: postInfo.title || '',
          contents: editingPostContent,
          shareRange: 'ALL' as const,
          isGroup: false
        },
        files: allImageIds,
        hashTags: hashTags
      };

      await PostDetailService.updatePost(client, postUpdateInput);

      const updatedPost = await PostDetailService.getPostById(client, id);
      setPostInfo(updatedPost);

      setIsEditingPost(false);
      setEditingPostContent('');
      setEditingImages([]);
      setNewImages([]);
      success('게시물이 수정되었습니다.');
    } catch (err) {
      console.error('게시물 수정 실패:', err);
      error('게시물 수정에 실패했습니다.');
    }
  };

  const cancelEditPost = () => {
    setIsEditingPost(false);
    setEditingPostContent('');
    setEditingImages([]);
    setNewImages([]);
  };

  const removeImage = (index: number) => {
    setEditingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const parseContentWithHashtags = (content: string) => {
    const parts = content.split(/(#[^\s#]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#') && part.length > 1) {
        return (
          <span key={index} style={{ color: '#007AFF', fontWeight: '500' }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const deletePost = () => {
    if (!postInfo) return;
    const postId = postInfo.__typename === 'SnsPost' ? postInfo.postId : postInfo.room.roomId;
    setPostToDelete(postId);
    openModal();
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await PostDetailService.deletePost(client, postToDelete);
      success('게시물이 삭제되었습니다.');
      router.back();
    } catch (err) {
      console.error('게시물 삭제 실패:', err);
      error('게시물 삭제에 실패했습니다.');
    } finally {
      setPostToDelete(null);
      closeModal();
    }
  };

  const cancelDeletePost = () => {
    setPostToDelete(null);
    closeModal();
  };

  const handleLikeToggle = async () => {
    if (!postInfo) return;

    try {
      const postId = postInfo.__typename === 'SnsPost'
        ? postInfo.postId
        : postInfo.room.roomId;

      if (isLiked) {
        await PostDetailService.unlikePost(client, postId);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        await PostDetailService.likePost(client, postId);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류:', error);
    }
  };

  const commentCount = postInfo.__typename === 'SnsPost' ? postInfo.commentCount : postInfo.room.commentCount;
  const date = postInfo.__typename === 'SnsPost' ? postInfo.day : postInfo.room.day;
  const userProfile = postInfo.__typename === 'SnsPost' ? postInfo.author.profile : postInfo.room.boardingHouse.host.user.profile;
  const userId = postInfo.__typename === 'SnsPost' ? postInfo.author.userId : postInfo.room.boardingHouse.host.user.userId;
  const desc = postInfo.__typename === 'SnsPost' ? postInfo.contents : postInfo.room.description;

  const isPostOwner = currentUserId === userId;

  const roomName = isHousePost ? postInfo.room.name : undefined;
  const monthlyRent = isHousePost ? postInfo.room.monthlyRent : undefined;
  const periods = isHousePost ? postInfo.room.contractPeriod.map(p => p.contractPeriod) : [];
  const options = isHousePost ? postInfo.room.boardingRoomOption : [];
  const location = isHousePost ? postInfo.room.boardingHouse.location : undefined;
  const nearestStation = isHousePost ? postInfo.room.boardingHouse.nearestStation : undefined;
  const nearestSchool = isHousePost ? postInfo.room.boardingHouse.nearestSchool : undefined;
  const gender = isHousePost ? postInfo.room.boardingHouse.gender : undefined;
  const isMealProvided = isHousePost ? postInfo.room.boardingHouse.isMealProvided : undefined;

  return (
    <S.Wrapper>
      {isModal && <S.MobileClose onClick={() => router.back()}>×</S.MobileClose>}
      <S.Left>
        <S.SliderWrapper>
          {current > 0 && (
            <S.ArrowBtn left onClick={e => { e.stopPropagation(); handleSlide('prev'); }}>
              <Image src={Arrow} alt="arrow" fill style={{ objectFit: 'cover', transform: 'rotate(180deg)' }} />
            </S.ArrowBtn>
          )}
          <S.SliderTrack index={current} count={images.length}>
            {images.map((src, i) => (
              <S.Slide key={i}>
                <Image
                  src={src.startsWith('http') ? src : `https://cdn.solvit-nuri.com/file/${src}`}
                  alt={`slide-${i}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 640px"
                  onLoadingComplete={(img) => {
                    if (i !== current) return;
                    const ratio = img.naturalWidth / img.naturalHeight;
                    if (ratio > 1.35 || ratio < 0.74) setFitMode('contain'); else setFitMode('cover');
                  }}
                  style={{ objectFit: fitMode, backgroundColor: '#000', transition: 'object-fit 0.25s' }}
                />
              </S.Slide>
            ))}
          </S.SliderTrack>
          {current < max && (
            <S.ArrowBtn onClick={e => { e.stopPropagation(); handleSlide('next'); }}>
              <Image src={Arrow} alt="arrow" fill style={{ objectFit: 'cover' }} />
            </S.ArrowBtn>
          )}
        </S.SliderWrapper>
        <S.Footer>
          <S.Profile>
            <Image src={userProfile || '/post/default.png'} alt="user thumbnail" width={40} height={40} style={{ borderRadius: radius.full }} />
            <div>
              <p>{userId}</p>
              <p>{date}</p>
            </div>
          </S.Profile>
          {isHousePost && (
            <S.Buttons>
              <S.RoomTourWrapper ref={roomTourRef}>
                <Square text="룸투어" onClick={() => setShowRoomTour(prev => { const next = !prev; if (next) { setMenuOpen(false); setOpenCommentMenuId(null); } return next; })} status={true} width="max-content" />
                {showRoomTour && (<RoomTourModal />)}
              </S.RoomTourWrapper>
              <Square text="계약" onClick={() => { }} status={true} width="max-content" />
            </S.Buttons>
          )}
        </S.Footer>
      </S.Left>
      <S.Right>
        <S.RightContent showComments={showComments} isModal={isModal}>
          {isHousePost ? (
            <>
              <S.RightTopRow>
                <S.RightPeriodTags>
                  {periods.map(p => <S.RightPeriodTag key={p}>{p}개월</S.RightPeriodTag>)}
                </S.RightPeriodTags>
              </S.RightTopRow>
              <S.RightTitle>
                <span>{roomName}</span>
                <S.RightRoomType>{postInfo.room.headCount}인실</S.RightRoomType>
              </S.RightTitle>
              <S.RightSub>{location}</S.RightSub>
              <S.RightDesc>{desc}</S.RightDesc>
              <S.RightDivider />
              <S.RightLabelRow>
                <S.RightLabel>요금</S.RightLabel>
                <S.RightPriceRow>
                  <S.RightPriceUnit>월</S.RightPriceUnit>
                  <S.RightPriceValue>₩ {monthlyRent?.toLocaleString()}</S.RightPriceValue>
                </S.RightPriceRow>
              </S.RightLabelRow>
              <S.RightDivider />
              <S.RightFeatureList>
                {nearestStation && (
                  <S.RightFeature>
                    <S.RightFeatureIcon>
                      <Image src="/icons/post-detail/station.svg" alt="station" width={20} height={20} />
                    </S.RightFeatureIcon>
                    <S.RightFeatureContent>
                      <S.RightFeatureTitle>{nearestStation}</S.RightFeatureTitle>
                      <S.RightFeatureDesc>가까운 역</S.RightFeatureDesc>
                    </S.RightFeatureContent>
                  </S.RightFeature>
                )}
                {nearestSchool && (
                  <S.RightFeature>
                    <S.RightFeatureIcon>
                      <Image src="/icons/post-detail/school.svg" alt="school" width={20} height={20} />
                    </S.RightFeatureIcon>
                    <S.RightFeatureContent>
                      <S.RightFeatureTitle>{nearestSchool}</S.RightFeatureTitle>
                      <S.RightFeatureDesc>가까운 학교</S.RightFeatureDesc>
                    </S.RightFeatureContent>
                  </S.RightFeature>
                )}
                {gender && (
                  <S.RightFeature>
                    <S.RightFeatureIcon>
                      <Image
                        src={gender === 'MALE' ? '/icons/post-detail/gender-male.svg' : '/icons/post-detail/gender-female.svg'}
                        alt={gender === 'MALE' ? 'male' : 'female'}
                        width={20}
                        height={20}
                      />
                    </S.RightFeatureIcon>
                    <S.RightFeatureContent>
                      <S.RightFeatureTitle>{gender === 'MALE' ? '남성전용' : gender === 'FEMALE' ? '여성전용' : gender}</S.RightFeatureTitle>
                      <S.RightFeatureDesc>성별 제한</S.RightFeatureDesc>
                    </S.RightFeatureContent>
                  </S.RightFeature>
                )}
                {isMealProvided && (
                  <S.RightFeature>
                    <S.RightFeatureIcon>
                      <Image src="/icons/post-detail/meal.svg" alt="meal" width={20} height={20} />
                    </S.RightFeatureIcon>
                    <S.RightFeatureContent>
                      <S.RightFeatureTitle>식사 제공</S.RightFeatureTitle>
                      <S.RightFeatureDesc>식사 포함</S.RightFeatureDesc>
                    </S.RightFeatureContent>
                  </S.RightFeature>
                )}
              </S.RightFeatureList>
              <S.RightDivider />
              <S.RightLabel>시설</S.RightLabel>
              <S.RightFacilityGrid>
                {options.map(opt => (
                  <S.RightFacility key={opt.optionId}>
                    <S.RightFacilityIcon>
                      <Image src={`/icons/${opt.name === '침대' ? 'bed' : opt.name === '책상' ? 'cabinet' : 'home'}.svg`} alt={opt.name} width={32} height={32} />
                    </S.RightFacilityIcon>
                    <S.RightFacilityText>{opt.name}</S.RightFacilityText>
                  </S.RightFacility>
                ))}
              </S.RightFacilityGrid>
            </>
          ) : (
            <>
              <S.RightTopRow><S.RightPeriodTags /></S.RightTopRow>
              <S.RightSub>{date}</S.RightSub>
              {isEditingPost && postInfo.__typename === 'SnsPost' ? (
                <S.EditPostContainer>
                  <S.EditPostInlineTextarea
                    value={editingPostContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingPostContent(e.target.value)}
                    placeholder="게시물 내용을 입력하세요... (#태그 사용 가능)"
                  />

                  <S.EditImageSection>
                    <S.EditImageTitle>이미지</S.EditImageTitle>
                    <S.EditImageGrid>
                      {editingImages.map((src, index) => (
                        <S.EditImageItem key={`existing-${index}`}>
                          <Image
                            src={src.startsWith('http') ? src : `https://cdn.solvit-nuri.com/file/${src}`}
                            alt={`기존 이미지 ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                          <S.EditImageRemoveBtn onClick={() => removeImage(index)}>×</S.EditImageRemoveBtn>
                        </S.EditImageItem>
                      ))}
                      {newImages.map((file, index) => (
                        <S.EditImageItem key={`new-${index}`}>
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`새 이미지 ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                          <S.EditImageRemoveBtn onClick={() => removeNewImage(index)}>×</S.EditImageRemoveBtn>
                        </S.EditImageItem>
                      ))}
                      <S.EditImageUploadBtn>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <S.EditImageUploadIcon>+</S.EditImageUploadIcon>
                          <span>이미지 추가</span>
                        </label>
                      </S.EditImageUploadBtn>
                    </S.EditImageGrid>
                  </S.EditImageSection>

                  <S.EditPostButtons>
                    <Square
                      text="취소"
                      onClick={cancelEditPost}
                      status={false}
                      width="max-content"
                    />
                    <Square
                      text={uploading ? "업로드 중..." : "저장"}
                      onClick={saveEditPost}
                      status={!uploading}
                      width="max-content"
                    />
                  </S.EditPostButtons>
                </S.EditPostContainer>
              ) : (
                <S.RightDesc>{parseContentWithHashtags(desc)}</S.RightDesc>
              )}
            </>
          )}
        </S.RightContent>
        <S.CommentsSection show={showComments} isModal={isModal}>
          <S.CommentsHeader>
            <S.CommentsTitle>댓글 {comments.length}개</S.CommentsTitle>
            <S.CommentsCloseButton onClick={() => setShowComments(false)}>×</S.CommentsCloseButton>
          </S.CommentsHeader>
          <S.CommentsList>
            {commentsLoading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>댓글을 불러오는 중...</div>
            ) : (
              comments.map((comment: PostComment) => (
                <S.CommentItem key={comment.commentId}>
                  <S.CommentAvatar>
                    {comment.commenter.profile ? (
                      <Image src={comment.commenter.profile} alt={comment.commenter.userId} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <S.CommentAvatarFallback>
                        {(comment.commenter.name || comment.commenter.userId || '?').charAt(0)}
                      </S.CommentAvatarFallback>
                    )}
                  </S.CommentAvatar>
                  <S.CommentContent>
                    <S.CommentAuthor>{comment.commenter.userId}</S.CommentAuthor>
                    {editingCommentId === comment.commentId ? (
                      <S.CommentEditContainer>
                        <S.CommentEditTextarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          placeholder="댓글을 수정하세요..."
                        />
                        <S.CommentEditButtons>
                          <S.CommentEditSaveButton onClick={saveEditComment}>저장</S.CommentEditSaveButton>
                          <S.CommentEditCancelButton onClick={cancelEditComment}>취소</S.CommentEditCancelButton>
                        </S.CommentEditButtons>
                      </S.CommentEditContainer>
                    ) : (
                      <S.CommentText>{comment.content}</S.CommentText>
                    )}
                  </S.CommentContent>
                  {currentUserId === comment.commenter.userId && (
                    <S.MenuButton onClick={(e) => e.stopPropagation()}>
                      <S.CommentMenu onClick={(e) => { e.stopPropagation(); setOpenCommentMenuId(prev => { const opening = prev !== comment.commentId; if (opening) { setMenuOpen(false); setShowRoomTour(false); } return opening ? comment.commentId : null; }); }}>
                        <Image src={EllipsisIcon} alt="메뉴" width={16} height={16} />
                      </S.CommentMenu>
                      {openCommentMenuId === comment.commentId && (
                        <S.MenuDropdown placement="down">
                          <S.MenuItem onClick={(e) => { e.stopPropagation(); handleEditComment(comment.commentId, comment.content); setOpenCommentMenuId(null); }}>수정</S.MenuItem>
                          <S.MenuItem red onClick={(e) => { e.stopPropagation(); deleteComment(comment.commentId); setOpenCommentMenuId(null); }}>삭제</S.MenuItem>
                        </S.MenuDropdown>
                      )}
                    </S.MenuButton>
                  )}
                </S.CommentItem>
              ))
            )}
          </S.CommentsList>
        </S.CommentsSection>
        <S.InteractionBar isModal={isModal}>
          {showComments ? (
            <S.CommentInputContainer>
              <S.CommentInput placeholder="댓글을 입력하세요..." value={commentText} onChange={e => setCommentText(e.target.value)} onKeyPress={handleKeyPress} rows={1} />
              <S.SendButton onClick={submitComment} disabled={!commentText.trim()}>
                <Image src={SendIconSvg} alt="send" width={20} height={20} />
              </S.SendButton>
            </S.CommentInputContainer>
          ) : (
            <S.InteractionButtons>
              <S.ActionButton onClick={handleLikeToggle}>
                <Image
                  src={HeartIcon}
                  alt="like"
                  width={24}
                  height={24}
                  style={{
                    filter: isLiked ? 'brightness(0) saturate(100%) invert(30%) sepia(74%) saturate(4662%) hue-rotate(344deg) brightness(94%) contrast(93%)' : 'none'
                  }}
                />
                <S.ActionCount>{likeCount}</S.ActionCount>
              </S.ActionButton>
              <S.ActionButton onClick={() => setShowComments(true)}>
                <Image src={CommentIcon} alt="comment" width={22} height={22} />
                <S.ActionCount>{commentCount}</S.ActionCount>
              </S.ActionButton>
              <S.MenuButton ref={actionMenuRef} onClick={() => setMenuOpen(prev => { const next = !prev; if (next) { setShowRoomTour(false); setOpenCommentMenuId(null); } return next; })}>
                <Image src={EllipsisIcon} alt="menu" width={24} height={24} />
                {menuOpen && (
                  <S.MenuDropdown>
                    {isPostOwner && postInfo.__typename === 'SnsPost' && (
                      <S.MenuItem onClick={() => { handleEditPost(); setMenuOpen(false); }}>수정</S.MenuItem>
                    )}
                    {isPostOwner && (
                      <S.MenuItem onClick={() => { deletePost(); setMenuOpen(false); }} red>삭제</S.MenuItem>
                    )}
                    {!isPostOwner && (
                      <S.MenuItem onClick={() => { console.log('신고'); setMenuOpen(false); }}>신고</S.MenuItem>
                    )}
                  </S.MenuDropdown>
                )}
              </S.MenuButton>
            </S.InteractionButtons>
          )}
        </S.InteractionBar>
      </S.Right>

      {isOpen && commentToDelete && (
        <Modal>
          <div style={{ zIndex: 1200 }}>
            <S.ConfirmModalContent>
              <S.ConfirmModalTitle>댓글 삭제</S.ConfirmModalTitle>
              <S.ConfirmModalMessage>정말 댓글을 삭제하시겠습니까?</S.ConfirmModalMessage>
              <S.ConfirmModalButtons>
                <Square
                  text="취소"
                  onClick={cancelDeleteComment}
                  status={false}
                  width="max-content"
                />
                <Square
                  text="삭제"
                  onClick={confirmDeleteComment}
                  status={true}
                  width="max-content"
                />
              </S.ConfirmModalButtons>
            </S.ConfirmModalContent>
          </div>
        </Modal>
      )}

      {isOpen && postToDelete && (
        <Modal>
          <div style={{ zIndex: 1200 }}>
            <S.ConfirmModalContent>
              <S.ConfirmModalTitle>게시물 삭제</S.ConfirmModalTitle>
              <S.ConfirmModalMessage>정말 게시물을 삭제하시겠습니까?<br />삭제된 게시물은 복구할 수 없습니다.</S.ConfirmModalMessage>
              <S.ConfirmModalButtons>
                <Square
                  text="취소"
                  onClick={cancelDeletePost}
                  status={false}
                  width="max-content"
                />
                <Square
                  text="삭제"
                  onClick={confirmDeletePost}
                  status={true}
                  width="max-content"
                />
              </S.ConfirmModalButtons>
            </S.ConfirmModalContent>
          </div>
        </Modal>
      )}
    </S.Wrapper>
  );
}