'use client'

import styled from "@emotion/styled";
import Image from 'next/image';
import ExploreFilter from '@/components/ui/explore/ExploreFilter';
import ExplorePostList from '@/components/ui/explore/ExplorePostList';
import UserSearch from '@/components/ui/explore/UserSearch';
import { mq } from "@/styles/media";
import { useState } from 'react';
import { BoardingRoomSearchFilter } from '@/types/explore';
import { colors, fontSizes } from '@/styles/theme';

type SearchTab = 'room' | 'user';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<SearchTab>('room');
  const [searchFilter, setSearchFilter] = useState<BoardingRoomSearchFilter>({ start: 0 });
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleFilterChange = (newFilter: Partial<BoardingRoomSearchFilter>) => {
    setSearchFilter(prev => ({ ...prev, ...newFilter, start: 0 }));
  };

  const handleSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
    if (activeTab === 'room') {
      if (keyword.trim() === '') {
        const { name, ...restFilter } = searchFilter;
        setSearchFilter({ ...restFilter, start: 0 });
      } else {
        setSearchFilter(prev => ({ ...prev, name: keyword, start: 0 }));
      }
    }
  };

  return (
    <Container>
      <TabContainer>
        <Tab active={activeTab === 'room'} onClick={() => setActiveTab('room')}>
          방 검색
        </Tab>
        <Tab active={activeTab === 'user'} onClick={() => setActiveTab('user')}>
          유저 검색
        </Tab>
      </TabContainer>

      <SearchBox>
        <Image src='/icons/search.svg' alt="search" width={24} height={24} />
        <SearchInput
          type='text'
          placeholder={activeTab === 'room' ? '검색어를 입력하세요.' : '유저 아이디로 유저를 탐방해보세요.'}
          value={searchKeyword}
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
        />
      </SearchBox>

      {activeTab === 'room' ? (
        <>
          <ExploreFilter
            onFilterChange={handleFilterChange}
          />
          <ExplorePostList searchFilter={searchFilter} />
        </>
      ) : (
        <UserSearch
          searchKeyword={searchKeyword}
        />
      )}
    </Container>
  );
}


const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3;
    padding: 2rem 6% 0% 6%;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;

    ${mq.mobile} {
      gap: 1rem;
      padding: 1rem 6% 2rem 6%;
    }
`

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid ${colors.line};
  margin-bottom: 0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: ${fontSizes.Body};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  color: ${({ active }) => (active ? colors.primary : colors.gray)};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active }) => (active ? colors.primary : 'transparent')};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${colors.primary};
  }

  ${mq.mobile} {
    padding: 0.6rem 1rem;
    font-size: ${fontSizes.Small};
  }
`;

const SearchBox = styled.div`
  display: flex;
  width: 73vw;
  height: 8vh;
  border-radius: 30px;
  align-items: center;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;

  ${mq.mobile} {
    width: 88vw;
  }
`;

const SearchInput = styled.input`
  display: flex;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 18px;
  margin-top: 2px;
  margin-left: 10px;
  width: 100%;

  &::placeholder {
    color: ${colors.gray};
    font-family: 'SCoreDream', sans-serif;
  }
`;