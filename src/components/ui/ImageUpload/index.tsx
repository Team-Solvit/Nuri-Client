import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

const FormSection = styled.div`
  margin-bottom: 28px;
`;

const Label = styled.label`
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

const ImageUploadSection = styled.div`
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

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
`;

const PreviewImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const RemoveImageBtn = styled.button`
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

const UploadText = styled.div`
  color: #8899a6;
  font-size: 14px;
  margin-top: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const LoadingOverlay = styled.div`
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

interface ImageUploadProps {
  label: string;
  preview: string;
  loading: boolean;
  icon: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

export default function ImageUpload({
  label,
  preview,
  loading,
  icon,
  onImageUpload,
  onImageRemove
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <FormSection>
      <Label className="optional">{label}</Label>
      <ImageUploadSection 
        className={preview ? 'has-image' : ''}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <LoadingOverlay />
        ) : preview ? (
          <ImagePreview>
            <PreviewImage src={preview} alt={`${label} 미리보기`} />
            <RemoveImageBtn 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onImageRemove();
              }}
            >
              ×
            </RemoveImageBtn>
          </ImagePreview>
        ) : (
          <>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{icon}</div>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{label} 업로드</div>
            <UploadText>클릭하여 이미지를 선택해주세요</UploadText>
          </>
        )}
      </ImageUploadSection>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </FormSection>
  );
}
