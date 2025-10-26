import styled from "@emotion/styled";
import { mq } from "@/styles/media";

export const Post = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1.1;
  cursor: pointer;

  ${mq.mobile} {
    aspect-ratio: 1 / 0;
  }
`
export const PostImg = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s ease-in-out;
  }
`