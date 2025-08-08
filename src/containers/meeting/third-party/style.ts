import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const HeaderLeft = styled.div`

  display: flex;
  flex-direction: column;
  gap: 5px;
  
  h1 {
    font-size: 24px;
    margin: 0;
  }
  p {
    font-size: 16px;
    color: #666;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 10px;

  button {
    width: max-content;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;