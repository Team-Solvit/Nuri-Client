import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

const PostItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  width: 73vw;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  background-color: ${colors.background};
  margin-bottom: 12px;

  ${mq.mobile} {
    width: 100%;
  }
`;

const PostMainSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const ProfileSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImageSkeleton = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 40px;
    height: 40px;
  }
`;

const UsernameSkeleton = styled(SkeletonBase)`
  width: 100px;
  height: 14px;

  ${mq.mobile} {
    height: 12px;
    width: 80px;
  }
`;

const PostContentSkeleton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ThumbnailSkeleton = styled(SkeletonBase)`
  flex-shrink: 0;
  width: 6vw;
  height: 9vh;
  border-radius: 10px;

  ${mq.mobile} {
    width: 20vw;
    height: 8.5vh;
  }
`;

const TextContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const TitleSkeleton = styled(SkeletonBase)`
  width: 70%;
  height: 16px;

  ${mq.mobile} {
    height: 14px;
    width: 60%;
  }
`;

const PriceSkeleton = styled(SkeletonBase)`
  width: 50%;
  height: 14px;

  ${mq.mobile} {
    width: 40%;
    height: 12px;
  }
`;

export default function ExplorePostItemSkeleton() {
  return (
    <PostItemSkeleton>
      <PostMainSkeleton>
        <ProfileSkeleton>
          <ProfileImageSkeleton />
          <UsernameSkeleton />
        </ProfileSkeleton>
        <PostContentSkeleton>
          <ThumbnailSkeleton />
          <TextContentSkeleton>
            <TitleSkeleton />
            <PriceSkeleton />
          </TextContentSkeleton>
        </PostContentSkeleton>
      </PostMainSkeleton>
    </PostItemSkeleton>
  );
}
