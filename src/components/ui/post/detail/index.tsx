'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Arrow from '@/assets/post/arrow-right.svg';
import Square from '@/components/ui/button/square';
import RoomTourModal from './RoomTourModal';
import { fakeData } from '@/containers/home/post-scroll/data';
import HeartIcon from '@/assets/post/heart.svg';
import CommentIcon from '@/assets/post/comment.svg';
import EllipsisIcon from '@/assets/post/ellipsis.svg';
import SendIconSvg from '@/assets/post/send.svg';
import * as S from './style';
import { radius } from '@/styles/theme';
import { useRouter } from 'next/navigation';

interface PostDetailProps {
  id: string;
  isModal?: boolean;
}

const mockComments = [
  { id: 1, author: 'huhon123', avatar: '/avatars/user1.png', text: '첫 번째 댓글입니다!' },
  { id: 2, author: 'fooBar', avatar: '/avatars/user2.png', text: '두 번째 댓글이여~' },
  { id: 3, author: 'bazQux', avatar: '/avatars/user3.png', text: '마지막 댓글입니다 :)' },
];

export default function PostDetail({ id, isModal }: PostDetailProps) {
  const router = useRouter();
  const post = fakeData.find((p) => p.id.toString() === id);
  const isHousePost = post?.subject === "하숙집";
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showRoomTour, setShowRoomTour] = useState(false);
  const [commentText, setCommentText] = useState('');

  if (!post) return <div>게시물을 불러올수 없습니다.</div>

  const comments = mockComments;
  const images = post.thumbnail || [];
  const max = images.length - 1;

  const handleSlide = (direction: 'next' | 'prev') => {
    setCurrent(prev => {
      if (direction === 'next') {
        return prev < max ? prev + 1 : 0;
      } else {
        return prev > 0 ? prev - 1 : max;
      }
    });
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    console.log('새 댓글 전송:', commentText);
    // TODO: 실제 전송 로직
    setCommentText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitComment();
    }
  };

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
                <Image src={src} alt={`slide-${i}`} fill style={{ objectFit: 'cover' }} />
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
            <Image src={post.user.thumbnail} alt="user thumbnail" width={40} height={40} style={{ borderRadius: radius.full }} />
            <div>
              <p>{post.user.userId}</p>
              <p>{post.date}</p>
            </div>
          </S.Profile>
          {isHousePost && (
            <S.Buttons>
              <S.RoomTourWrapper>
                <Square
                  text="룸투어"
                  onClick={() => setShowRoomTour(o => !o)}
                  status={true}
                  width="max-content"
                />
                {showRoomTour && (
                  <RoomTourModal />
                )}
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
                  <S.RightPeriodTag>6개월</S.RightPeriodTag>
                  <S.RightPeriodTag>2개월</S.RightPeriodTag>
                  <S.RightPeriodTag>자유</S.RightPeriodTag>
                </S.RightPeriodTags>
              </S.RightTopRow>

              <S.RightTitle>
                <span>그랜마 하우스 301호</span>
                <S.RightRoomType>1인실</S.RightRoomType>
              </S.RightTitle>
              <S.RightSub>부산광역시 남구</S.RightSub>
              <S.RightDesc>
                그랜마 하우스 3호은 슈퍼싱글 사이즈 침대, 책상, 에어컨, 냉장고, 수납장이 준비된 1인 실 입니다. 큰 창이 있어서 밝고 환기가 잘되며 조용하고 포근한 방입니다.
              </S.RightDesc>

              <S.RightDivider />

              <S.RightLabelRow>
                <S.RightLabel>요금</S.RightLabel>
                <S.RightPriceRow>
                  <S.RightPriceUnit>월</S.RightPriceUnit>
                  <S.RightPriceValue>₩ 300,000</S.RightPriceValue>
                </S.RightPriceRow>
              </S.RightLabelRow>

              <S.RightDivider />

              <S.RightFeatureList>
                <S.RightFeature>
                  <S.RightFeatureIcon>
                    <Image src="/icons/post-detail/language.svg" alt="language" width={20} height={20} />
                  </S.RightFeatureIcon>
                  <S.RightFeatureContent>
                    <S.RightFeatureTitle>영어</S.RightFeatureTitle>
                    <S.RightFeatureDesc>호스트의 영어로 소통이 가능해요</S.RightFeatureDesc>
                  </S.RightFeatureContent>
                </S.RightFeature>
                <S.RightFeature>
                  <S.RightFeatureIcon>
                    <Image src="/icons/post-detail/station.svg" alt="station" width={20} height={20} />
                  </S.RightFeatureIcon>
                  <S.RightFeatureContent>
                    <S.RightFeatureTitle>연제역</S.RightFeatureTitle>
                    <S.RightFeatureDesc>연제역과 가까워요</S.RightFeatureDesc>
                  </S.RightFeatureContent>
                </S.RightFeature>
                <S.RightFeature>
                  <S.RightFeatureIcon>
                    <Image src="/icons/post-detail/school.svg" alt="school" width={20} height={20} />
                  </S.RightFeatureIcon>
                  <S.RightFeatureContent>
                    <S.RightFeatureTitle>부산대학교</S.RightFeatureTitle>
                    <S.RightFeatureDesc>부산대학교와 가까워요</S.RightFeatureDesc>
                  </S.RightFeatureContent>
                </S.RightFeature>
                <S.RightFeature>
                  <S.RightFeatureIcon>
                    <Image src="/icons/post-detail/gender-female.svg" alt="female" width={20} height={20} />
                  </S.RightFeatureIcon>
                  <S.RightFeatureContent>
                    <S.RightFeatureTitle>여성전용</S.RightFeatureTitle>
                    <S.RightFeatureDesc>여성전용으로 운영되고 있어요</S.RightFeatureDesc>
                  </S.RightFeatureContent>
                </S.RightFeature>
              </S.RightFeatureList>

              {/* <S.RightDivider />

              <S.RightLabel>식사</S.RightLabel>
              <S.RightImageBox>
                <S.RightImage src="/post/meal.png" alt="meal" />
              </S.RightImageBox> */}

              <S.RightDivider />

              <S.RightLabel>시설</S.RightLabel>
              <S.RightFacilityGrid>
                <S.RightFacility>
                  <S.RightFacilityIcon>
                    <Image src="/icons/bed.svg" alt="bed" width={32} height={32} />
                  </S.RightFacilityIcon>
                  <S.RightFacilityText>침대</S.RightFacilityText>
                </S.RightFacility>
                <S.RightFacility>
                  <S.RightFacilityIcon>
                    <Image src="/icons/cabinet.svg" alt="cabinet" width={32} height={32} />
                  </S.RightFacilityIcon>
                  <S.RightFacilityText>수납장</S.RightFacilityText>
                </S.RightFacility>
                <S.RightFacility>
                  <S.RightFacilityIcon>
                    <Image src="/icons/fridge.svg" alt="fridge" width={32} height={32} />
                  </S.RightFacilityIcon>
                  <S.RightFacilityText>개별 냉장고</S.RightFacilityText>
                </S.RightFacility>
                <S.RightFacility>
                  <S.RightFacilityIcon>
                    <Image src="/icons/mirror.svg" alt="mirror" width={32} height={32} />
                  </S.RightFacilityIcon>
                  <S.RightFacilityText>전신 거울</S.RightFacilityText>
                </S.RightFacility>
              </S.RightFacilityGrid>
            </>
          ) : (
            <>
              <S.RightTopRow>
                <S.RightPeriodTags>
                  <S.RightPeriodTag>6개월</S.RightPeriodTag>
                  <S.RightPeriodTag>2개월</S.RightPeriodTag>
                  <S.RightPeriodTag>자유</S.RightPeriodTag>
                </S.RightPeriodTags>
              </S.RightTopRow>
              <S.RightSub>부산광역시 남구</S.RightSub>
              <S.RightDesc>
                그랜마 하우스 3호은 슈퍼싱글 사이즈 침대, 책상, 에어컨, 냉장고, 수납장이 준비된 1인 실 입니다. 큰 창이 있어서 밝고 환기가 잘되며 조용하고 포근한 방입니다.
              </S.RightDesc>
            </>
          )}
        </S.RightContent>

        {/* 댓글 섹션 */}
        <S.CommentsSection show={showComments} isModal={isModal}>
          <S.CommentsHeader>
            <S.CommentsTitle>댓글 {comments.length}개</S.CommentsTitle>
            <S.CommentsCloseButton onClick={() => setShowComments(false)}>
              ×
            </S.CommentsCloseButton>
          </S.CommentsHeader>
          <S.CommentsList>
            {comments.map((comment) => (
              <S.CommentItem key={comment.id}>
                <S.CommentAvatar>
                  <Image src={comment.avatar} alt={comment.author} fill style={{ objectFit: 'cover' }} />
                </S.CommentAvatar>
                <S.CommentContent>
                  <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                  <S.CommentText>{comment.text}</S.CommentText>
                </S.CommentContent>
                <S.CommentMenu>
                  <Image src={EllipsisIcon} alt="메뉴" width={16} height={16} />
                </S.CommentMenu>
              </S.CommentItem>
            ))}
          </S.CommentsList>
        </S.CommentsSection>

        <S.InteractionBar isModal={isModal}>
          {showComments ? (
            <S.CommentInputContainer>
              <S.CommentInput
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <S.SendButton onClick={submitComment} disabled={!commentText.trim()}>
                <Image src={SendIconSvg} alt="send" width={20} height={20} />
              </S.SendButton>
            </S.CommentInputContainer>
          ) : (
            <S.InteractionButtons>
              <S.ActionButton onClick={() => console.log('좋아요!')}>
                <Image src={HeartIcon} alt="like" width={24} height={24} />
                <S.ActionCount>{post.likes ?? 3}</S.ActionCount>
              </S.ActionButton>
              <S.ActionButton onClick={() => setShowComments(true)}>
                <Image src={CommentIcon} alt="comment" width={22} height={22} />
                <S.ActionCount>{post.comments ?? 3}</S.ActionCount>
              </S.ActionButton>
              <S.MenuButton onClick={() => setMenuOpen(o => !o)}>
                <Image src={EllipsisIcon} alt="menu" width={24} height={24} />
                {menuOpen && (
                  <S.MenuDropdown>
                    <S.MenuItem onClick={() => { console.log('수정'); setMenuOpen(false); }} red={false}>수정</S.MenuItem>
                    <S.MenuItem onClick={() => { console.log('삭제'); setMenuOpen(false); }} red={true}>삭제</S.MenuItem>
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