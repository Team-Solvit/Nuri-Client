import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import {AccessionProps} from "@/containers/meetings/accession/type";
import React from "react";
import {useModalStore} from "@/store/modal";
import {useMutation} from "@apollo/client";
import {MeetingMutations} from "@/services/meeting";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useAlertStore} from "@/store/alert";

export default function Accession({isAccession, setIsAccession, accessions}: AccessionProps) {
	const modalClose = () => {
		setIsAccession(false)
	}
	const {close} = useModalStore();
	const [mutate, {loading}] = useMutation(MeetingMutations.JOIN_MEETING_REQUEST, {
		variables: {
			groupJoinInput: {
				groupId : accessions.id,
				requestMessage : ""
			}
		}
	})
	const {error, success} = useAlertStore()
	useLoadingEffect(loading);
	const handelRouter = async () => {
		try{
			await mutate()
			success("모임 신청에 성공하였습니다.")
		}catch (err){
			console.log(err)
			error("모임 신청에 실패하였습니다.")
		}
		setIsAccession(false)
		close()
	}
	if (!isAccession) return null
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
					<S.Text>{accessions.title} 모임에 참여하시겠습니까?</S.Text>
					<S.ButtonContainer>
						<S.CancelBtn onClick={modalClose} $width={"100%"}>
							<S.Name>취소</S.Name>
						</S.CancelBtn>
						<Square text={"가입"} onClick={handelRouter} status={true} width={"100%"}/>
					</S.ButtonContainer>
				</S.Container>
			</S.Content>
		</S.Black>
	)
}