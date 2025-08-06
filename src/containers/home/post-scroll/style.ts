import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {css} from "@emotion/react";
import {mq} from "@/styles/media";

export const PostScrollContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${mq.mobile} {
    gap: 0;

    & > article:first-child {
      margin-top: 6rem;
    }

    & > article {
      margin-top: 3rem;
    }
  }

  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 1rem 2rem 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`

export const Post = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 1rem;
  width: 100%;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
`
export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SliderTrack = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({index}) => `-${index * 100}%`});
`;

export const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PostTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem 0.5rem 1rem;
  justify-content: space-between;
`

export const PostImg = styled.div`
  width: 100%;
  height: 50vh;
  overflow: hidden;
  border-radius: ${radius.md};
  position: relative;
  cursor: default;

  ${mq.mobile} {
    height: 30vh;
  }
`
export const Info = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  & > p {
    font-size: ${fontSizes.H4};
  }
`
export const Thumbnail = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${radius.full};
  position: relative;
  overflow: hidden;
`

export const PostName = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 500;
  padding: 0 1rem;
`

export const Arrow = styled.div<{ status: boolean, isHover: boolean }>`
  position: absolute;
  top: 50%;
  ${({status}) =>
    status
      ? css`
        right: 5%;
      `
      : css`
        left: 5%;
      `}

  transform: ${({status}) =>
    status
      ? "translate(50%, -50%)"
      : "translate(-50%, -50%) rotateY(180deg)"};
  cursor: pointer;
  z-index: ${zIndex.modal};
  width: 1.8rem;
  height: 1.8rem;
  border-radius: ${radius.full};

  opacity: ${({isHover}) => (isHover ? 1 : 0)};
  pointer-events: ${({isHover}) => (isHover ? 'auto' : 'none')};

  ${mq.mobile} {
    opacity: 1;
    pointer-events: auto;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(240, 240, 240, 0.95);
  }
`

export const PostDesc = styled.p`
  font-size: ${fontSizes.Body};
  padding: 0 1rem;
  font-weight: 400;
`
export const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
  gap: 0.8rem;
`
export const User = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;

  & > p:nth-of-type(1) {
    font-size: ${fontSizes.H4};
  }

  & > p:nth-of-type(2) {
    font-size: ${fontSizes.Caption};
    color: ${colors.gray};
  }
`
export const Nav = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.gray};

  ${mq.mobile} {
    width: 30%;

    & > p {
      display: none;
    }
  }
`
export const Interactive = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: ${fontSizes.H4};
`

export const Inter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`