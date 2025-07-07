import styled from "@emotion/styled";
import { colors, radius, fontSizes } from '@/styles/theme';

export const Container = styled.div<{ $status?: 1 | 2 | 3 }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$status === 2 ? 'default' : 'pointer')};

  background-color: ${(props) =>
    props.$status === 1 ? colors.background :
      props.$status === 2 ? '#FFF6F7' :
        colors.primary};

  color: ${(props) =>
    props.$status === 1 ? colors.primary :
      props.$status === 2 ? colors.primary :
        colors.background};

  border: 1px solid ${colors.primary};
  border-radius: ${radius.lg2};
  padding: 8px 0;
  width: 6.6vw;

  ${(props) =>
    props.$status === 1 &&
    `
      &:hover {
        background-color: ${colors.primary};
        color: ${colors.background};
      }
    `
  }
`

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 600;
`
