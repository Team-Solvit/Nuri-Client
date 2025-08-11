import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 22rem;
  min-width: 16rem;
  box-sizing: border-box;
  padding: 1.5rem;
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
  gap: 1rem;
  margin-bottom: 0.5rem;

  ${mq.mobile} {
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }
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

  ${mq.mobile} {
    gap: 0.4rem;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.mobile} {
    width: 2.2rem;
    height: 2.2rem;
    font-size: 11px;
  }
`;