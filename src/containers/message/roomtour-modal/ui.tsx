import Modal from "@/components/layout/modal";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Image from "next/image";
import {useMessageModalStore} from "@/store/messageModal";
import {ConfirmRejectModal} from "@/containers/message/contract-modal/ConfirmRejectModal";
import {useConfirmStore} from "@/store/confirm";
import {useQuery} from "@apollo/client";
import {RoomTourQueries} from "@/services/roomTour";
import {imageCheck} from "@/utils/imageCheck";
import {isRoomTour, RoomTourResponseDto} from "@/types/message";
import React from "react";

export default function RoomTourModal() {
	const {isOpen, master, messageType, close, contractData} = useMessageModalStore();
	const closeModal = () => {
		close()
	}
	const { openConfirm} = useConfirmStore();
	const shouldFetch = isRoomTour(contractData);
	
	const { data } = useQuery(RoomTourQueries.GET_ROOM_TOUR, {
		variables: { roomTourId: shouldFetch ? contractData.roomTourId : "" },
	  skip: !shouldFetch,
			fetchPolicy: "cache-first",
		});
	if (!shouldFetch) return null;
	if(contractData?.type !== "roomTour") return null;
	const roomTour: RoomTourResponseDto = data?.getRoomTour;
	const status = roomTour?.status;
	console.log(status)
	return isOpen && messageType === "roomtour" && (
		<Modal>
			<S.ModalContainer>
				{/* 이미지 */}
				<S.TopImageWrapper>
					<Image
						src={imageCheck(contractData?.thumbnail)}
						alt="룸투어 이미지"
						fill
						style={{objectFit: "cover", borderRadius: "none"}}
						priority
					/>
				</S.TopImageWrapper>
				
				{/* 룸투어 정보 */}
				<S.Section>
					<S.SectionTitle>룸투어 정보</S.SectionTitle>
					
					{/* 하숙집 */}
					<S.SubSection>
						<S.SubTitle>하숙집</S.SubTitle>
						<S.InfoRow>
							<S.Label>이름</S.Label>
							<S.Value>{roomTour?.boarderRoom?.boardingHouse?.name} {roomTour?.boarderRoom?.name}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>날짜</S.Label>
							<S.Value>{contractData?.time?.month}월 {contractData?.time.day}일</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>시간</S.Label>
							<S.Value>{contractData?.time.hour}시 {contractData?.time?.minute}분</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>연락처</S.Label>
							<S.Value>{roomTour?.host?.callNumber}</S.Value>
						</S.InfoRow>
					</S.SubSection>
					
					{/* 방문자 */}
					<S.SubSection>
						<S.SubTitle>방문자</S.SubTitle>
						<S.InfoRow>
							<S.Label>이름</S.Label>
							<S.Value>{roomTour?.user?.name}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>아이디</S.Label>
							<S.Value>{roomTour?.user?.userId}</S.Value>
						</S.InfoRow>
					</S.SubSection>
				</S.Section>
				
				{/* 버튼 */}
				<S.ButtonRow>
					{master && status === "PENDING" ? <>
						<Square text="거절" onClick={() => openConfirm("delete")} status={false} width="48%"/>
						<Square text="수락" onClick={() => openConfirm("sure")} status={true} width="48%"/>
					</> :
						<Square text="확인" onClick={closeModal} status={true} width="100%"/>}
				</S.ButtonRow>
			</S.ModalContainer>
			<ConfirmRejectModal
				onConfirm={close}
				type={"룸투어"}
			/>
		</Modal>
	);
}