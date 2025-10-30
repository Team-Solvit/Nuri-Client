"use client"

import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import { useModalStore } from "@/store/modal";
import Modal from "@/components/layout/modal";
import {useAlertStore} from "@/store/alert";
import {BoardingHouseService} from "@/services/boardingHouse";
import {useApollo} from "@/lib/apolloClient";
import {useState} from "react";

export default function LeaveModal({ boarders, contractId, roomRefetch }: {
	boarders: { boarderName: string, roomName: string }[],
	contractId: string,
	roomRefetch: () => void
}) {
	const {close} = useModalStore();
	const {error, success} = useAlertStore();
	const [isLoading, setIsLoading] = useState(false);
	const modalClose = () => {
		close();
	}
	const client = useApollo()
	const endContract = async () => {
		setIsLoading(true);
		try {
			const res = await BoardingHouseService.endBoardingRoomContract(
				client,
				contractId
			)
			if (res) {
				roomRefetch()
				modalClose()
				success("계약 종료에 성공하였습니다.");
			} else {
				error("계약 종료에 실패하였습니다.");
			}
		} catch {
			error("계약 종료에 실패하였습니다.")
		} finally {
			setIsLoading(false);
		}
	}
	return (Array.isArray(boarders) && boarders.length > 0) && (
		<Modal>
			<S.Container>
				<S.Title>계약 <span>종료</span></S.Title>
				<S.Text>
					{boarders.map((b) => `${b.boarderName}님`).join(", ")}의 {boarders?.[0]?.roomName ?? ""} 계약을 종료할까요?
				</S.Text>
				<S.ButtonContainer>
					<S.CancelBtn onClick={isLoading ? undefined : modalClose} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={"계약 종료"} onClick={endContract} status={!isLoading} width={"100%"} isLoading={isLoading}/>
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}