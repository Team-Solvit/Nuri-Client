'use client'

import styled from "@emotion/styled";
import ExploreFilter from '@/components/ui/explore/ExploreFilter';
import ExplorePostList from '@/components/ui/explore/ExplorePostList';

export default function ExplorePage() {
  return (
    <Container>
        <ExploreFilter />
        <ExplorePostList />
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
`