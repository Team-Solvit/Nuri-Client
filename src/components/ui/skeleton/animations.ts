import { keyframes } from '@emotion/react';
import styled from "@emotion/styled";

export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 2s ease-in-out infinite;
  border-radius: 4px;
`;