import styled from "@emotion/styled";
import {fontSizes, colors, radius} from "@/styles/theme";
import {mq} from "@/styles/media";

export const Container = styled.section`
  width: 30vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${mq.mobile} {
    width: 80vw;
  }
`

export const Title = styled.h3`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};

  & > span {
    color: ${colors.primary};
  }
`
export const Text = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`
export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
`

export const CancelBtn = styled.div<{ $width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${colors.line};
  color: ${colors.gray};
  border-radius: ${radius.md};
  padding: 8px 16px;
  width: ${(props) => props.$width || 'auto'};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d6d6d6;
  }
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 600;
`;
export const Black = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(116, 116, 116, 0.5);
  z-index: 10000;
`
export const Content = styled.div`
  background-color: white;
  position: relative;
  border-radius: ${radius.md};
`