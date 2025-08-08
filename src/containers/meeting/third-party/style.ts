import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mq.mobile} {
    justify-content: flex-start;
    align-items: stretch;
    height: 100dvh;
    overflow-y: auto;
    gap: 24px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
    padding: 8px 4px 0;
  }
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

  ${mq.mobile} {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 10px;

  button {
    width: max-content;
  }

  ${mq.mobile} {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mq.mobile} {
    padding: 0 4px 8px;
    gap: 16px;
  }
`;