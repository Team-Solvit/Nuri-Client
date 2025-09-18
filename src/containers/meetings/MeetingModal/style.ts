import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";
import {mq} from "@/styles/media";
import {bool} from "sharp";

export const ModalContainer = styled.div`
  width: 60vw;
  height: 80vh;
  border-radius: ${radius.md};
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

  ${mq.mobile} {
    width: 90vw;
    height: 80vh;
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
	& > img{
		object-fit: cover;
	}
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

  ${mq.mobile} {
    padding: 2rem 1rem;
  }
`
export const SignBtnBox = styled.div`
  ${mq.mobile} {
    position: absolute;
    right: 0;
    top: -5rem;
  }
`

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq.mobile} {
    position: relative;
  }
`
export const Info = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  width: 80%;

  ${mq.mobile} {
    width: 100%;
  }

`
export const ImgBox = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: ${radius.md};
  position: relative;
  overflow: hidden;
& > img{
	object-fit: cover;
}
  ${mq.mobile} {
    width: 4rem;
    height: 4rem;
  }
`
export const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > h3 {
    font-size: ${fontSizes.H2};
    font-weight: 600
  }

  ${mq.mobile} {
    max-width: 60%;

    & > h3 {
      font-size: ${fontSizes.H3};
    }
  }

  & > p {
    font-size: ${fontSizes.Body};
    color: ${colors.gray};
  }
`
export const Description = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  line-height: 140%;
`
export const Nav = styled.div<{ isSelected: number }>`
  display: flex;
  width: calc(100% - 10rem);
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
  font-size: ${fontSizes.Body};
  font-weight: 550;
  position: relative;

  ${mq.mobile} {
    justify-content: space-between;
    width: calc(100% - 2rem);
  }

  & > div:nth-of-type(1) {
    left: 0;
  }

  & > div:nth-of-type(3) {
    right: 0;
  }

  & > div {
    transition: all 0.1s ease-in-out;
    color: ${colors.gray};
    border-top: 2px solid ${colors.line};
  }

  & > div:nth-of-type(${(props) => props.isSelected}) {
    border-top: 2px solid ${colors.primary};
    color: ${colors.primary};
  }
`
export const PBox = styled.div<{isModal : boolean}>`
  padding: 1.5rem 5rem;
  width: ${(props) => props.isModal ? '50%' : '33.3%'};
  text-align: center;

  ${mq.mobile} {
    padding: 1.25rem 0;
  }

  & > p {
    font-weight: 500;
    cursor: pointer;
  }
`