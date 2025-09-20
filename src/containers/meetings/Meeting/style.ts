import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";
import {mq} from "@/styles/media";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
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

  ${mq.mobile} {
    padding: 2rem 1rem;
  }
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

  & > p {
    font-size: ${fontSizes.Body};
    color: ${colors.gray};
  }

  ${mq.mobile} {
    & > h3 {
      font-size: ${fontSizes.H3};
    }
  }
`
export const Description = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  margin-bottom: 1rem;
  line-height: 140%;

  ${mq.mobile} {
    margin: 0;
  }
`
export const BtnBox = styled.div`
  position: fixed;
  bottom: 4%;

  ${mq.mobile} {
    bottom: 10%;
  }
`
export const BackBtnBox = styled.div`
  position: absolute;
  top: 50%;
  right: 9%;
  z-index: 1;

  ${mq.mobile} {
    right: 15%;
  }
`