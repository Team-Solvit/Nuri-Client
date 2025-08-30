import { fontSizes } from '@/styles/theme';
import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  width: 50vw; 
  margin: 0 auto;
  padding: 24px;

  ${mq.mobile} {
    width: 100%;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    height: 3px;
    background: #D9D9D9;
    border-radius: 2px;
    z-index: 1;
  }
`;

export const ProgressLine = styled.div<{ progress: number }>`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 3px;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  border-radius: 2px;
  z-index: 2;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ progress }) => (progress / 4) * (100 - 40)}%;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  position: relative;
`;

export const StepCircle = styled.div<{ completed: boolean; current: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  ${({ completed, current }) => {
    if (completed) {
      return `
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        transform: scale(1.1);
      `;
    } else if (current) {
      return `
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        transform: scale(1.1);
      `;
    } else {
      return `
        background: rgba(255, 255, 255, 0.9);
        color: #6b7280;
        backdrop-filter: blur(10px);
      `;
    }
  }}
`;

export const StepLabel = styled.span<{ completed: boolean; current: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ current, completed }) => current || completed ? colors.success : colors.gray};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 1.2;
`;

export const EditButton = styled.button`
color: #7F96FF;
font-size: 10px;
font-weight: 500;
cursor: pointer;
margin-top: 4px;
padding: 2px 8px;
border-radius: 12px;
backdrop-filter: blur(10px);
border: none;
background: none;
transition: all 0.2s ease;
  &:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}
`;

export const Content = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  ${mq.mobile} {
    padding: 8px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 28px;
`;

export const SectionBox = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 0.52rem;
  background: rgba(255, 157, 157, 0.1);
  color: ${colors.primary};
  border: 0.5px solid ${colors.primary};
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
display: block;
font-weight: 600;
color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
    &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
    &::placeholder {
    color: #9ca3af;
  }
`;

export const InputButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  padding: 16px 40px 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  appearance: none;

  &:focus {
    border: none;
    outline: 2px solid #FF4C61;
  }
`;

export const CheckboxGroup = styled.div`
  padding: 20px 0;
  margin-bottom: 16px;
  transition: all 0.2s ease;
    &:hover {
    border-color: #d1d5db;
  }
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 12px;
    &:last-child {
    margin-bottom: 0;
  }
`;

export const Checkbox = styled.input`
width: 18px;
height: 18px;
margin-top: 2px;
cursor: pointer;
accent-color: ${colors.primary};
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  flex: 1;
  cursor: pointer;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.error || '#ff4d4f'};
  font-size: ${fontSizes?.Small || '0.875rem'};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const HelperSuccess = styled.div`
  margin-top: 0.4rem;
  font-size: .85rem;
  color: #0a7d32;
`;

export const HelperInfo = styled.div`
  margin-top: 0.4rem;
  font-size: .8rem;
  color: #555;
`;