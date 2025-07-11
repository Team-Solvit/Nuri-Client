import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";

export const ModalContainer = styled.div`
  width: 60vw;
  height: 80vh;
  border-radius: ${radius.lg};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  /* 기본적으로 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

`
export const Banner = styled.div`
  width: calc(100% + 6rem);
  height: 10rem;
  background-color: #F8F8F8;
  position: absolute;
  top: -2rem;
  left: -3rem;
  overflow: hidden;
  border-radius: ${radius.md} ${radius.md} 0 0;
`
export const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(360deg, #FFF 3.98%, rgba(102, 102, 102, 0.00) 96.56%);

`

export const Content = styled.div`
  padding: 2rem 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 8rem;
`

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
export const Info = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  width: 80%;

`
export const ImgBox = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: ${radius.md};
  position: relative;
  overflow: hidden;
`
export const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > h3 {
    font-size: ${fontSizes.H2};
    font-weight: 600
  }

  & > p {
    font-size: ${fontSizes.Body};
    color: ${colors.gray};
  }
`
export const Description = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  margin-bottom: 1rem;
  line-height: 140%;
`
export const Nav = styled.div<{ isSelected: number }>`
  display: flex;
  width: calc(100% - 10rem);
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  gap: 0.5rem;
  border-top: 2px solid ${colors.line};
  font-weight: 550;
  position: relative;

  & > div:nth-of-type(1) {
    left: 0;
  }

  & > div:nth-of-type(${(props) => props.isSelected}) {
    border-top: 2px solid ${colors.primary};
    transition: all 0.1s ease-in-out;
    color: ${colors.primary};
  }

  & > div:nth-of-type(3) {
    right: 0;
  }
`
export const PBox = styled.div`
  position: absolute;
  top: -1px;
  padding: 1.5rem 5rem;
  width: 33.3%;
  text-align: center;

  & > p {
    cursor: pointer;
  }
`