import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const CreatePageWrapper = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  max-height: 100vh;
  overflow-y: auto;
  
  ${mq.mobile} {
    padding: 16px;
  }
`;

export const Header = styled.div`
  text-align: center;
  padding: 24px 0;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const Form = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  
  ${mq.mobile} {
    padding: 24px;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  
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
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: #999;
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
  gap: 12px;
  align-items: center;
  
  ${mq.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const CityLabel = styled.div`
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
  
  ${mq.mobile} {
    width: 100%;
    min-width: unset;
  }
`;

export const Select = styled.select`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  ${mq.mobile} {
    width: 100%;
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
  max-width: 600px;
  margin: 32px auto 40px auto;
  padding: 0 40px;
  
  ${mq.mobile} {
    margin: 24px 16px 32px 16px;
    padding: 0;
    gap: 12px;
    
    button {
      width: 100% !important;
      font-size: 16px !important;
      padding: 16px !important;
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
