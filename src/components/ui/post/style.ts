import styled from "@emotion/styled";

export const Post = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1.1;
`
export const PostImg = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
`