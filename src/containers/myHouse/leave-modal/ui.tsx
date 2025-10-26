import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {useModalStore} from "@/store/modal";
import Modal from "@/components/layout/modal";
import {useAlertStore} from "@/store/alert";
import {BoardingHouseService} from "@/services/boardingHouse";
import {useApollo} from "@/lib/apolloClient";

export default function LeaveModal({boarders, contractId, roomRefetch}: {
	boarders: { boarderName: string, roomName: string }[],
	contractId: string,
	roomRefetch : () => void
}) {
	const {close} = useModalStore();
	const {error, success} = useAlertStore();
	const modalClose = () => {
		close();
	}
	const client = useApollo()
	const endContract = async () => {
		try {
			const res = await BoardingHouseService.endBoardingRoomContract(
				client,
				contractId
			)
			if (res) {
				roomRefetch()
				success("계약 종료에 성공하였습니다.");
			} else {
				error("계약 종료에 실패하였습니다.");
			}
		} catch (e) {
			console.log(e)
			error("계약 종료에 실패하였습니다.")
		}finally {
			modalClose()
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
					<S.CancelBtn onClick={modalClose} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={"계약 종료"} onClick={endContract} status={true} width={"100%"}/>
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}