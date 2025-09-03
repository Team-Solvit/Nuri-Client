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
import type { PostDetailUnion, BoardingPostDetail, SnsPostDetail } from '@/types/postDetail';

interface PostDetailProps { id: string; isModal?: boolean; }

const mockComments = [
  { id: 1, author: 'huhon123', avatar: '/avatars/user1.png', text: '첫 번째 댓글입니다!' },
  { id: 2, author: 'fooBar', avatar: '/avatars/user2.png', text: '두 번째 댓글이여~' },
  { id: 3, author: 'bazQux', avatar: '/avatars/user3.png', text: '마지막 댓글입니다 :)' },
];

export default function PostDetail({ id, isModal }: PostDetailProps) {
  const router = useRouter();
  const client = useApollo();
  const [postInfo, setPostInfo] = useState<PostDetailUnion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await PostDetailService.getPostById(client, id);
        setPostInfo(post);
        if (post) {
          setLikeCount(post.likeCount);
          // TODO: 실제 좋아요 상태는 서버에서 받아와야 함
          setIsLiked(false); 
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [client, id]);

  const isHousePost = postInfo?.__typename === 'BoardingPost';

  const images = useMemo(() => {
    if (!postInfo) return [] as string[];
    if (postInfo.__typename === 'SnsPost') return postInfo.files.map(f => f.url);
    return postInfo.room.boardingRoomFile.map(f => f.url);
  }, [postInfo]);

  const [current, setCurrent] = useState(0);
  useEffect(() => { setCurrent(0); }, [id]);
  const max = images.length - 1;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showRoomTour, setShowRoomTour] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [openCommentMenuId, setOpenCommentMenuId] = useState<number | null>(null);
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

  if (loading) return <div>불러오는 중...</div>;
  if (!postInfo) return <div>게시물을 불러올 수 없습니다.</div>;

  const handleSlide = (direction: 'next' | 'prev') => setCurrent(prev => direction === 'next' ? (prev < max ? prev + 1 : 0) : (prev > 0 ? prev - 1 : max));
  const submitComment = () => { if (!commentText.trim()) return; console.log('새 댓글 전송:', commentText); setCommentText(''); };
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(); } };

  // 좋아요 토글 핸들러
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

  const commentCount = postInfo.commentCount;
  const date = postInfo.__typename === 'SnsPost' ? postInfo.day : postInfo.room.day;
  const userProfile = postInfo.__typename === 'SnsPost' ? postInfo.author.profile : postInfo.room.boardingHouse.host.user.profile;
  const userId = postInfo.__typename === 'SnsPost' ? postInfo.author.userId : postInfo.room.boardingHouse.host.user.userId;
  const desc = postInfo.__typename === 'SnsPost' ? postInfo.contents : postInfo.room.description;

  // Boarding specific
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
                <Image src={src.startsWith('http') ? src : `https://cdn.solvit-nuri.com/file/${src}`} alt={`slide-${i}`} fill style={{ objectFit: 'cover' }} />
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
                <S.RightRoomType>{postInfo.room.status === 'EMPTY_ROOM' ? '빈방' : postInfo.room.status}</S.RightRoomType>
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
                      <Image src="/icons/post-detail/gender-female.svg" alt="gender" width={20} height={20} />
                    </S.RightFeatureIcon>
                    <S.RightFeatureContent>
                      <S.RightFeatureTitle>{gender === 'MALE' ? '남성전용' : gender === 'FEMALE' ? '여성전용' : gender}</S.RightFeatureTitle>
                      <S.RightFeatureDesc>{gender === 'MALE' ? '남성전용' : gender === 'FEMALE' ? '여성전용' : ''}</S.RightFeatureDesc>
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
              <S.RightDesc>{desc}</S.RightDesc>
            </>
          )}
        </S.RightContent>
        <S.CommentsSection show={showComments} isModal={isModal}>
          <S.CommentsHeader>
            <S.CommentsTitle>댓글 {mockComments.length}개</S.CommentsTitle>
            <S.CommentsCloseButton onClick={() => setShowComments(false)}>×</S.CommentsCloseButton>
          </S.CommentsHeader>
          <S.CommentsList>
            {mockComments.map(comment => (
              <S.CommentItem key={comment.id}>
                <S.CommentAvatar>
                  <Image src={comment.avatar} alt={comment.author} fill style={{ objectFit: 'cover' }} />
                </S.CommentAvatar>
                <S.CommentContent>
                  <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                  <S.CommentText>{comment.text}</S.CommentText>
                </S.CommentContent>
                <S.MenuButton onClick={(e) => e.stopPropagation()}>
                  <S.CommentMenu onClick={(e) => { e.stopPropagation(); setOpenCommentMenuId(prev => { const opening = prev !== comment.id; if (opening) { setMenuOpen(false); setShowRoomTour(false); } return opening ? comment.id : null; }); }}>
                    <Image src={EllipsisIcon} alt="메뉴" width={16} height={16} />
                  </S.CommentMenu>
                  {openCommentMenuId === comment.id && (
                    <S.MenuDropdown placement="down">
                      <S.MenuItem onClick={(e) => { e.stopPropagation(); console.log('댓글 수정', comment.id); setOpenCommentMenuId(null); }}>수정</S.MenuItem>
                      <S.MenuItem red onClick={(e) => { e.stopPropagation(); console.log('댓글 삭제', comment.id); setOpenCommentMenuId(null); }}>삭제</S.MenuItem>
                    </S.MenuDropdown>
                  )}
                </S.MenuButton>
              </S.CommentItem>
            ))}
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
                    <S.MenuItem onClick={() => { console.log('수정'); setMenuOpen(false); }}>수정</S.MenuItem>
                    <S.MenuItem onClick={() => { console.log('삭제'); setMenuOpen(false); }} red>삭제</S.MenuItem>
                  </S.MenuDropdown>
                )}
              </S.MenuButton>
            </S.InteractionButtons>
          )}
        </S.InteractionBar>
      </S.Right>
    </S.Wrapper>
  );
}