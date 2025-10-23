import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { colors, radius } from "@/styles/theme";
import { mq } from "@/styles/media";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${mq.mobile} {
    gap: 0;

    & > article:first-of-type {
      margin-top: 6rem;
    }

    & > article {
      margin-top: 3rem;
    }
  }

  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 1rem 2rem 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const PostSkeleton = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 1rem;
  width: 100%;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
`;

const PostTitleSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 1rem 0;
`;

const ProfileSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThumbnailSkeleton = styled(SkeletonBase)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const UserInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserIdSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 80px;
`;

const DateSkeleton = styled(SkeletonBase)`
  height: 14px;
  width: 60px;
`;

const NavSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategorySkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 50px;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 36px;
  width: 100px;
  border-radius: 4px;
`;

const PostImgSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 400px;
  border-radius: 8px;
`;

const InfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const PostInfoSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InteractiveSkeleton = styled.div`
  display: flex;
  gap: 1rem;
`;

const InterSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconSkeleton = styled(SkeletonBase)`
  width: 28px;
  height: 28px;
  border-radius: 4px;
`;

const CountSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 20px;
`;

const PriceSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 100px;
`;

const PostNameSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 200px;
`;

const PostDescSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 100%;
`;

const PostScrollSkeleton = () => {
  return (
    <Container>
      {Array.from({ length: 3 }, (_, index) => (
        <PostSkeleton key={index}>
          {/* Post Title Skeleton */}
          <PostTitleSkeleton>
            <ProfileSkeleton>
              <ThumbnailSkeleton />
              <UserInfoSkeleton>
                <UserIdSkeleton />
                <DateSkeleton />
              </UserInfoSkeleton>
            </ProfileSkeleton>
            <NavSkeleton>
              <CategorySkeleton />
              <ButtonSkeleton />
            </NavSkeleton>
          </PostTitleSkeleton>

          {/* Post Image Skeleton */}
          <PostImgSkeleton />

          {/* Info Skeleton */}
          <InfoSkeleton>
            <PostInfoSkeleton>
              <InteractiveSkeleton>
                <InterSkeleton>
                  <IconSkeleton />
                  <CountSkeleton />
                </InterSkeleton>
                <InterSkeleton>
                  <IconSkeleton />
                  <CountSkeleton />
                </InterSkeleton>
              </InteractiveSkeleton>
              <PriceSkeleton />
            </PostInfoSkeleton>
            <PostNameSkeleton />
            <PostDescSkeleton />
          </InfoSkeleton>
        </PostSkeleton>
      ))}
    </Container>
  );
};

export default PostScrollSkeleton;
