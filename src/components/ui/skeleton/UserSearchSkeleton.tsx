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

export default function UserSearchSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Container>
      <UserList>
        {Array.from({ length: count }).map((_, index) => (
          <UserCard key={index}>
            <AvatarSkeleton />
            <UserInfo>
              <NameSkeleton />
              <IdSkeleton />
            </UserInfo>
          </UserCard>
        ))}
      </UserList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const UserList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  ${mq.mobile} {
    grid-template-columns: 1fr;
  }
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${colors.background};
  border: 1px solid ${colors.line};
  border-radius: ${radius.lg};
  
  ${mq.mobile} {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const AvatarSkeleton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${radius.full};
  background: linear-gradient(
    90deg,
    ${colors.line} 0px,
    #f0f0f0 40px,
    ${colors.line} 80px
  );
  background-size: 600px;
  animation: ${shimmer} 1.5s infinite linear;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 50px;
    height: 50px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  overflow: hidden;
`;

const NameSkeleton = styled.div`
  height: 20px;
  width: 120px;
  border-radius: ${radius.sm};
  background: linear-gradient(
    90deg,
    ${colors.line} 0px,
    #f0f0f0 40px,
    ${colors.line} 80px
  );
  background-size: 600px;
  animation: ${shimmer} 1.5s infinite linear;

  ${mq.mobile} {
    height: 18px;
    width: 100px;
  }
`;

const IdSkeleton = styled.div`
  height: 16px;
  width: 80px;
  border-radius: ${radius.sm};
  background: linear-gradient(
    90deg,
    ${colors.line} 0px,
    #f0f0f0 40px,
    ${colors.line} 80px
  );
  background-size: 600px;
  animation: ${shimmer} 1.5s infinite linear;

  ${mq.mobile} {
    height: 14px;
    width: 60px;
  }
`;
