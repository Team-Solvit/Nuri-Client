import styled from '@emotion/styled';
import { colors, radius, fontSizes } from '@/styles/theme';

export const Container = styled.div<{ $status?: boolean; $width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.$status ? colors.primary : colors.background};
  color: ${(props) =>
    props.$status ? colors.background : colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: ${radius.md};
  padding: 8px 16px;
  width: ${(props) => props.$width || 'auto'};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
    props.$status ? "#ed475b" : colors.primary};
    color: ${(props) =>
    props.$status ? colors.background : colors.background};
  }
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 600;
`;