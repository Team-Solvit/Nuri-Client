import styled from '@emotion/styled';
import { colors, radius, fontSizes } from '@/styles/theme';

export const Container = styled.div<{ $status?: boolean; $width?: string; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => props.$disabled ? 'not-allowed' : 'pointer'};
  background-color: ${(props) =>
    props.$disabled ? '#ccc' : props.$status ? colors.primary : colors.background};
  color: ${(props) =>
    props.$disabled ? '#666' : props.$status ? colors.background : colors.primary};
  border: 1px solid ${(props) => props.$disabled ? '#ccc' : colors.primary};
  border-radius: ${radius.md};
  padding: 8px 16px;
  width: ${(props) => props.$width || 'auto'};
  transition: background-color 0.2s ease-in-out;
  opacity: ${(props) => props.$disabled ? 0.6 : 1};

  &:hover {
    background-color: ${(props) =>
    props.$disabled ? '#ccc' : props.$status ? "#ed475b" : colors.primary};
    color: ${(props) =>
    props.$disabled ? '#666' : props.$status ? colors.background : colors.background};
  }
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  white-space: nowrap;
`;