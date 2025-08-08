import styled from "@emotion/styled";
import {zIndex, radius, fontSizes} from "@/styles/theme";
import {keyframes, css} from '@emotion/react';
import {mq} from "@/styles/media";

interface Status {
	success: boolean;
}

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
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

export const shrink = keyframes`
  from {
    width: 20rem;
  }
  to {
    width: 0;
  }
`;
const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translate(0);
  }
  100% {
    opacity: 0;
    transform: translate(20px);
  }
`;
const fadeOutDownMobile = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
`;
export const Alert = styled.div<{ isLeaving: boolean }>`
  position: fixed;
  width: 21rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 1.25rem 0;
  top: 3rem;
  right: 3rem;
  z-index: ${zIndex.modal};
  background-color: white;
  border-radius: ${radius.md};
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
  gap: 0.5rem;
  position: relative;
  align-items: center;
`
export const Close = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  cursor: pointer;
  width: 1rem;
  height: 1rem;

  & > img {
    width: 100%;
    height: 100%;
  }
`
export const Gauge = styled.div<Status>`
  height: 4px;
  background-color: ${(props) => props.success ? "#71DAAA" : "#E74B3C"};;
  border-radius: 2px;
  animation: ${shrink} 5s linear forwards;
  position: absolute;
  bottom: -1.25rem;
  left: 0;
`;
export const Emotion = styled.div`
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 2.5rem;
  }
`
export const GageBox = styled.div`
  position: relative;

`
export const TextBox = styled.div<Status>`
  padding: 0 1.2rem;
  border-left: 0.05rem solid ${(props) => props.success ? "#71DAAA" : "#FFEDEF"};
  width: 70%;

  & > h3 {
    font-size: ${fontSizes.Body};
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${(props) => props.success ? "#71DAAA" : "#E74B3C"};
  }

  & > p {
    font-size: ${fontSizes.Caption};
    font-weight: 400;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
  }
`