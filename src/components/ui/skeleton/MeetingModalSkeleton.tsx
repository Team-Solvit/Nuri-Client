import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { colors, radius } from "@/styles/theme";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${radius.lg};
  width: 60vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const BannerSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
  border-radius: ${radius.lg} ${radius.lg} 0 0;
`;

const ContentSkeleton = styled.div`
  padding: 2rem;
`;

const TitleBoxSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const InfoSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProfileImageSkeleton = styled(SkeletonBase)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const NameSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MeetingNameSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 150px;
`;

const AreaSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 100px;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 40px;
  width: 100px;
  border-radius: 4px;
`;

const DescriptionSkeleton = styled(SkeletonBase)`
  height: 60px;
  width: 100%;
  margin-bottom: 2rem;
`;

const PostSkeleton = styled.div`
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  padding: 1rem;
  margin-bottom: 1rem;
`;

const PostHeaderSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const PostProfileSkeleton = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const PostUserInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PostUserNameSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 80px;
`;

const PostDateSkeleton = styled(SkeletonBase)`
  height: 14px;
  width: 60px;
`;

const PostContentSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const MembersSection = styled.div`
  margin-top: 2rem;
`;

const MembersSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MemberSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MemberProfileSkeleton = styled(SkeletonBase)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const MemberNameSkeleton = styled(SkeletonBase)`
  height: 14px;
  width: 40px;
`;

const MeetingModalSkeleton = () => {
  return (
    <ModalContainer>
      <ModalContent>
        {/* Banner Skeleton */}
        <BannerSkeleton />
        
        {/* Content Skeleton */}
        <ContentSkeleton>
          {/* Title Box Skeleton */}
          <TitleBoxSkeleton>
            <InfoSkeleton>
              <ProfileImageSkeleton />
              <NameSkeleton>
                <MeetingNameSkeleton />
                <AreaSkeleton />
              </NameSkeleton>
            </InfoSkeleton>
            <ButtonSkeleton />
          </TitleBoxSkeleton>

          {/* Description Skeleton */}
          <DescriptionSkeleton />

          {/* Posts Skeleton */}
          {Array.from({ length: 3 }, (_, index) => (
            <PostSkeleton key={index}>
              <PostHeaderSkeleton>
                <PostProfileSkeleton />
                <PostUserInfoSkeleton>
                  <PostUserNameSkeleton />
                  <PostDateSkeleton />
                </PostUserInfoSkeleton>
              </PostHeaderSkeleton>
              <PostContentSkeleton />
            </PostSkeleton>
          ))}

          {/* Members Section Skeleton */}
          <MembersSection>
            <MembersSkeleton>
              {Array.from({ length: 6 }, (_, index) => (
                <MemberSkeleton key={index}>
                  <MemberProfileSkeleton />
                  <MemberNameSkeleton />
                </MemberSkeleton>
              ))}
            </MembersSkeleton>
          </MembersSection>
        </ContentSkeleton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MeetingModalSkeleton;
