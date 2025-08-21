import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";

export const DropdownContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  width: 260px;
  background: white;
  border-radius: ${radius.md};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.dropdown};
`;

export const Content = styled.div`
  padding: 8px;
  width: 100%;
  overflow-y: auto;
  flex: 1;
`;

export const SearchBar = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const SelectedUsers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  max-height: 60px;
  overflow-y: auto;
  margin-bottom: 16px;
  min-height: 60px;
`;

export const UserTag = styled.div`
  background: #f0f0f0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 12px;
  height: 30px;
  font-size: ${fontSizes.Caption};
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 200px;
  overflow-y: auto;
`;

export const UserItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 2px 0;

  &:hover {
    background-color: #f5f5f5;
  }

  ${({isSelected}) =>
    isSelected &&
    css`
      background-color: #e3f2fd;
    `}
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 8px;
  overflow: hidden;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  color: #666;
  font-size: 16px
`
export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 1px;
`;

export const UserEmail = styled.div`
  font-size: 11px;
  color: #888;
`;

export const ActionButton = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

// 프로필 업로드 섹션
export const ProfileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 16px;
`;

export const ProfilePreviewBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e5e5;

  span {
    color: #999;
    font-size: 12px;
  }

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    display: block;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #2563eb;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const RemoveImageButton = styled.label`
  display: inline-flex;
  align-items: center;
  text-align: center;
  gap: 8px;
  cursor: pointer;
  color: #ef4444;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;