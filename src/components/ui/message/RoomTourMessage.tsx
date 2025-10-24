import styled from "@emotion/styled";
import { colors, fontSizes, radius } from "@/styles/theme";
import React from "react";
import { mq } from "@/styles/media";
import { MESSAGE_MAX_WIDTH_MOBILE } from "@/constants/constant";
import { RoomTour, RoomTourResponseDto } from "@/types/message";
import { useQuery } from "@apollo/client";
import { RoomTourQueries } from "@/services/roomTour";
import * as S from "@/containers/message/roomtour-modal/style";
import { useMessageContentReadFetchStore } from "@/store/messageContentReadFetch";
import {imageCheck} from "@/utils/imageCheck";

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

  ${mq.mobile} {
    max-width: ${MESSAGE_MAX_WIDTH_MOBILE}px;
  }
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
  ${({ isSent }) => (isSent ? "left: -4.5rem;" : "right: -4.5rem;")};
`;

// ✅ Status 스타일 애니메이션 추가 (보이기 전엔 숨김)
const Status = styled.div<{ isAgree: boolean; visible?: boolean }>`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: ${(props) =>
	props.isAgree ? colors.success : colors.error};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Small};
  font-weight: 300;
  z-index: 1;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateY(${(props) => (props.visible ? "0" : "-8px")});
  transition: all 0.3s ease;
`;

interface RoomTourMessageProps {
	roomTour: RoomTour;
	messageTime?: string;
	isSent?: boolean;
	onDetail?: () => void;
	button?: React.ReactNode;
}

const RoomTourMessage: React.FC<RoomTourMessageProps> = ({
	                                                         roomTour,
	                                                         messageTime,
	                                                         isSent,
	                                                         onDetail,
	                                                         button,
                                                         }) => {
	const shouldSkip = !(roomTour.roomTourId && roomTour.type === "roomTour");
	
	const { isActivate: refetchKey } = useMessageContentReadFetchStore();
	const { data } = useQuery(RoomTourQueries.GET_ROOM_TOUR, {
		variables: { roomTourId: roomTour.roomTourId, refetchKey },
		skip: shouldSkip,
		fetchPolicy: "no-cache", // 캐시를 완전히 무시하고 매번 네트워크 요청
	});
	
	const roomTourData: RoomTourResponseDto | undefined = data?.getRoomTour;
	const date = roomTour.time;
	const status = roomTourData?.status;
	
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{/* ✅ status가 있을 때만 Status 표시 */}
			{status && status !== "PENDING" && (
				<Status
					isAgree={status === "APPROVED"}
					visible={!!status}
				>
					{status === "APPROVED" ? "수락" : "거절"}
				</Status>
			)}
			
			<RoomTourBubble>
				<RoomTourImage
					src={imageCheck(roomTour?.thumbnail)}
					alt="roomtour-img"
				/>
				<RoomTourContent>
					<RoomTourTitle>
						{roomTourData?.status === "APPROVED" && "룸투어를 예약했어요"}
						{roomTourData?.status === "REJECTED" && "룸투어예약을 취소했어요"}
						{roomTourData?.status === "PENDING" && "룸투어 요청이 왔어요"}
					</RoomTourTitle>
					<RoomTourHouse>{roomTour.roomName}</RoomTourHouse>
					<RoomTourDate>
						날짜 : {date.year}년 {date.month}월 {date.day}일
					</RoomTourDate>
					<RoomTourTime>
						시간 : {date.hour}시 {date.minute}분
					</RoomTourTime>
					<RoomTourButtonWrapper>
						{button ? (
							button
						) : (
							onDetail && <button onClick={onDetail}>자세히보기</button>
						)}
					</RoomTourButtonWrapper>
				</RoomTourContent>
			</RoomTourBubble>
			
			{messageTime && <MsgTime isSent={isSent}>{messageTime}</MsgTime>}
		</div>
	);
};

export default RoomTourMessage;