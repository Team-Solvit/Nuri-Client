import styled from "@emotion/styled";

export const Container = styled.div<{ $status?: 1 | 2 | 3;}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$status === 2 ? 'default' : 'pointer')};
  background-color: ${(props) =>
    props.$status === 1 ? '#FFFFFF' :
    props.$status === 2 ? '#FFF6F7' :
    '#FF4C61'};

  color: ${(props) =>
    props.$status === 1 ? '#FF4C61' :
    props.$status === 2 ? '#FF4C61' :
    '#FFFFFF'};
  border: 1px solid #FF4C61;
  border-radius: 18px;
  padding: 8px 0px;
  width: 6.6vw;
`;

export const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;