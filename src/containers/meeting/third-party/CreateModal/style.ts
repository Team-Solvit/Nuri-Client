import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 22rem;
  min-width: 16rem;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  color: ${colors.text};
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const Label = styled.label`
  font-size: ${fontSizes.H4};
  color: ${colors.text};
`;

export const InputBox = styled.div`
  width: 100%;
  background: ${colors.background};
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  outline: none;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DateText = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`;

export const TimeRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TimeBtn = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? colors.primary : colors.line)};
  color: ${({ active }) => (active ? '#fff' : colors.text)};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  padding: 0.5rem 1.5rem;
  cursor: pointer;
`;

export const TimeGrid = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TimeCell = styled.button<{ active?: boolean }>`
  width: 2rem;
  height: 2rem;
  background: ${({ active }) => (active ? colors.primary : colors.line)};
  color: ${({ active }) => (active ? '#fff' : colors.text)};
  border: none;
  border-radius: 50%;
  font-size: ${fontSizes.Small};
  cursor: pointer;
`;

export const DoneBtn = styled.button`
  background: ${colors.primary};
  color: #fff;
  font-size: ${fontSizes.H4};
  border-radius: ${radius.md};
  width: 100%;
  height: 2.5rem;
  margin-top: 1.5rem;
  border: none;
`;
