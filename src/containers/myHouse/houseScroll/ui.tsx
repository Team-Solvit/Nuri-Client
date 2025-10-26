"use client";

import React, {useState, useEffect} from 'react';
import * as S from './style';
import Square from '@/components/ui/button/square';
import Image from "next/image";
import {useModalStore} from "@/store/modal";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import LeaveModal from "@/containers/myHouse/leave-modal/ui";
import {useQuery} from "@apollo/client";
import {BoardingHouseQueries} from "@/services/boardingHouse";
import {BoardingHouseType, BoardingRoomAndBoardersType, BoarderType} from "@/types/boardinghouse";
import {useUpdateRoomNumber} from "@/store/updateRoomNumber";
import {useLoadingEffect} from "@/hooks/useLoading";
import HouseScrollSkeleton from "@/components/ui/skeleton/HouseScrollSkeleton";
import {useAlertStore} from "@/store/alert";
import {imageCheck} from "@/utils/imageCheck";

const HouseScroll = () => {
	const [isOpen, setIsOpen] = useState(false);
	
	const navigate = useNavigationWithProgress();
	const {error} = useAlertStore();
	
	const [leaveInfo, setLeaveInfo] = useState([{
		boarderName: "",
		roomName: ""
	}])
	const {open} = useModalStore();
	const openModal = (boarderNames: string[], roomName: string, contractId: string) => {
		open();
		setContractId(contractId)
		const newBoarders = boarderNames.map((item) => ({
			boarderName: item,
			roomName: roomName,
		}));
		
		setLeaveInfo(newBoarders)
	}
	const {data: boardingHouseInfo, loading : boardingHouseInfoLoading} = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_INFO);
	const {data: boardingHouseRooms, refetch, loading : boardingHouseRoomsLoading} = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_ROOMS);
	
	const isLoading = boardingHouseRoomsLoading || boardingHouseInfoLoading;
	useLoadingEffect(isLoading);
	
	const boardingHouse: BoardingHouseType = boardingHouseInfo?.getMyBoardingHouse;
	const boardingHouseRoomsList: BoardingRoomAndBoardersType[] = boardingHouseRooms?.getBoardingRoomAndBoardersInfoList;
	
	// 로딩이 끝났는데 데이터가 없으면 에러 처리
	useEffect(() => {
		if (!isLoading && !boardingHouse) {
			error("현재 하숙집이 설정되어있지 않습니다. 하숙집을 설정해주세요");
			navigate("/setting/host");
		}
	}, [isLoading, boardingHouse, error, navigate]);
	
	const {setRoomNumber, setRefetch} = useUpdateRoomNumber()
	const [contractId, setContractId] = useState<string>("");
	const handleRoomAdd = () => {
		navigate("/myHouse/addition")
		setRefetch(refetch)
		setRoomNumber("")
	}
	const handleModifyRoom = (roomId: string) => {
		navigate(`/myHouse/addition`)
		setRoomNumber(roomId)
		setRefetch(refetch)
	}
	// open modal for a single boarder (individual contract end)
	const handleBoarderLeaveOpen = (e: React.MouseEvent, boarderEntry: BoarderType | null | undefined, roomName?: string) => {
		e.stopPropagation();
		if (!boarderEntry) return;
		const name = boarderEntry.boarder?.user?.name ?? "";
		const contractId = boarderEntry.contractId ?? "";
		openModal([name], roomName ?? "", contractId);
	}
	
	if (isLoading) {
		return <HouseScrollSkeleton />;
	}
	return (
		<S.Container>
			{leaveInfo && <LeaveModal roomRefetch={refetch} boarders={leaveInfo} contractId={contractId}/>}
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
					<S.InfoValue>{boardingHouse?.gender === "ALL" ? "상관없음" : boardingHouse?.gender === "MALE" ? "남성전용" : "여성전용"}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>식사제공여부</S.InfoLabel>
					<S.InfoValue>{boardingHouse?.isMealProvided ? "제공" : "미제공"}</S.InfoValue>				</S.InfoRow>
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
				<Square text='방추가' status={true} width='100px' onClick={handleRoomAdd}/>
			</S.RoomInfoContainer>
			<S.RoomList>
				{boardingHouseRoomsList && boardingHouseRoomsList.length > 0 ? (
					boardingHouseRoomsList.map((room, idx) => {
						return (
							<S.RoomCard
								onClick={() => handleModifyRoom(room.room?.roomId ?? "")}
								key={idx}
							>
								<S.RoomImage>
									{room?.room?.boardingRoomFile?.[0]?.url && process.env.NEXT_PUBLIC_IMAGE_URL ? (
										<Image
											src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${room.room.boardingRoomFile[0].url}`}
											alt="room"
											fill
											style={{objectFit: "cover"}}
										/>
									) : (
										<div style={{width: "100%", height: "100%", background: "#f2f2f2"}}/>
									)}
								</S.RoomImage>
								<S.RoomHeader>
									<S.RoomInfo>
										<S.RoomName>{room.room?.name}</S.RoomName>
										{room.room?.status !== "EMPTY_ROOM" && room?.contractInfo && (
											<S.BoarderList>
												{room.contractInfo.map((entry) => {
													const { contractId, boarder } = entry;
													const { user, callNumber } = boarder ?? {};
													return (
														<S.ProfileWrap key={contractId ?? user?.id}>
															<S.ProfileImg>
																<Image
																	src={imageCheck(user?.profile)}
																	alt="profile"
																	fill
																	style={{ objectFit: "cover" }}
																/>
															</S.ProfileImg>
															<div>
																<S.UserId>{user?.name}</S.UserId>
																{callNumber && <S.UserPhone>{callNumber}</S.UserPhone>}
															</div>
															<S.ActionWrap>
																<Square
																	text="계약 종료"
																	status={true}
																	onClick={(e: React.MouseEvent) =>
																		handleBoarderLeaveOpen(e, entry, room.room?.name)
																	}
																	width="max-content"
																/>
															</S.ActionWrap>
														</S.ProfileWrap>
													);
												})}
												</S.BoarderList>
											)}
											{room.room?.status === "EMPTY_ROOM" && (
												<S.UserId color="#8c8c8c">비어있음</S.UserId>
											)}
										</S.RoomInfo>
									</S.RoomHeader>
								</S.RoomCard>
							)
						})
				) : (
					<S.EmptyMessage>
						등록된 방이 없습니다. 방을 추가해보세요!
					</S.EmptyMessage>
				)}
			</S.RoomList>
		</S.Container>
	);
};

export default HouseScroll;