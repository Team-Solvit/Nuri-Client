'use client'

import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

import { SkeletonBase } from './animations';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.background};
  border-radius: ${radius.lg};
  width: 100%;
  padding: 4rem;

  ${mq.mobile} {
    padding: 1rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;

  ${mq.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImageSkeleton = styled(SkeletonBase)`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  min-width: 150px;
  min-height: 150px;

  ${mq.mobile} {
    width: 31vw;
    height: 31vw;
    min-width: 100px;
    min-height: 100px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UsernameSkeleton = styled(SkeletonBase)`
  width: 150px;
  height: 28px;
`;

const ButtonsSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 40px;
`;

const StatsSkeleton = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const StatSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatValueSkeleton = styled(SkeletonBase)`
  width: 40px;
  height: 24px;
`;

const StatLabelSkeleton = styled(SkeletonBase)`
  width: 60px;
  height: 16px;
`;

const IntroSkeleton = styled(SkeletonBase)`
  width: 100%;
  max-width: 400px;
  height: 20px;
  margin-top: 1rem;
`;

const TabsSkeleton = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  border-top: 2px solid ${colors.line};
  padding-top: 1rem;
  margin-bottom: 2rem;
`;

const TabSkeleton = styled(SkeletonBase)`
  width: 80px;
  height: 24px;
`;

const PostGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;

  ${mq.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PostItemSkeleton = styled(SkeletonBase)`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export default function ProfileSkeleton() {
  return (
    <ProfileWrapper>
      <ProfileSection>
        <ProfileImageSkeleton />
        <ProfileInfo>
          <UsernameSkeleton />
          <ButtonsSkeleton>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </ButtonsSkeleton>
          <StatsSkeleton>
            <StatSkeleton>
              <StatValueSkeleton />
              <StatLabelSkeleton />
            </StatSkeleton>
            <StatSkeleton>
              <StatValueSkeleton />
              <StatLabelSkeleton />
            </StatSkeleton>
            <StatSkeleton>
              <StatValueSkeleton />
              <StatLabelSkeleton />
            </StatSkeleton>
          </StatsSkeleton>
          <IntroSkeleton />
        </ProfileInfo>
      </ProfileSection>
      
      <TabsSkeleton>
        <TabSkeleton />
        <TabSkeleton />
      </TabsSkeleton>

      <PostGridSkeleton>
        {[...Array(6)].map((_, i) => (
          <PostItemSkeleton key={i} />
        ))}
      </PostGridSkeleton>
    </ProfileWrapper>
  );
}
