import styled from "@emotion/styled";
import {css, keyframes} from "@emotion/react";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

const fadeIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const fadeInMobile = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const SidebarContainer = styled.section<{ isOpen: boolean }>`
  display: flex;
  z-index: ${zIndex.dropdown};
  position: fixed;
  left: 17vw;
  top: 0;
  flex-direction: column;
  height: 100vh;
  width: 28%;
  animation: ${({isOpen}) =>
    isOpen
      ? css`${fadeIn} 0.3s ease-out`
      : 'none'};
  background-color: ${colors.line2};

  ${mq.mobile} {
    width: 100%;
    height: 40vh;
    left: 0;
    top: auto;
    bottom: 8vh;
    animation: ${({isOpen}) =>
      isOpen
        ? css`${fadeInMobile} 0.3s ease-out`
        : 'none'};
  }
`

export const Head = styled.article`
  padding: 2rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.background};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);

  & > p {
    font-size: ${fontSizes.H4};
    font-weight: 500;
  }
`

export const Content = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  overflow-y: scroll;
  border: 1px solid ${colors.line2};
`
export const Meeting = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5em;
  align-items: center;
  cursor: pointer;
  background-color: ${colors.background};
  border-radius: ${radius.md};
  padding: 1em;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);

`

export const ImgBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: ${radius.md};
  position: relative;
  overflow: hidden;
	& > img{
		object-fit: cover;
	}
`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 70%;
`

export const Sub = styled.div`
  color: ${colors.gray};
  font-size: ${fontSizes.Caption};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h3`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`

export const Desc = styled.p`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
`