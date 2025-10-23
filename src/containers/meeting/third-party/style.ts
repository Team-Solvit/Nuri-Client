import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
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
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

    ${mq.mobile} {
    padding: 0 4px 8px;
    gap: 16px;
    overflow-y: visible;
    flex: none;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 60px 20px;
  text-align: center;

  ${mq.mobile} {
    padding: 40px 16px;
    gap: 20px;
  }
`;

export const EmptyStateText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #666;
    margin: 0;
  }

  ${mq.mobile} {
    h3 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #666;

  p {
    font-size: 16px;
    margin: 0;
  }

    }

  ${mq.mobile} {
    padding: 30px 16px;

    p {
      font-size: 14px;
    }
  }
`;

export const DeleteConfirmModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  min-width: 400px;

  ${mq.mobile} {
    min-width: 280px;
    padding: 24px;
    gap: 20px;
  }
`;

export const DeleteConfirmTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;

  ${mq.mobile} {
    font-size: 20px;
  }
`;

export const DeleteConfirmMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  text-align: center;
  line-height: 1.6;

  ${mq.mobile} {
    font-size: 14px;
  }
`;

export const DeleteConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 8px;

    button {
      width: 100% !important;
    }
  }
`;