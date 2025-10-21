import React from 'react';
import styled from '@emotion/styled';
import { shimmer } from './animations';
import { colors, radius } from "@/styles/theme";
import { mq } from "@/styles/media";

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  ${mq.mobile} {
    padding: 0 1rem;
  }
`;

const AlertItemSkeleton = styled.article`
  display: flex;
  gap: 0.5rem;
  padding: 2rem 1rem;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${colors.line};
  background-color: #fafafa;
  border-radius: ${radius.md};

  &:first-of-type {
    ${mq.mobile} {
      margin-top: 6rem;
    }
  }

  &:last-of-type {
    ${mq.mobile} {
      margin-bottom: 3rem;
    }
  }
`;

const ProfileSkeleton = styled(SkeletonBase)`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  flex-shrink: 0;
`;

const InfoSkeleton = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 100%;
`;

const DateSkeleton = styled(SkeletonBase)`
  height: 12px;
  width: 80px;
  margin-top: 4px;
`;

const AlertScrollSkeleton = () => {
  return (
    <Container>
      {Array.from({ length: 8 }, (_, index) => (
        <AlertItemSkeleton key={index}>
          <ProfileSkeleton />
          <InfoSkeleton>
            <TitleSkeleton />
            <DateSkeleton />
          </InfoSkeleton>
        </AlertItemSkeleton>
      ))}
    </Container>
  );
};

export default AlertScrollSkeleton;
