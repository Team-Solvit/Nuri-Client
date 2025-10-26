import styled from '@emotion/styled';
import {colors, fontSizes, radius} from '@/styles/theme';
import {mq} from "@/styles/media";

export const Container = styled.div`
  background: ${colors.background};
  border-radius: ${radius.lg2};
  border: 1px solid ${colors.line};
  padding: 3rem;
  width: 100%;
  height: 85vh;
  overflow-y: auto;

  ${mq.mobile} {
    padding: 2rem 1.5rem;
    margin-top: 6rem;
    height: 80vh;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RoomInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

export const Title = styled.h1`
  font-weight: 500;

  font-size: ${fontSizes.H2};
  color: ${colors.text};
  text-align: center;
	
	${mq.mobile} {
		font-size: ${fontSizes.H3};
	}
`;

export const Setting = styled.button`
  all: unset;
  box-sizing: border-box;
  font-weight: 500;
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  cursor: pointer;
`;

export const InfoSection = styled.div<{ isOpen: boolean }>`
  margin-top: 24px;
  max-height: ${props => props.isOpen ? '1000px' : '4rem'};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-top: 2rem;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 500;
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
`;

export const InfoValue = styled.span`
  font-weight: 500;
  font-size: ${fontSizes.Small};
  color: ${colors.text};
`;

export const More = styled.button`
  all: unset;
  box-sizing: border-box;
  display: inline-block;
  font-weight: 500;
  width: 100%;
  text-align: center;
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  cursor: pointer;
  margin-left: auto;

  &:hover {
    text-decoration: underline
  }
`;

export const RoomInfoTitle = styled.h2`
  font-weight: 500;
  font-size: ${fontSizes.H3};
  color: ${colors.text};
`;

export const RoomList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 16px;
`;
export const RoomCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: ${colors.background};
  border-radius: ${radius.lg2};
  border: 1px solid ${colors.line};
  width: 100%;
  padding: 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${colors.line2};
  }

  ${mq.mobile} {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    padding: 0 1rem;
  }
`;
export const RoomHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const RoomInfo = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem 2rem;
  gap: 0.4rem;

  ${mq.mobile} {
    width: max-content;
    padding: 1.5rem;
  }
`;

export const RoomName = styled.span`
  font-weight: 500;
  font-size: ${fontSizes.H4};
  color: ${colors.text};
  margin-right: 16px;
`;

export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  gap: 8px;
`;

export const ProfileImg = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${radius.full};
  background: #e0e0e0;
  position: relative;
  overflow: hidden;
  margin-right: 4px;
`;

export const UserId = styled.span<{ color?: string }>`
  font-weight: 500;
  font-size: ${fontSizes.Body};
  color: ${({color}) => color || colors.text};
  margin-right: 8px;
`;

export const RoomImage = styled.div`
  width: 100%;
  height: 7rem;
  border-radius: ${radius.lg2};
  background: ${colors.line};
  margin-top: 8px;
  position: relative;
  overflow: hidden;
`

export const EmptyMessage = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  text-align: center;
`
