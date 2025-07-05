import styled from "@emotion/styled";

export const Container = styled.div<{ $status?: boolean; $width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => props.$status ? '#FF4C61' : '#FFFFFF'};
  color: ${(props) => props.$status ? '#FFFFFF' : '#FF4C61'};
  border: 1px solid #FF4C61;
  border-radius: 8px;
  padding: 8px 0px;
  width: ${(props) => props.$width || 'auto'};
`;

export const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;