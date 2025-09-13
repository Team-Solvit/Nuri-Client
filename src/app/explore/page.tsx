'use client'

import styled from "@emotion/styled";
import ExploreFilter from '@/components/ui/explore/ExploreFilter';
import ExplorePostList from '@/components/ui/explore/ExplorePostList';
import { mq } from "@/styles/media";
import { useState } from 'react';
import { BoardingRoomSearchFilter } from '@/types/explore';

export default function ExplorePage() {
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
      <ExploreFilter 
        onFilterChange={handleFilterChange}
        onSearchKeywordChange={handleSearchKeywordChange}
        searchKeyword={searchKeyword}
      />
      <ExplorePostList searchFilter={searchFilter} />
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