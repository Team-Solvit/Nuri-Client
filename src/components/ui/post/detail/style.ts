import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 80vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const Left = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: ${colors.line2};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SliderTrack = styled.div<{ index: number; count: number }>`
  display: flex;
  width: ${({ count }) => `calc(100% * ${count})`};
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  transform: ${({ index }) => `translateX(-${index * 100}%)`};
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  position: relative;
`;

export const ArrowBtn = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? 'left: 1rem;' : 'right: 1rem;')}
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
  &:hover {
    background-color: rgba(240,240,240,0.95);
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid ${colors.line2};
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & > img {
    border-radius: ${radius.full};
  }
  & > div {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    color: ${colors.gray};
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  position: relative;
`;

export const RoomTourWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Right = styled.div`
  flex: 2;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const RightContent = styled.div<{ showComments: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  transition: transform 0.3s ease;
  transform: ${({ showComments }) => showComments ? 'translateY(-100%)' : 'translateY(0)'};
`;

export const RightTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const RightPeriodTags = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RightPeriodTag = styled.span`
  background: rgba(255,76,97,0.1);
  border: 1px solid ${colors.primary};
  border-radius: 20px;
  color: ${colors.primary};
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-weight: 500;
`;

export const RightTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

export const RightRoomType = styled.span`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  font-weight: 500;
`;

export const RightSub = styled.span`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  margin-bottom: 1rem;
`;

export const RightDesc = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const RightDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.line};
  margin: 1rem 0;
`;

export const RightLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const RightLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.text};
`;

export const RightPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RightPriceUnit = styled.span`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
`;

export const RightPriceValue = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.text};
`;

export const RightFeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

export const RightFeature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const RightFeatureIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${colors.line2};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const RightFeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const RightFeatureTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.text};
`;

export const RightFeatureDesc = styled.span`
  font-size: 0.75rem;
  color: ${colors.gray};
  line-height: 1.4;
`;

export const RightImageBox = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`;

export const RightImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: ${radius.md};
  object-fit: cover;
`;

export const RightFacilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1rem 0;
`;

export const RightFacility = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`;

export const RightFacilityIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightFacilityText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.text};
`;

export const CommentsSection = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  transform: ${({ show }) => show ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease;
  z-index: 10;
`;

export const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${colors.line2};
  background: #fff;
`;

export const CommentsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.text};
`;

export const CommentsCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${colors.gray};
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: ${colors.text};
  }
`;

export const CommentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.line2};
  }
`;

export const CommentAvatar = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.line2};
  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CommentAuthor = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 0.25rem;
`;

export const CommentText = styled.div`
  font-size: 0.875rem;
  color: ${colors.text};
  line-height: 1.4;
  word-wrap: break-word;
`;

export const CommentMenu = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: ${colors.gray};
  
  &:hover {
    color: ${colors.text};
  }
`;

export const InteractionBar = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
  border: 1px solid ${colors.line2};
  padding: 1rem 1.5rem;
  z-index: 20;
`;

export const InteractionButtons = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
  gap: 1.5rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.text};
  
  &:hover {
    opacity: 0.7;
  }
`;

export const ActionCount = styled.span`
  font-size: 0.875rem;
  color: ${colors.gray};
`;

export const MenuButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 0.25rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const MenuDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #fff;
  border: 1px solid ${colors.line2};
  border-radius: ${radius.md};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 20;
  margin-bottom: 0.5rem;
`;

export const MenuItem = styled.button<{ red?: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  white-space: nowrap;

  color: ${({ red }) => red ? colors.error : colors.text};
  font-size: 0.875rem;
  color: ${colors.text};
  cursor: pointer;
  
  &:hover {
    background: ${colors.line2};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.line2};
  }
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.line2};
  border-radius: 20px;
  font-size: 0.875rem;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  line-height: 1.4;
  font-family: inherit;
  
  &::placeholder {
    color: ${colors.gray};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ disabled }) => disabled ? colors.line2 : colors.primary};
  border: none;
  border-radius: 50%;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${colors.primary};
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;