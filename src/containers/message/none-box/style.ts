import styled from "@emotion/styled";
import {colors, fontSizes} from "@/styles/theme";

export const NoneBoxContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  & > p {
    color: ${colors.gray};
    text-align: center;
    font-size: ${fontSizes.H3};
    font-weight: 500;
    line-height: 100%;
  }
`