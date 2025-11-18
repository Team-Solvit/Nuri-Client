'use client';

import PostDetail from "@/components/ui/post/detail";
import styled from '@emotion/styled';
import { mq } from "@/styles/media";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  ${mq.mobile} {
    min-height: 100vh;
    padding: 0;
  }
`;

interface PostDetailPageProps {
  postId: string;
}

export default function PostDetailPage({ postId }: PostDetailPageProps) {
  return (
    <Wrapper>
      <PostDetail id={postId} />
    </Wrapper>
  );
}
