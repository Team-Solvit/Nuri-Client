'use client';
import { use } from "react";
import PostDetail from "@/components/ui/post/detail";

type Props = {
  params: Promise<{ id: string }>;
}

export default function FullPostPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Wrapper>
      <PostDetail id={id} />
    </Wrapper>
  );
}

import styled from '@emotion/styled';
import { mq } from "@/styles/media";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq.mobile} {
    height: 100vh;
  }
`;