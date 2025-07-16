import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const Image = styled.div`
  width: 40vw;
  height: 67vh;
  position: relative;
  overflow: hidden;
  background: ${colors.line2};
`;

export const InputImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;

  p{
    font-size: ${fontSizes.H4};
    font-weight: 400;
    color: ${colors.text};
  }
`;

export const FileBtn = styled.label`
  position: relative;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  text-align: center;
  display: inline-block;
  z-index: 10;
`;



export const Left = styled.div`
    display: flex;
    flex-direction: column;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding:  1.5rem 0.5rem;
`

export const Modal = styled.div`
  background: #fff;
  min-width: 70vw;
  min-height: 80vh;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const Header = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 9rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H4};
  font-weight: 500;
  margin: 0;
`;

export const ProfileRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  align-items: center;
`;

export const ProfileImg = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.line2};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ProfileName = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`;

export const ProfileLabel = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 37vh;
  outline: none;
  border: none;
  font-size: ${fontSizes.Body};
  resize: vertical;
  outline: none;
  margin-top: 1rem;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const CharCount = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  margin-left: 19rem;
`;

export const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-top: 2px;
`;

export const ToggleButton = styled.button`
  width: 50px;
  height: 28px;
  border: none;
  background: none;
  position: relative;
  padding: 0;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease;
  }

  .on {
    opacity: 1;
  }

  .off {
    opacity: 0;
  }

  &.inactive .on {
    opacity: 0;
  }

  &.inactive .off {
    opacity: 1;
  }
`;


export const Switch = styled.input`
  width: 40px;
  height: 20px;
  accent-color: ${colors.primary};
`;


export const Dropdown = styled.div`
  position: absolute;
  top: 2rem;
  left: 0.5rem;
  width: 100px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const PublicWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 8px 12px;
  width: fit-content;
  min-width: 120px;
  cursor: pointer;
`;

export const PublicIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ArrowIconWrap = styled.div`
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rem;
`;

export const PublicLabel = styled.span`
  white-space: nowrap;
  font-size: 14px;
`;



export const PublicIcon = styled.div`
    display: flex;
    margin-top: 1rem;
    gap: 0.5rem;
    cursor: pointer;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 10rem;
`;

export const CancelBtn = styled.button`
  background: ${colors.line};
  color: ${colors.gray};
  border: none;
  border-radius: ${radius.md};
  padding: 0.7rem 2rem;
  font-size: ${fontSizes.Body};
  cursor: pointer;
`;

export const UploadBtn = styled.button`
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${radius.md};
  padding: 0.7rem 2rem;
  font-size: ${fontSizes.Body};
  font-weight: 600;
  cursor: pointer;
`;