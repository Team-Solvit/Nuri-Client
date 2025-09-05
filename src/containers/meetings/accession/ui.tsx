import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {AccessionProps} from "@/containers/meetings/accession/type";
import React from "react";
import NProgress from "nprogress";
import {useModalStore} from "@/store/modal";
import {useOtherMeetingFind} from '@/store/otherMeetingFind';
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import { useSearchParams} from "next/navigation";
import {useMeetingStore} from "@/store/meetingData";

export default function Accession({isAccession, setIsAccession, accessions}: AccessionProps) {
	const modalClose = () => {
		setIsAccession({status : false, idx : null})
	}
	const [id] = useSearchParams().getAll("id");
	const navigate = useNavigationWithProgress();
	const {close} = useModalStore();
	const {setFind} = useOtherMeetingFind();
	const {select} = useMeetingStore()
	const handelRouter = (id: number) => {
		navigate(`/meetings/${id}`)
		if (!isAccession?.idx) return;
		select(accessions[Number(id)-2])
		setIsAccession({
			status : false,
			idx : null
		})
		NProgress.start()
		setFind(false);
		close()
	}
	if (!isAccession.status || !id) return null
	return (
		<S.Black
			onClick={modalClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabIndex={-1}
		>
			<S.Content onClick={(e) => e.stopPropagation()}>
				<S.Container>
					<S.Title>모임 가입</S.Title>
					<S.Text>{accessions[Number(id)-1]?.title} 모임에 참여하시겠습니까?</S.Text>
					<S.ButtonContainer>
						<S.CancelBtn onClick={modalClose} $width={"100%"}>
							<S.Name>취소</S.Name>
						</S.CancelBtn>
						<Square text={"가입"} onClick={() => {
							handelRouter(accessions[Number(id)]?.id)
						}} status={true} width={"100%"}/>
					</S.ButtonContainer>
				</S.Container>
			</S.Content>
		</S.Black>
	)
}