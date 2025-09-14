import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 90vw;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #333;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin: 0;
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
`;

export const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
`;

export const QRCodePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
`;

export const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
  width: 100%;
`;

export const InstructionItem = styled.div`
  font-size: 0.875rem;
  color: #495057;
  line-height: 1.4;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
  }

  &::placeholder {
    color: #999;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  text-align: center;
  margin: -0.5rem 0 0 0;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export const ResendWrapper = styled.div`
  text-align: center;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }

  &:disabled {
    color: #999;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bbb;
  }
`;
