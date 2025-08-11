'use client'

import styled from "@emotion/styled";
import ExploreFilter from '@/components/ui/explore/ExploreFilter';
import ExplorePostList from '@/components/ui/explore/ExplorePostList';
import { mq } from "@/styles/media";
import { useState } from "react";

export default function ExplorePage() {
  const [filter, setFilter] = useState<FilterState>({
    region: '',
    station: '',
    school: '',
    price: 600000,
    period: 12,
  });

  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [periodFilterActive, setPeriodFilterActive] = useState(false);

  const handleFilterChange = (
    newFilter: FilterState,
    priceActive: boolean,
    periodActive: boolean
  ) => {
    setFilter(newFilter);
    setPriceFilterActive(priceActive);
    setPeriodFilterActive(periodActive);
  };

  return (
    <Container>
      <ExploreFilter onFilterChange={handleFilterChange} />
      <ExplorePostList
        filter={filter}
        priceFilterActive={priceFilterActive}
        periodFilterActive={periodFilterActive}
      />
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
    max-height: 100vh;
    width: 100%;
    overflow-y: auto;
  }
`