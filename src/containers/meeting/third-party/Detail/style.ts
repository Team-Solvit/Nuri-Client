import styled from "@emotion/styled";
import { colors, fontSizes } from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
  padding: 2.5rem 2.5rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  width: 100%;
  max-width: 480px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.15rem;
`;

export const FieldInputBox = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #e3e3e3;
  background: #fafbfc;
  display: flex;
  align-items: center;
  transition: border 0.2s;
  &:focus-within {
    border: 1.5px solid ${colors.primary};
    background: #fff;
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
`;

export const TimePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  min-width: 240px;
`;

export const AmPmRow = styled.div`
  display: flex;
  gap: 1.5rem;
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
`;

export const TimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
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
`;

export const RecordSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const RecordHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const RecordTitle = styled.h2`
  font-size: ${fontSizes.Display};
  font-weight: 600;
  color: ${colors.text};
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
`;

export const RecordMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.5rem;
`;

export const RecordTitleText = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  color: #000;
  max-width: 40vw;
  overflow: hidden;
`;

export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RecordInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RecordInfoIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const RecordInfoText = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
`;