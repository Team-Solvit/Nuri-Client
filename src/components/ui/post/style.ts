import styled from "@emotion/styled";

export const Post = styled.div`
    width: 100%;
`
export const PostImg = styled.div`
  width: 24vw;
  height: 40vh;
  position: relative;
  overflow: hidden;

  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
  }
`