import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MeetingMemberContainer = styled.div`
  width: calc(100% - 10rem);
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  ${mq.mobile} {
    width: calc(100% - 2rem);
    grid-template-columns: 1fr;
    margin-bottom: 4rem;
  }
`


export const Member = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border: 1px solid ${colors.line};
  background-color: #fff;
  border-radius: ${radius.md};
  gap: 1rem;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const ImgBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
`
export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 75%;
  position: relative;
`
export const Name = styled.p`
  font-size: ${fontSizes.Body};
`
export const Leave = styled.button`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;

  & > div {
    padding: 8px;
  }

  & > div > span {
    font-size: ${fontSizes.Caption};
  }
`

export const Role = styled.span`
  display: inline-block;
  background: #e6f3ff;
  color: ${colors.primary};
  font-size: ${fontSizes.Caption};
  padding: 2px 8px;
  border-radius: ${radius.sm};
  margin-top: 2px;
`
