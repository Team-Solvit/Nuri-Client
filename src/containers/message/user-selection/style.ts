import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: ${radius.lg};
  padding: 1.5rem;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H4};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  margin-bottom: 1.5rem;
  font-size: ${fontSizes.Body};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1.5rem;
`;

export const UserItem = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: ${radius.md};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.background};
  }
`;

export const Checkbox = styled.input`
  margin-right: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 1rem;
  position: relative;
  background: ${colors.line2};
`;

export const UserName = styled.span`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`;

export const SelectedUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  min-height: 2.5rem;
`;

export const UserTag = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.background};
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: ${fontSizes.Small};
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.line};
  }
`;

export const UserTagAvatar = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: ${colors.line2};
`;

export const UserTagName = styled.span`
  white-space: nowrap;
`;

export const UserTagRemove = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  margin-left: 0.25rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button<{ disabled?: boolean; variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  font-weight: 500;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  border: none;
  outline: none;

  ${({variant = 'secondary'}) =>
    variant === 'primary'
      ? `
        background-color: ${colors.primary};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${colors.primary};
        }
      `
      : `
        background-color: ${colors.line2};
        color: ${colors.text};
        &:hover:not(:disabled) {
          background-color: ${colors.line};
        }
      `
  }
  &:disabled {
    opacity: 0.6;
  }
`;