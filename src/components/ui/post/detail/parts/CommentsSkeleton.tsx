"use client";

import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors, radius } from "@/styles/theme";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    ${colors.line} 0%,
    ${colors.line2} 20%,
    ${colors.line} 40%,
    ${colors.line} 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${radius.md};
`;

const CommentSkeletonItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
`;

const SkeletonAvatar = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: ${radius.full};
  flex-shrink: 0;
`;

const SkeletonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonAuthor = styled(SkeletonBase)`
  width: 80px;
  height: 14px;
  border-radius: ${radius.sm};
`;

const SkeletonText = styled(SkeletonBase)`
  width: 100%;
  height: 16px;
  border-radius: ${radius.sm};
`;

const SkeletonTextShort = styled(SkeletonBase)`
  width: 60%;
  height: 16px;
  border-radius: ${radius.sm};
`;

interface CommentsSkeletonProps {
  count?: number;
}

export default function CommentsSkeleton({ count = 3 }: CommentsSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CommentSkeletonItem key={index}>
          <SkeletonAvatar />
          <SkeletonContent>
            <SkeletonAuthor />
            <SkeletonText />
            {index % 2 === 0 && <SkeletonTextShort />}
          </SkeletonContent>
        </CommentSkeletonItem>
      ))}
    </>
  );
}
