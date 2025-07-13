import styled from "@emotion/styled";
import { colors, fontSizes } from '@/styles/theme';
import React from "react";

const RoomTourBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid ${colors.line};
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomTourImage = styled.img`
  width: 100%;
  max-width: 288px;
  height: 180px;
  object-fit: cover;
  border-radius: 1.1rem 1.1rem 0 0;
`;

const RoomTourTitle = styled.div`
  font-size: 1.25rem;
  color: ${colors.text};
  font-weight: 400;
  margin: 1.2rem 0 0.2rem 0;
`;

const RoomTourHouse = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.2rem;
`;

const RoomTourDate = styled.div`
  font-size: 0.75rem;
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

const RoomTourTime = styled.div`
  font-size: 0.75rem;
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.8rem;
`;

const RoomTourButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

const RoomTourContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const MsgTime = styled.div<{ isSent?: boolean }>`
  font-size: 0.75rem;
  color: #888;
  font-weight: 300;
  margin-top: 2px;
  text-align: right;
  position: absolute;
  bottom: 0;
  ${({isSent}) => isSent ? "left: -4rem;" : "right: -4rem;"};
`;

interface RoomTourMessageProps {
  thumbnail: string;
  name: string;
  date: string;
  time?: string;
  isSent?: boolean;
  onDetail?: () => void;
  button?: React.ReactNode;
}

const RoomTourMessage: React.FC<RoomTourMessageProps> = ({ thumbnail, name, date, time, isSent, onDetail, button }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <RoomTourBubble>
      <RoomTourImage src={thumbnail} alt="roomtour-img" />
      <RoomTourContent>
        <RoomTourTitle>룸투어를 예약했어요</RoomTourTitle>
        <RoomTourHouse>{name}</RoomTourHouse>
        <RoomTourDate>날짜 : {date}</RoomTourDate>
        <RoomTourTime>시간 : {time}</RoomTourTime>
        <RoomTourButtonWrapper>
          {button ? button : onDetail && <button onClick={onDetail}>자세히보기</button>}
        </RoomTourButtonWrapper>
      </RoomTourContent>
    </RoomTourBubble>
    {time && <MsgTime isSent={isSent}>{time}</MsgTime>}
  </div>
);

export default RoomTourMessage; 