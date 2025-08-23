"use client";

import React, {useState} from 'react';
import * as S from './style';
import Square from '@/components/ui/button/square';
import Image from "next/image";
import {useModalStore} from "@/store/modal";
import {fakeData} from "./data";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import LeaveModal from "@/containers/myHouse/leave-modal/ui";
import {useQuery} from "@apollo/client";
import {BoardingHouseQueries} from "@/services/boardingHouse";
import {BoardingHouseType, BoardingRoomAndBoardersType} from "@/types/boardinghouse";

const HouseScroll = () => {
	const [isOpen, setIsOpen] = useState(false);
	
	const navigate = useNavigationWithProgress();
	
	const [leaveInfo, setLeaveInfo] = useState([{
		boarderName: "",
		roomName: ""
	}])
	const {open} = useModalStore();
	const openModal = (boarderNames: string[], roomName: string) => {
		open();
		const newBoarders = boarderNames.map((item) => ({
			boarderName: item,
			roomName: roomName,
		}));
		
		setLeaveInfo(newBoarders)
	}
	const {data: boardingHouseInfo} = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_INFO);
	const {data: boardingHouseRooms} = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_ROOMS);
	
	const boardingHouse: BoardingHouseType = boardingHouseInfo?.getMyBoardingHouse;
	const boardingHouseRoomsList: BoardingRoomAndBoardersType[] = boardingHouseRooms?.getBoardingRoomAndBoardersInfoList;
	
	return (
		<S.Container>
			{leaveInfo && <LeaveModal boarders={leaveInfo}/>}
			<S.Header>
				<S.Title>{boardingHouse?.name}</S.Title>
				<S.Setting onClick={() => navigate("/setting/host")}>하숙집 설정</S.Setting>
			</S.Header>
			<S.InfoSection isOpen={isOpen}>
				<S.InfoRow>
					<S.InfoLabel>전화번호</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.houseCallNumber}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>위치</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.location}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>성별</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.gender}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>식사제공여부</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.meal ? "제공" : "미제공"}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>가까운 역</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.nearestStation}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>가까운 학교</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.nearestSchool}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoValue>{boardingHouse?.description}</S.InfoValue>
				</S.InfoRow>
			</S.InfoSection>
			<S.More onClick={() => setIsOpen(!isOpen)}>{isOpen ? "숨기기" : "더보기"}</S.More>
			<S.RoomInfoContainer>
				<S.RoomInfoTitle>방 정보</S.RoomInfoTitle>
				<Square text='방추가' status={true} width='100px' onClick={() => navigate("/myHouse/addition")}/>
			</S.RoomInfoContainer>
			<S.RoomList>
				{boardingHouseRoomsList?.map((room, idx) => (
					<S.RoomCard key={idx}>
						<S.RoomImage>
							<Image src={room?.room?.boardingRoomFile?.[0]?.url ?? ""} alt={"profile"} fill
							       style={{objectFit: "cover"}}/>
						</S.RoomImage>
						<S.RoomHeader>
							<S.RoomInfo>
								<S.RoomName>{room.room?.name}</S.RoomName>
								{room.boarders && room.boarders.map(boarder => {
									return (
										<S.ProfileWrap key={boarder.id}>
											<S.ProfileImg>
												<Image src={boarder.profile} alt={"profile"} fill style={{objectFit: "cover"}}/>
											</S.ProfileImg>
											<S.UserId>{boarder.name}</S.UserId>
										</S.ProfileWrap>
									)
								})
								}
								{!room.room?.roomId && (
									<S.UserId color="#8c8c8c">비어있음</S.UserId>
								)}
							</S.RoomInfo>
							{room.room?.roomId && (
								<Square text={"계약 종료"}
								        onClick={() =>
									        openModal(
										        room.boarders?.map(boarder => boarder.name) ?? [],
										        room.room?.name ?? ""
									        )
								        } status={true}
								        width={"max-content"}/>
							)}
						</S.RoomHeader>
					</S.RoomCard>
				))}
			</S.RoomList>
		</S.Container>
	);
};

export default HouseScroll;