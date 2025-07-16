import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {useModalStore} from "@/store/modal";
import {useRouter, useSearchParams} from "next/navigation";
import Modal from "@/components/layout/modal";

export default function LeaveModal() {
	const {close} = useModalStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const name = searchParams.get('name');
	const number = searchParams.get('number');
	const modalClose = () => {
		close();
		router.push('/myHouse', {scroll: false});
	}
	return name && number && (
		<Modal>
			<S.Container>
				<S.Title>계약 <span>종료</span></S.Title>
				<S.Text>{name}님이 계 {number} 계약을 종료할까요?</S.Text>
				<S.ButtonContainer>
					<S.CancelBtn onClick={modalClose} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={"계약 종료"} onClick={() => {
					}} status={true} width={"100%"}/>
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}