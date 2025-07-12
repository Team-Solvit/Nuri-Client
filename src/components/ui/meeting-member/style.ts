import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";

export const MeetingMemberContainer = styled.div`
  width: calc(100% - 10rem);
  margin: 4.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

export const Member = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  gap: 1rem;
  cursor: pointer;
  width: 100%;
`
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
  gap: 0.5rem;
  width: 75%;
  position: relative;
`
export const Name = styled.p`
  font-size: ${fontSizes.Body};
`
export const Count = styled.p`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
`
export const Leave = styled.div`
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