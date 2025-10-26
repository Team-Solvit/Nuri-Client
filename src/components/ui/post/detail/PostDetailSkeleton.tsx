import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    ${colors.line} 0%,
    ${colors.line2} 20%,
    ${colors.line} 40%,
    ${colors.line} 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${radius.md};
`;

const Wrapper = styled.div<{ isModal?: boolean }>`
  position: ${({ isModal }) => (isModal ? 'fixed' : 'relative')};
  ${({ isModal }) => isModal ? `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 1200px;
    height: 85vh;
    max-height: 800px;
    border-radius: ${radius.lg};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  ` : `
    width: 100%;
    height: 100vh;
  `}
  background: white;
  display: flex;
  overflow: hidden;

  ${mq.mobile} {
    ${({ isModal }) => isModal ? `
      width: 95%;
      height: 90vh;
    ` : `
      width: 100%;
      height: auto;
    `}
    flex-direction: column;
  }
`;

const Backdrop = styled.div<{ isModal?: boolean }>`
  display: ${({ isModal }) => (isModal ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  min-width: 400px;

  ${mq.mobile} {
    min-width: unset;
    flex: 0 0 50%;
  }
`;

const ImageSkeleton = styled(SkeletonBase)`
  flex: 1;
  border-radius: ${radius.md};
  margin: 1rem;

  ${mq.mobile} {
    margin: 0.75rem;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${colors.line};

  ${mq.mobile} {
    padding: 0.75rem 1rem;
  }
`;

const Profile = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ProfileImage = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: ${radius.full};
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileName = styled(SkeletonBase)`
  width: 80px;
  height: 14px;
`;

const ProfileDate = styled(SkeletonBase)`
  width: 100px;
  height: 12px;
`;

const Right = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  background: white;
  border-left: 1px solid ${colors.line};

  ${mq.mobile} {
    flex: 1;
    border-left: none;
    border-top: 1px solid ${colors.line};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.line};

  ${mq.mobile} {
    padding: 1rem;
  }
`;

const DateSkeleton = styled(SkeletonBase)`
  width: 100px;
  height: 14px;
`;

const Content = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${mq.mobile} {
    padding: 1rem;
  }
`;

const LineSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 14px;
`;

const ShortLineSkeleton = styled(SkeletonBase)`
  width: 70%;
  height: 14px;
`;

const InteractionBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${colors.line};

  ${mq.mobile} {
    padding: 0.75rem 1rem;
  }
`;

const IconSkeleton = styled(SkeletonBase)`
  width: 60px;
  height: 20px;
`;

interface PostDetailSkeletonProps {
  isModal?: boolean;
}

export default function PostDetailSkeleton({ isModal }: PostDetailSkeletonProps) {
  return (
    <>
      <Backdrop isModal={isModal} />
      <Wrapper isModal={isModal}>
        <Left>
          <ImageSkeleton />
          <Footer>
            <Profile>
              <ProfileImage />
              <ProfileInfo>
                <ProfileName />
                <ProfileDate />
              </ProfileInfo>
            </Profile>
          </Footer>
        </Left>
        <Right>
          <Header>
            <DateSkeleton />
          </Header>
          <Content>
            <LineSkeleton />
            <LineSkeleton />
            <ShortLineSkeleton />
          </Content>
          <InteractionBar>
            <IconSkeleton />
            <IconSkeleton />
            <IconSkeleton />
          </InteractionBar>
        </Right>
      </Wrapper>
    </>
  );
}
