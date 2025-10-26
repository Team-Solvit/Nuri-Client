import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const Wrapper = styled.div`
  padding: 24px;
  min-width: 500px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;

  ${mq.mobile} {
    min-width: unset;
    width: 100%;
    max-width: 100%;
    padding: 20px;
    max-height: 90vh;
  }
`;

export const Title = styled.h3`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: bold;
`;

export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const BannerImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
`;

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 8px;
  border: 1px solid #ddd;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: vertical;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: white;
`;

export const CoordText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;
