import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`

export const Image = styled.div`
  width: 40vw;
  height: 67vh;
  position: relative;
  overflow: hidden;
  background: ${colors.line2};
  border-right: 1px solid ${colors.line2};

  ${mq.mobile} {
    height: 38vh;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${colors.line2};
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
  padding: 1.5rem 2rem;
  width: 100%;
  gap: 0.5rem;

  ${mq.mobile} {
    padding: 1rem 1.5rem;
  }
`

export const Modal = styled.div`
  background: #fff;
  min-width: 70vw;
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.16);
  display: flex;
  gap: 0;
  position: relative;
  overflow: hidden;

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

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: ${colors.text};
`

export const Title = styled.h2`
  font-size: ${fontSizes.H4};
  font-weight: 500;
  margin: 0;
`

export const PublicIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${mq.mobile} {
    margin-top: 0.5rem;
  }
`

export const ProfileRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  align-items: center;
  border-top: 1px solid ${colors.line2};
  background: #fafafa;

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
  min-height: 35vh;
  outline: none;
  border: none;
  font-size: ${fontSizes.Body};
  line-height: 1.6;
  resize: none;
  margin-top: 1rem;
  font-family: "SCoreDream", sans-serif;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: ${fontSizes.Body};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.line2};
    border-radius: 3px;
  }

  ${mq.mobile} {
    min-height: 15vh;
    margin-top: 0.5rem;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const PublicSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const PublicTitle = styled.span`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  font-weight: 400;
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
  text-align: right;
  margin-top: 0.5rem;
  font-weight: 500;

  ${mq.mobile} {
    margin-right: 0rem;
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
  top: 2.5rem;
  left: 0;
  background: white;
  border: 1px solid ${colors.line};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  z-index: 10;
`

export const DropdownItem = styled.div`
  padding: 12px 16px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  font-size: ${fontSizes.Body};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colors.line};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.line2};
  }
`

export const PublicWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 10px 14px;
  width: fit-content;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid ${colors.line};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${colors.line};
  }
`

export const PublicLabel = styled.span`
  white-space: nowrap;
  font-size: 14px;
  color: ${colors.gray};
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
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${colors.line2};

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

export const TitleInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid ${colors.line2};
  font-size: ${fontSizes.H4};
  font-weight: 600;
  outline: none;
  padding-bottom: 0.75rem;
  margin-top: 1rem;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-weight: 500;
  }

  &:focus {
    border-color: ${colors.primary};
  }

  ${mq.mobile} {
    margin-left: 0rem;
    margin-top: 0.5rem;
  }
`