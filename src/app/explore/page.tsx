'use client'

import styled from "@emotion/styled";
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
    setSearchFilter(prev => ({ ...prev, name: keyword, start: 0 }));
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

      {activeTab === 'room' ? (
        <>
          <ExploreFilter
            onFilterChange={handleFilterChange}
            onSearchKeywordChange={handleSearchKeywordChange}
            searchKeyword={searchKeyword}
          />
          <ExplorePostList searchFilter={searchFilter} />
        </>
      ) : (
        <UserSearch />
      )}
    </Container>
  );
}


const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3;
    padding: 5% 6% 0% 6%;
    flex-direction: column;
    gap: 40px;

    ${mq.mobile} {
      gap: 0;
    }
`

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid ${colors.line};
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  font-size: ${fontSizes.H4};
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
    padding: 0.75rem 1.5rem;
    font-size: ${fontSizes.Body};
  }
`;