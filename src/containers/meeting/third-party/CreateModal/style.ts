import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 50rem;
  min-width: 16rem;
  box-sizing: border-box;
  padding: 2rem;

  ${mq.mobile} {
    max-width: 22rem;
    padding: 1.5rem;
  }
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  color: ${colors.text};
  margin-bottom: 2rem;

  ${mq.mobile} {
    font-size: ${fontSizes.H3};
    margin-bottom: 1.25rem;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  ${mq.mobile} {
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const TimeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const TimeLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TimeRightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-size: ${fontSizes.H4};
  color: ${colors.text};

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }
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

  ${mq.mobile} {
    padding: 0.65rem 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  outline: none;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${mq.mobile} {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const DateText = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.text};

  ${mq.mobile} {
    font-size: ${fontSizes.H3};
  }
`;

export const TimeRow = styled.div`
  display: flex;
  gap: 1rem;

  ${mq.mobile} {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const TimePreview = styled.div`
  padding: 0.75rem 1rem;
  background: ${colors.background};
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  text-align: center;
  margin: 1rem 0;

  strong {
    color: ${colors.primary};
    font-weight: 600;
    font-size: ${fontSizes.H4};
  }

  ${mq.mobile} {
    padding: 0.6rem 0.75rem;
    font-size: ${fontSizes.Small};
    
    strong {
      font-size: ${fontSizes.Body};
    }
  }
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
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;

  ${mq.mobile} {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.4rem;
  }
`;

export const TimeCell = styled.button<{ active?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ active }) => (active ? colors.primary : colors.background)};
  color: ${({ active }) => (active ? '#fff' : colors.text)};
  border: 1px solid ${({ active }) => (active ? colors.primary : colors.line)};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => (active ? colors.primary : colors.line)};
  }

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const DurationRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const DurationBtn = styled.button<{ active?: boolean }>`
  flex: 1;
  min-width: 4rem;
  background: ${({ active }) => (active ? colors.primary : colors.line)};
  color: ${({ active }) => (active ? '#fff' : colors.text)};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }

  ${mq.mobile} {
    min-width: 3.5rem;
    font-size: ${fontSizes.Small};
  }
`;

export const DurationUnit = styled.span`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  margin-left: 0.5rem;
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;