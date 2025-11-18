'use client'

import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useApollo } from '@/lib/apolloClient';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';
import { useNavigationWithProgress } from '@/hooks/useNavigationWithProgress';
import { imageCheck } from '@/utils/imageCheck';
import { UserService } from '@/services/user';
import { UserSearchResult } from '@/types/user';
import { useAlertStore } from '@/store/alert';
import UserSearchSkeleton from '@/components/ui/skeleton/UserSearchSkeleton';

interface UserSearchProps {
  searchKeyword: string;
}

export default function UserSearch({ searchKeyword }: UserSearchProps) {
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const client = useApollo();
  const navigate = useNavigationWithProgress();
  const { error: showError } = useAlertStore();

  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const results = await UserService.searchUsers(client, keyword.trim());
      setUsers(results);
    } catch (error) {
      console.error('유저 검색 실패:', error);
      showError('유저 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [client, showError]);

  useEffect(() => {
    handleSearch(searchKeyword);
  }, [searchKeyword, handleSearch]);

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container>
      {loading ? (
        <UserSearchSkeleton count={5} />
      ) : users.length > 0 ? (
        <UserList>
          {users.map((user) => (
            <UserCard key={user.userId} onClick={() => handleUserClick(user.userId)}>
              <UserAvatar>
                {user.profile ? (
                  <Image
                    src={imageCheck(user.profile)}
                    alt={user.userId}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                ) : (
                  <AvatarFallback>
                    {user.name?.charAt(0) || user.userId?.charAt(0) || '?'}
                  </AvatarFallback>
                )}
              </UserAvatar>
              <UserInfo>
                <UserName>{user.name || user.userId}</UserName>
                <UserId>@{user.userId}</UserId>
              </UserInfo>
            </UserCard>
          ))}
        </UserList>
      ) : searchKeyword ? (
        <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
      ) : (
        <EmptyMessage>검색어를 입력하세요.</EmptyMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${colors.background};
  border: 2px solid ${colors.line};
  border-radius: ${radius.lg};
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${colors.primary};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${fontSizes.Body};
  background: transparent;

  &::placeholder {
    color: ${colors.gray};
  }
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
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const UserAvatar = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: ${radius.full};
  overflow: hidden;
  flex-shrink: 0;
  background: ${colors.line2};
`;

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.H3};
  font-weight: 700;
  color: ${colors.gray};
  background: ${colors.line2};
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
`;

const UserName = styled.div`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserId = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
  margin-top: 0.25rem;

  span {
    padding: 0.25rem 0.5rem;
    background: ${colors.line2};
    border-radius: ${radius.sm};
  }
`;

const UserIntroduce = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  margin-top: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
`;
