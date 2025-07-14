import * as S from "@/styles/confirm"
import Modal from "@/components/layout/modal";
import Square from "@/components/ui/button/square";
import {useModalStore} from "@/store/modal";

export default function MeetingLeave() {
	const {close} = useModalStore();
	return (
		<Modal>
			<S.Container>
				<S.Title>모임 <span>탈퇴</span></S.Title>
				<S.Text>모임에서 탈퇴하시겠습니까?</S.Text>
				<S.ButtonContainer>
					<S.CancelBtn onClick={close} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={"탈퇴"} onClick={() => {
					}} status={true} width={"100%"}/>
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}