import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

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
`

export const Image = styled.div`
  width: 40vw;
  height: 67vh;
  position: relative;
  overflow: hidden;
  background: ${colors.line2};

  ${mq.mobile} {
    height: 38vh;
    width: 100%;
  }
`

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
`

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
`



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

  ${mq.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    gap: 0;
    flex-direction: column;
  }
`

export const HeaderM = styled.div`
  ${mq.mobile} {
    display: flex;
    padding: 1rem;
    gap: 1rem;
  }
`

export const Header = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 9rem;
`

export const Title = styled.h2`
  font-size: ${fontSizes.H4};
  font-weight: 500;
  margin: 0;
`

export const PublicIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  ${mq.mobile} {
    margin-left: -0.1rem;
    margin-top: 0.5rem;
  }
`

export const ProfileRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  align-items: center;

  ${mq.mobile} {
    display: none;
  }
`

export const ProfileImg = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.line2};
`


export const ProfileName = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`


export const Textarea = styled.textarea`
  width: 100%;
  min-height: 37vh;
  outline: none;
  border: none;
  font-size: ${fontSizes.Body};
  resize: vertical;
  outline: none;
  margin-top: 1rem;
  resize: none;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }

  ${mq.mobile} {
    min-height: 15vh;
    margin-top: -0.5rem;
    margin-left: 0.5rem;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`


export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 4;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const SlideImages = styled.div<{ currentIndex: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.4s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;


export const PrevBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  font-size: 18px;
  z-index: 2;

  img {
    transform: rotate(180deg);
    object-fit: cover;
  }
`;


export const NextBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  font-size: 18px;
  z-index: 2;
`;

export const CharCount = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  margin-left: 19rem;

  ${mq.mobile} {
    margin-left:  19rem;
  }
`

export const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
`

export const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-top: 2px;

  ${mq.mobile} {
    margin-left: 0.5rem;
  }
`

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
`

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
`

export const DropdownItem = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`

export const PublicWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 8px 12px;
  width: fit-content;
  min-width: 120px;
  cursor: pointer;
`

export const PublicLabel = styled.span`
  white-space: nowrap;
  font-size: 14px;
`



export const PublicIcon = styled.div`
    display: flex;
    margin-top: 1rem;
    gap: 0.5rem;
    cursor: pointer;
`

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 10rem;

  ${mq.mobile} {
    display: none;
  }
`

export const AddMoreImageBtn = styled.label`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  ${mq.mobile} {
    bottom: 15px;
    right: 15px;
    padding: 10px 14px;
  }
`

export const AddMoreIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;

  ${mq.mobile} {
    font-size: 16px;
  }
`

export const AddMoreText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: white;
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 12px;
  }
`

// 제목 입력 필드
export const TitleInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.line2};
  border-radius: 8px;
  font-size: ${fontSizes.Body};
  outline: none;
  margin-bottom: 1rem;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
  }

  &:focus {
    border-color: ${colors.primary};
  }
`