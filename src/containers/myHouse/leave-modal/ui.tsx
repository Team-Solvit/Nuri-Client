import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {useModalStore} from "@/store/modal";
import Modal from "@/components/layout/modal";

export default function LeaveModal({name, number}: { name: string, number: string }) {
	const {close} = useModalStore();
	
	return name && number && (
		<Modal>
			<S.Container>
				<S.Title>계약 <span>종료</span></S.Title>
				<S.Text>{name}님의 {number} 계약을 종료할까요?</S.Text>
				<S.ButtonContainer>
					<S.CancelBtn onClick={close} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={"계약 종료"} onClick={() => {
					}} status={true} width={"100%"}/>
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}