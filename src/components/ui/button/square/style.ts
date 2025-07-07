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
  padding: 8px 0;
  width: ${(props) => props.$width || 'auto'};
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 600;
`;