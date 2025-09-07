import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const CreatePageWrapper = styled.div`
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
  max-height: 100vh;
  overflow-y: auto;

  ${mq.mobile} {
    max-width: 100%;
  }
`;

export const Header = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;


export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;
`;

export const Form = styled.div`
  padding: 32px 24px;
  background: white;
  margin: 0 16px 16px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const FormSection = styled.div`
  margin-bottom: 28px;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  position: relative;
  
  &::after {
    content: '*';
    color: #ff4757;
    margin-left: 4px;
  }
  
  &.optional::after {
    display: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fafbfc;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
  
  &::placeholder {
    color: #8899a6;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #fafbfc;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    background: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
  
  &::placeholder {
    color: #8899a6;
  }
`;

export const CoordinateRow = styled.div`
  display: flex;
  gap: 16px;
  
  & > * {
    flex: 1;
  }
`;

export const LocationRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const CityLabel = styled.div`
  padding: 16px 20px;
  background: #f8f9fa;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
`;

export const Select = styled.select`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fafbfc;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
  
  option {
    padding: 12px;
  }
`;

export const ImageUploadSection = styled.div`
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  background: #fafbfc;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${colors.primary};
    background: rgba(102, 126, 234, 0.05);
  }
  
  &.has-image {
    border-style: solid;
    border-color: ${colors.primary};
    background: white;
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
`;

export const PreviewImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const RemoveImageBtn = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ff4757;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    background: #ff3742;
  }
`;

export const UploadText = styled.div`
  color: #8899a6;
  font-size: 14px;
  margin-top: 8px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px 24px 64px 24px;
  margin: 0 16px 32px;
  
  ${mq.mobile} {
    gap: 12px;
    margin: 0 16px 24px;
    
    button {
      width: 100% !important;
    }
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #e1e8ed;
    border-top: 2px solid ${colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
