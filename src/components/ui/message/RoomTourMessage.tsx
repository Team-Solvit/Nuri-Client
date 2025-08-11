import styled from "@emotion/styled";
import {colors, fontSizes, radius} from '@/styles/theme';
import React from "react";
import type {Status} from "@/containers/message/message-content/type";

const RoomTourBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  font-size: ${fontSizes.Caption};
  color: #888;
  font-weight: 300;
  margin-top: 2px;
  text-align: right;
  position: absolute;
  bottom: 0;
  ${({isSent}) => isSent ? "left: -4.5rem;" : "right: -4.5rem;"};
`;
const StatusBox = styled.div<{ status: Status }>`
  position: absolute;
  top: 3%;
  left: 3%;
  background-color: ${(props) =>
    props.status === "success" ? "#E74B3C" : "#71DAAA"
  };
  color: white;
  border-radius: ${radius.lg};
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
`;


interface RoomTourMessageProps {
	thumbnail: string;
	name: string;
	date: string;
	tourTime?: string;
	messageTime?: string;
	isSent?: boolean;
	onDetail?: () => void;
	button?: React.ReactNode;
	status: Status
}

const DetailButton = styled.button`
  background-color: ${colors.gray};
  color: white;
  border: none;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
  cursor: not-allowed;
`;
const RoomTourMessage: React.FC<RoomTourMessageProps> = ({
	                                                         thumbnail,
	                                                         name,
	                                                         date,
	                                                         tourTime,
	                                                         messageTime,
	                                                         isSent,
	                                                         button,
	                                                         status
                                                         }) => (
	<div style={{position: 'relative', display: 'inline-block'}}>
		{status !== "ing" && <StatusBox status={status}>{status === "success" ? "거절" : "수락"}</StatusBox>}
		<RoomTourBubble>
			<RoomTourImage src={thumbnail} alt="roomtour-img"/>
			<RoomTourContent>
				<RoomTourTitle>{status === "ing" ? "룸투어를 예약했어요" : "룸투어 예약이 종료되었어요"}</RoomTourTitle>
				<RoomTourHouse>{name}</RoomTourHouse>
				<RoomTourDate>날짜 : {date}</RoomTourDate>
				<RoomTourTime>시간 : {tourTime}</RoomTourTime>
				<RoomTourButtonWrapper>
					{button && status === "ing" ? button : <DetailButton>자세히보기</DetailButton>}
				</RoomTourButtonWrapper>
			</RoomTourContent>
		</RoomTourBubble>
		{messageTime && <MsgTime isSent={isSent}>{messageTime}</MsgTime>}
	</div>
);

export default RoomTourMessage; 