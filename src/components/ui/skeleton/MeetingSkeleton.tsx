import React from 'react';
import styled from '@emotion/styled';
import { shimmer } from './animations';
import { colors, radius } from "@/styles/theme";
import { mq } from "@/styles/media";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: white;
  padding: 0 5rem;
`;

const BannerSkeleton = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const BackBtnBoxSkeleton = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
const ContentSkeleton = styled.div`
  padding: 2rem 0;
`;

const TitleBoxSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const ImgBoxSkeleton = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${radius.md};
  flex-shrink: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const NameSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MeetingNameSkeleton = styled.div`
  height: 28px;
  width: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const AreaSkeleton = styled.div`
  height: 20px;
  width: 120px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const DescriptionSkeleton = styled.div`
  height: 80px;
  width: 100%;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const NavSkeleton = styled.div`
  display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 100%;
  gap: 0.5rem;
  border-bottom: 1px solid ${colors.line};
`;

const NavItemSkeleton = styled.div`
  height: 48px;
  width: 100%;
  margin-bottom: -1px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const PostContentSkeleton = styled.div<{ isModal: boolean }>`
  width: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(3, minmax(${props => props.isModal ? "220px" : "330px"}, 1fr));
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  margin: 0 auto;

  ${mq.mobile} {
    width: calc(100% - 2rem);
    gap: 0.25rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const PostItemSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${radius.md};
  cursor: pointer;
  overflow: hidden;
  
  ${mq.mobile} {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
  }
`;

const PostImgSkeleton = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${radius.md};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const MeetingSkeleton = ({ isModal = false }: { isModal?: boolean }) => {
  return (
    <ModalContainer>
      {/* Banner Skeleton */}
      <BannerSkeleton>
        <BackBtnBoxSkeleton />
      </BannerSkeleton>

      {/* Content Skeleton */}
      <ContentSkeleton>
        <TitleBoxSkeleton>
          <ImgBoxSkeleton />
          <NameSkeleton>
            <MeetingNameSkeleton />
            <AreaSkeleton />
          </NameSkeleton>
        </TitleBoxSkeleton>
        <DescriptionSkeleton />
      </ContentSkeleton>

      {/* Nav Skeleton */}
      <NavSkeleton>
        <NavItemSkeleton />
        <NavItemSkeleton />
        <NavItemSkeleton />
      </NavSkeleton>

      {/* Post Content Skeleton - MeetingPost와 동일한 그리드 레이아웃 */}
      <PostContentSkeleton isModal={isModal}>
        {Array.from({ length: 3 }, (_, index) => (
          <PostItemSkeleton key={index}>
            <PostImgSkeleton />
          </PostItemSkeleton>
        ))}
      </PostContentSkeleton>
    </ModalContainer>
  );
};

export default MeetingSkeleton;
