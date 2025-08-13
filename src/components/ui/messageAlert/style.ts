import styled from "@emotion/styled";
import {radius, fontSizes} from "@/styles/theme";
import {keyframes, css} from '@emotion/react';
import {mq} from "@/styles/media";


const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0);
  }
`;

const fadeInUpMobile = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 20px));
  }
`;

const fadeOutDownMobile = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 20px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 40px);
  }
`;
export const Alert = styled.div<{ isLeaving: boolean }>`
  position: fixed;
  cursor: pointer;
  max-width: 50%;
  background-color: #393939;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 0.8rem 0;
  top: 10%;
  left: 50%;
  border-radius: ${radius.full};
  transform: translate(-50%, -50%);
  z-index: 1001;
  animation: ${({isLeaving}) =>
    isLeaving
      ? css`${fadeOutDown} 0.5s ease forwards`
      : css`${fadeInUp} 0.5s ease forwards`};

  ${mq.mobile} {
    top: 4%;
    left: 50%;
    right: auto;
    transform: translate(-50%, 20px);
    animation: ${({isLeaving}) =>
      isLeaving
        ? css`${fadeOutDownMobile} 0.5s ease forwards`
        : css`${fadeInUpMobile} 0.5s ease forwards`};
  }
`;
export const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  position: relative;
  align-items: center;
`
export const ImgBox = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  background: white;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
`
export const Name = styled.p`
  font-weight: 600;
`

export const Message = styled.p`

`
export const TextBox = styled.div`
  padding: 0 1.2rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  color: white;

  & > p {
    font-size: ${fontSizes.Caption};
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
  }
`