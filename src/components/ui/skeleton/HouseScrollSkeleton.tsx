import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 28px;
  width: 150px;
`;

const SettingSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 80px;
`;

const InfoSectionSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRowSkeleton = styled.div`
  display: flex;
	width: 100%;
	justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const InfoLabelSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 80px;
`;

const InfoValueSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 120px;
`;

const MoreSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 60px;
  align-self: center;
`;

const RoomInfoContainerSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomInfoTitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 100px;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 36px;
  width: 100px;
`;

const RoomListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RoomCardSkeleton = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
`;

const RoomImageSkeleton = styled(SkeletonBase)`
  width: 100px;
  height: 80px;
  border-radius: 8px;
`;

const RoomContentSkeleton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoomHeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RoomInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RoomNameSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 120px;
`;

const ProfileWrapSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImgSkeleton = styled(SkeletonBase)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const UserIdSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 80px;
`;

const ButtonSkeletonSmall = styled(SkeletonBase)`
  height: 32px;
  width: 80px;
`;

const HouseScrollSkeleton = () => {
  return (
    <Container>
      {/* Header Skeleton */}
      <HeaderSkeleton>
        <TitleSkeleton />
        <SettingSkeleton />
      </HeaderSkeleton>

      {/* Info Section Skeleton */}
      <InfoSectionSkeleton>
        {Array.from({ length: 6 }, (_, index) => (
          <InfoRowSkeleton key={index}>
            <InfoLabelSkeleton />
            <InfoValueSkeleton />
          </InfoRowSkeleton>
        ))}
      </InfoSectionSkeleton>

      {/* More Button Skeleton */}
      <MoreSkeleton />

      {/* Room Info Container Skeleton */}
      <RoomInfoContainerSkeleton>
        <RoomInfoTitleSkeleton />
        <ButtonSkeleton />
      </RoomInfoContainerSkeleton>

      {/* Room List Skeleton */}
      <RoomListSkeleton>
        {Array.from({ length: 3 }, (_, index) => (
          <RoomCardSkeleton key={index}>
            <RoomImageSkeleton />
            <RoomContentSkeleton>
              <RoomHeaderSkeleton>
                <RoomInfoSkeleton>
                  <RoomNameSkeleton />
                  <ProfileWrapSkeleton>
                    <ProfileImgSkeleton />
                    <UserIdSkeleton />
                  </ProfileWrapSkeleton>
                </RoomInfoSkeleton>
                <ButtonSkeletonSmall />
              </RoomHeaderSkeleton>
            </RoomContentSkeleton>
          </RoomCardSkeleton>
        ))}
      </RoomListSkeleton>
    </Container>
  );
};

export default HouseScrollSkeleton;
