import Modal from "@/components/layout/modal";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Image from "next/image";
import {roomTourData, visitorData} from "./data";
import {useMessageModalStore} from "@/store/messageModal";
import {useModalStore} from "@/store/modal";
import MapIcon from "@/assets/icon/map.svg"

export default function RoomTourModal() {
	const {isOpen, master, messageType, close} = useMessageModalStore();
	const {close: closeModalState} = useModalStore();
	const closeModal = () => {
		close()
		closeModalState();
	}
	return isOpen && messageType === "roomtour" && (
		<Modal>
			<S.ModalContainer>
				{/* 이미지 */}
				<S.TopImageWrapper>
					<Image
						src={MapIcon}
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
							<S.Value>{roomTourData.houseName}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>날짜</S.Label>
							<S.Value>{roomTourData.date}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>시간</S.Label>
							<S.Value>{roomTourData.time}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>연락처</S.Label>
							<S.Value>{roomTourData.contact}</S.Value>
						</S.InfoRow>
					</S.SubSection>
					
					{/* 방문자 */}
					<S.SubSection>
						<S.SubTitle>방문자</S.SubTitle>
						<S.InfoRow>
							<S.Label>이름</S.Label>
							<S.Value>{visitorData.name}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>아이디</S.Label>
							<S.Value>{visitorData.id}</S.Value>
						</S.InfoRow>
					</S.SubSection>
				</S.Section>
				
				{/* 버튼 */}
				<S.ButtonRow>
					{master ? <>
						<Square text="거절" onClick={() => {
						}} status={false} width="48%"/>
						<Square text="수락" onClick={() => {
						}} status={true} width="48%"/>
					</> : <Square text="확인" onClick={() => {
						closeModal()
					}} status={true} width="100%"/>}
				</S.ButtonRow>
			</S.ModalContainer>
		</Modal>
	);
}