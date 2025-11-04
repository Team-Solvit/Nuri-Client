import Modal from "@/components/layout/modal";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Image from "next/image";
import {useMessageModalStore} from "@/store/messageModal";
import {useConfirmStore} from "@/store/confirm";
import {ConfirmRejectModal} from "./ConfirmRejectModal";
import {convertToContractString} from "@/utils/periodCarculate";
import {isContract} from "@/types/message";
import {imageCheck} from "@/utils/imageCheck";

export default function ContractModal() {
	const {isOpen, messageType, master, close, contractData} = useMessageModalStore();
	const { openConfirm} = useConfirmStore();

	const closeModal = () => {
		close();
	}
	
	const handleAccept = () => {
		openConfirm("sure");
	}
	const handleReject = () => {
		openConfirm("delete");
	}

	return isOpen && messageType === "contract" && isContract(contractData) && (
		<Modal>
			<S.ModalContainer>
				{/* 이미지 */}
				<S.TopImageWrapper>
					<Image
						src={imageCheck(contractData?.thumbnail) || "/post/default.png"}
						alt="계약 이미지"
						fill
						style={{objectFit: "cover"}}
						priority
					/>
				</S.TopImageWrapper>
				
				{/* 계약 정보 */}
				<S.Section>
					<S.SectionTitle>계약정보</S.SectionTitle>
					
					{/* 하숙집 */}
					<S.SubSection>
						<S.SubTitle>하숙집</S.SubTitle>
						<S.InfoRow>
							<S.Label>이름</S.Label>
							<S.Value>{contractData?.roomName}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>기간</S.Label>
							<S.Value>{convertToContractString([ contractData?.contractPeriod || 0])}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>위치</S.Label>
							<S.Value>{contractData?.area}</S.Value>
						</S.InfoRow>
						<S.InfoRow>
							<S.Label>가격</S.Label>
							<S.PriceBox>
								<S.PriceUnit>월</S.PriceUnit>
								<S.PriceValue>{contractData?.price}</S.PriceValue>
							</S.PriceBox>
						</S.InfoRow>
					</S.SubSection>
					<S.SubSection>
						<S.SubTitle>하숙생</S.SubTitle>
						<S.InfoRow>
							<S.Label>이름</S.Label>
							<S.Value>{contractData?.boarderName}</S.Value>
						</S.InfoRow>
						{/*<S.InfoRow>*/}
						{/*	<S.Label>성별</S.Label>*/}
						{/*	<S.Value>{user.gender}</S.Value>*/}
						{/*</S.InfoRow>*/}
					</S.SubSection>
				</S.Section>
				
				{/* 버튼 */}
				<S.ButtonRow>
					{master ?
						<>
							<Square text="거절" onClick={handleReject} status={false} width="48%"/>
							<Square text="수락" onClick={handleAccept} status={true} width="48%"/>
						</> : <Square text="확인" onClick={closeModal} status={true} width="100%"/>
					}
				</S.ButtonRow>
			</S.ModalContainer>
			<ConfirmRejectModal
				onConfirm={close}
				type={"계약"}
			/>
		</Modal>
	);
}