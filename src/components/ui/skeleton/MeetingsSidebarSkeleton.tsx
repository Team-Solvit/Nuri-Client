import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { colors, radius } from "@/styles/theme";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid ${colors.line};
`;

const HeadTitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 200px;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
`;

const MeetingSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
  cursor: pointer;
`;

const ImgBoxSkeleton = styled(SkeletonBase)`
  width: 60px;
  height: 60px;
  border-radius: ${radius.md};
  flex-shrink: 0;
`;

const InfoSkeleton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantsSkeleton = styled(SkeletonBase)`
  height: 14px;
  width: 80px;
`;

const ArrowSkeleton = styled(SkeletonBase)`
  width: 8px;
  height: 8px;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 150px;
`;

const DescSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 100%;
`;

const MeetingsSidebarSkeleton = () => {
  return (
    <SidebarContainer>
      {/* Head Skeleton */}
      <Head>
        <HeadTitleSkeleton />
      </Head>

      {/* Content Skeleton */}
      <Content>
        {Array.from({ length: 4 }, (_, index) => (
          <MeetingSkeleton key={index}>
            <ImgBoxSkeleton />
            <InfoSkeleton>
              <SubSkeleton>
                <ParticipantsSkeleton />
                <ArrowSkeleton />
              </SubSkeleton>
              <TitleSkeleton />
              <DescSkeleton />
            </InfoSkeleton>
          </MeetingSkeleton>
        ))}
      </Content>
    </SidebarContainer>
  );
};

export default MeetingsSidebarSkeleton;
