'use client';

import PostDetail from "@/components/ui/post/detail";

interface Props {
  params: { id: string };
}

export default function FullPostPage({ params }: Props) {
  const { id } = params;
  return (
    <Wrapper>
      <PostDetail id={id} />
    </Wrapper>
  );
}

import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;