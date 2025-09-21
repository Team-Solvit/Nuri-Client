import styled from "@emotion/styled";
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
  padding: 2.5rem 2.5rem;
  ${mq.mobile} {
    padding: 1.25rem 1rem;
    gap: 1.75rem;
    margin: 0 auto;
    overflow-y: auto;
    box-sizing: border-box;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  ${mq.mobile} {
    gap: 0.6rem;
    flex-direction: row;
  }
  
  h1 {
    margin: 0;
    flex: 1;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  width: 100%;
  max-width: 480px;
  ${mq.mobile} {
    gap: 1.1rem;
    max-width: 100%;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  ${mq.mobile} {
    gap: 0.15rem;
  }
`;

export const FieldLabel = styled.label`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.15rem;
  line-height: 1.3;
  ${mq.mobile} {
    font-size: 0.85rem;
    margin-bottom: 0.1rem;
  }
`;

export const FieldInputBox = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #e3e3e3;
  background: #fafbfc;
  display: flex;
  align-items: center;
  transition: border 0.2s, background 0.2s;
  &:focus-within {
    border: 1.5px solid ${colors.primary};
    background: #fff;
  }
  ${mq.mobile} {
    padding: 0.45rem 0.75rem;
  }
`;

export const FieldInput = styled.input`
  width: 100%;
  height: 2.1rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  padding: 0;
  font-weight: 400;
  letter-spacing: 0.01em;
  ${mq.mobile} {
    height: 1.9rem;
    font-size: 0.9rem;
  }
`;

export const TimePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  min-width: 240px;
  ${mq.mobile} {
    min-width: 100%;
    width: 100%;
    gap: 0.85rem;
  }
`;

export const AmPmRow = styled.div`
  display: flex;
  gap: 1.5rem;
  ${mq.mobile} {
    gap: 0.5rem;
  }
`;

export const AmPmBtn = styled.button<{ active: boolean }>`
  width: 70px;
  height: 32px;
  border-radius: 0.5rem;
  background: ${({ active }) => active ? 'rgba(255,76,97,0.13)' : '#f3f3f3'};
  color: #222;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${({ active }) => active ? colors.primary : '#e3e3e3'};
  transition: background 0.2s, border 0.2s;
  cursor: pointer;
  ${mq.mobile} {
    width: 56px;
    height: 30px;
    font-size: 0.8rem;
  }
`;

export const TimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  ${mq.mobile} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.55rem 0.55rem;
    max-width: 100%;
  }
`;

export const TimeCell = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ active }) => active ? colors.primary : '#f3f3f3'};
  color: ${({ active }) => active ? '#fff' : '#222'};
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${({ active }) => active ? colors.primary : '#e3e3e3'};
  transition: background 0.2s, border 0.2s;
  cursor: pointer;
  ${mq.mobile} {
    width: 30px;
    height: 30px;
    font-size: 0.75rem;
  }
`;

export const RecordSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  ${mq.mobile} {
    gap: 0.6rem;
  }
`;

export const RecordHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  ${mq.mobile} {
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }
`;

export const RecordTitle = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 600;
  color: ${colors.text};
  line-height: 1.2;
  ${mq.mobile} {
    font-size: 1.15rem;
    line-height: 1.25;
    word-break: keep-all;
  }
`;

export const RecordBox = styled.div`
  position: relative;
  background: #fff;
  border: 1px solid ${colors.line};
  border-radius: 1rem;
  height: 166px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
  gap: 3.5rem;
  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 1rem 1.25rem;
    height: auto;
    gap: 1rem;
  }
`;

export const RecordMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.5rem;
  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    width: 100%;
  }
`;

export const RecordTitleText = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  color: #000;
  max-width: 40vw;
  overflow: hidden;
  ${mq.mobile} {
    max-width: 100%;
    font-size: 0.95rem;
    line-height: 1.25;
  }
`;

export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  ${mq.mobile} {
    gap: 0.4rem;
  }
`;

export const RecordInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${mq.mobile} {
    gap: 0.35rem;
  }
`;

export const RecordInfoIcon = styled.img`
  width: 22px;
  height: 22px;
  ${mq.mobile} {
    width: 18px;
    height: 18px;
  }
`;

export const RecordInfoText = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  ${mq.mobile} {
    font-size: 0.8rem;
    line-height: 1.2;
  }
`;

export const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3rem;
  ${mq.mobile} {
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

export const DateInput = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
  background: #fafbfc;
  color: #222;
  outline: none;
  transition: border 0.2s;
  height: 40px;
  box-sizing: border-box;
  &:focus {
    border: 1.5px solid #4b8fff;
    background: #fff;
  }
`;