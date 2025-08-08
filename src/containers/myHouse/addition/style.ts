import styled from '@emotion/styled';
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import {mq} from "@/styles/media";

export const Container = styled.div`
  background: ${colors.background};
  padding: 3rem 2rem;
  width: 100%;
  max-width: 56.25rem;
  height: 100vh;
  overflow-y: auto;
  margin: 0 auto;
  position: relative;
  border: none;
  outline: none;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: ${fontSizes.H2};
  color: ${colors.text};
  margin-bottom: 2rem;

  ${mq.mobile} {
    font-size: ${fontSizes.H3};
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;

  & > p {
    color: ${colors.primary};
    padding: 0.5rem 0.25rem;
  }

  ${mq.mobile} {
    &:last-of-type {
      margin-bottom: 6rem;
    }
  }
`;

export const SectionRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  ${mq.mobile} {
    flex-direction: column;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: ${fontSizes.H3};
  color: ${colors.text};
  margin-bottom: 0.75rem;
  display: block;

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
  }
}
`;

export const PhotoUploadBox = styled.div`
  width: 6rem;
  height: 6rem;
  background: ${colors.line};
  border-radius: ${radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PhotoAddGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PhotoAddIcon = styled.div`
  font-size: ${fontSizes.H2};
  margin-bottom: 0.25rem;
`;

export const PhotoAddText = styled.span`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray};
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  margin-bottom: 0.5rem;
  outline: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 6.25rem;
  padding: 0.75rem;
  border: 1px solid ${colors.gray};
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  resize: vertical;
  outline: none;
`;

export const InputWithAddonRow = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mq.mobile} {
    width: 100%;
    margin-bottom: 2rem;
  }

  .input-row {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid ${colors.gray};
    border-radius: ${radius.md};
    background: #fff;
    padding: 0.8rem;
    margin-top: 0.25rem;
  }

  input {
    border: none;
    outline: none;
    font-size: ${fontSizes.Body};
    flex: 1;
    background: transparent;
  }

  .addon {
    color: ${colors.gray};
    font-size: ${fontSizes.Body};
    margin: 0 0.25rem;
    white-space: nowrap;
  }
`;

export const ContractPeriodWrap = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;

  & > div {
    width: max-content;
    padding: 0.5rem 1rem;
  }
`;


export const ContractPeriodRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  ${mq.mobile} {
    flex-wrap: wrap;
    justify-content: space-between;

    & > div:nth-of-type(3) {
      width: max-content;
      padding: 0.5rem 1rem;
      margin-left: auto;
    }
  }
`;

export const ContractInputWrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.gray};
  border-radius: ${radius.md};
  background: #fff;
  padding: 0.8rem;
  width: 47%;

  input {
    border: none;
    outline: none;
    font-size: ${fontSizes.Body};
    background: transparent;
    width: 100%;
    flex: 1;
  }

  .addon {
    color: ${colors.gray};
    font-size: ${fontSizes.Body};
    margin-left: 0.5rem;
    white-space: nowrap;
  }
`;

export const FacilityWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-top: 0.75rem;
`;

export const FacilityCategory = styled.div`
  width: 100%;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  font-weight: 600;
  margin-top: 1rem;

  ${mq.mobile} {
    font-weight: 500;
  }
`;

export const FacilityCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: ${colors.primary};
    border-radius: ${radius.sm};
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
  }
`;

export const PhotoUploadList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const PhotoThumb = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: ${radius.lg};
  overflow: hidden;
  background: ${colors.line};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const FixedFooter = styled.div`
  position: sticky;
  bottom: -3rem;
  width: 100%;
  background: #fff;
  z-index: ${zIndex.overlay};
  padding: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  ${mq.mobile} {
    position: fixed;
    bottom: 4rem;
    left: 0;
    background: none;
    padding: 1rem 2rem;
  }
`;


export const CancelBtn = styled.div<{ $width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${colors.line};
  color: ${colors.gray};
  border-radius: ${radius.md};
  padding: 8px 16px;
  width: ${(props) => props.$width || 'auto'};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d6d6d6;
  }
`;

export const Name = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`;