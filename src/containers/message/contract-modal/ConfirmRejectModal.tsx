import React from 'react';
import Square from "@/components/ui/button/square";
import styled from "@emotion/styled";
import {colors, fontSizes} from "@/styles/theme";
import {useConfirmStore} from "@/store/confirm";
import {useAlertStore} from "@/store/alert";
import {useMutation} from "@apollo/client";
import {ContractMutations} from "@/services/contract";
import {RoomTourMutations} from "@/services/roomTour";

const Black = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  gap: 0.5rem;
`;


export const Title = styled.h3`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};

  & > span {
    color: ${colors.primary};
  }
`
export const Text = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`
export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
`

interface ConfirmRejectModalProps {
	onConfirm: () => void;
	type: '결제' | '룸투어'
}

export const ConfirmRejectModal: React.FC<ConfirmRejectModalProps> = ({
	                                                                      onConfirm,
	                                                                      type
                                                                      }) => {
	const {isOpen, type : status, closeConfirm : onClose} = useConfirmStore()
	const {error, success} = useAlertStore();
	const [acceptContract] = useMutation(ContractMutations.ACCEPT_CONTRACT, {
			onCompleted: () => {
				success("계약에 성공하였습니다.")
				onConfirm();
				onClose();
			},
			onError: (err) => {
				error(err.message)
			}
		}
	);
	const [rejectContract] = useMutation(ContractMutations.REJECT_CONTRACT, {
		onCompleted: () => {
			success("계약을 반려하였습니다.")
			onConfirm();
			onClose();
		},
		onError: (err) => {
			error(err.message)
		}
	})
	const [rejectRoomTour] = useMutation(RoomTourMutations.REJECT_ROOM_TOUR, {
		onCompleted: () => {
			success("룸투어에 성공하였습니다.")
			onConfirm();
			onClose();
		},
		onError: (err) => {
			error(err.message)
		}
	})
	const [acceptRoomTour] = useMutation(RoomTourMutations.ACCEPT_ROOM_TOUR, {
		onCompleted : () =>{
			onConfirm();
			onClose();
			success("룸투어 반려에 성공하였습니다.")
		},
		onError : (err) =>{
			error(err.message)
		}
	})
	const handleBtnClick = async (check : "수락" | "거절") =>{
		if(type === "룸투어"){
			if(check === "수락") await acceptRoomTour();
			else if(check === "거절") await rejectRoomTour();
		}
		else if(type === "결제"){
			if(check === "수락") await acceptContract();
			else if(check === "거절") await rejectContract();
		}
	}
	if (!isOpen) return null;
	
	return (
		<Black onClick={onClose}>
			<Content onClick={(e) => e.stopPropagation()}>
				<Title>
					{status === "sure" && {type} + "수락"}
					{status === "delete" && {type} + "거절"}
				</Title>
				<Text>{status === "sure" ? "정말 수락하시겠습니까?" : "정말 거절하시겠습니까?"}</Text>
				<ButtonContainer>
					<Square
						text="취소"
						onClick={()=>handleBtnClick("거절")}
						status={false}
						width="100%"
					/>
					<Square
						text="확인"
						onClick={() => handleBtnClick("수락")}
						status={true}
						width="100%"
					/>
				</ButtonContainer>
			</Content>
		</Black>
	);
};
