'use client'

import styled from "@emotion/styled";
import ExploreFilter from '@/components/ui/explore/ExploreFilter';
import ExplorePostList from '@/components/ui/explore/ExplorePostList';
import { mq } from "@/styles/media";
import { useState } from 'react';

interface FilterState {
  school: string | null;
  region: string | null;
  station: string | null;
  priceRange: { min: number; max: number } | null;
  periodRange: { min: number; max: number } | null;
}

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    school: null,
    region: null,
    station: null,
    priceRange: null,
    periodRange: null,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <Container>
        <ExploreFilter onFilterChange={handleFilterChange} />
        <ExplorePostList filters={filters} />
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