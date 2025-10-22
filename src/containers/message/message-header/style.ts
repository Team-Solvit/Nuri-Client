import styled from "@emotion/styled";
import {colors, fontSizes, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MessageHeaderContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 10%;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #DDDDDD;
  justify-content: space-between;
  background-color: white;
  z-index: ${zIndex.dropdown};

  ${mq.mobile} {
    position: fixed;
    top: 0;
    left: 0;
  }

`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > p {
    font-size: ${fontSizes.H4};
    font-weight: 500;
  }
`
export const EllipsisIconBox = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`
export const Profile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export const FadeBoxContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${zIndex.dropdown};
  min-width: 120px;
  animation: fadeIn 0.2s ease-in-out;

  & > button:first-of-type {
    color: ${colors.primary};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MenuButton = styled.button`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${colors.line};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.line2};
  }
`;

export const ConfirmModalContent = styled.div`
  padding: 1.5rem;
  text-align: center;
  min-width: 280px;

  h3 {
    font-size: ${fontSizes.H4};
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${colors.text};
  }

  p {
    font-size: ${fontSizes.Body};
    color: ${colors.gray};
    margin-bottom: 1.5rem;
  }
`;

export const ConfirmButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

export const CancelButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: 1px solid ${colors.line2};
  background: white;
  color: ${colors.text};
  font-size: ${fontSizes.Body};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.background};
  }
`;

export const ConfirmButton = styled(CancelButton)`
  background: ${colors.primary};
  color: white;
  border: none;

  &:hover {
    background: ${colors.primary};
  }
`;

export const MemberCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${colors.line};
  border-radius: 12px;
  font-size: 12px;
  color: ${colors.text};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary}20;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MemberListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${colors.line};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: ${zIndex.modal};
  max-height: 200px;
  overflow-y: auto;
`;

export const MemberListHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.line};
  font-weight: 600;
  font-size: 14px;
  color: ${colors.text};
`;

export const MemberItem = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${colors.line};
  font-size: 14px;
  color: ${colors.text};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${colors.background};
  }
`;
