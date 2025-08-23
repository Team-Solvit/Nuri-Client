import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {useModalStore} from "@/store/modal";
import Modal from "@/components/layout/modal";
import {useMutation} from "@apollo/client";
import {BoardingHouseMutations} from "@/services/boardingHouse";

export default function LeaveModal({boarders}: { boarders: { boarderName: string, roomName: string }[] }) {
	const {close} = useModalStore();
	const modalClose = () => {
		close();
	}
	const [endContract, {data, loading, error}] = useMutation(BoardingHouseMutations.END_BOARDING_ROOM_CONTRACT);
	console.log(data)
	console.log(loading)
	console.log(error)
	return boarders && (
		<Modal>
			<S.Container>
				<S.Title>계약 <span>종료</span></S.Title>
				<S.Text>
					{boarders.map((item, idx) =>
						idx === boarders.length - 1 ? item.boarderName + "님" : item.boarderName + "님, ")}
					의 {boarders[0].roomName} 계약을 종료할까요?</S.Text>
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