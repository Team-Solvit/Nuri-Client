import * as S from '@/styles/confirm'
import Square from "@/components/ui/button/square";
import { AccessionProps } from "@/containers/meetings/accession/type";
import { useModalStore } from "@/store/modal";
import { useMutation } from "@apollo/client";
import { MeetingMutations } from "@/services/meeting";
import { useLoadingEffect } from "@/hooks/useLoading";
import { useAlertStore } from "@/store/alert";
import { useIsEnteringMeetingStore } from "@/store/isEnteringMeeting";
import { usePermissionGuard } from "@/hooks/usePermissionGuard";
import { useUserStore } from "@/store/user";

export default function Accession({ isAccession, setIsAccession, accessions }: AccessionProps) {
	const { isEnteringMeeting, isSendRequest } = useIsEnteringMeetingStore()
	const { role } = useUserStore()
	const { withPermission } = usePermissionGuard()
	const modalClose = () => {
		setIsAccession(false)
	}
	const { close } = useModalStore();
	const [mutate, { loading }] = useMutation(MeetingMutations.JOIN_MEETING_REQUEST, {
		variables: {
			groupJoinInput: {
				groupId: accessions.groupId,
				requestMessage: "default"
			}
		}
	})
	const { error, success } = useAlertStore()
	const [leaveMeeting] = useMutation(MeetingMutations.LEAVE_MEETING)
	useLoadingEffect(loading);
	const handelRouter = async () => {
		// 제3자 계정 검증
		if (role === 'THIRD_PARTY') {
			error("제3자 계정은 모임 가입 신청을 할 수 없습니다.")
			setIsAccession(false)
			close()
			return;
		}
		
		try {
			if (isEnteringMeeting) {
				await leaveMeeting();
			}
			await mutate()
			success("모임 신청에 성공하였습니다.")
		} catch {
			error("모임 신청에 실패하였습니다.")
		}
		setIsAccession(false)
		close()
	}
	
	const handleButtonClick = () => {
		// 모달을 먼저 닫고 로그인 검증
		setIsAccession(false)
		close()
		withPermission(handelRouter)
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
					<S.Text>
						{isEnteringMeeting && "현재 가입중인 모임을 탈퇴하시고,"}
						{isSendRequest && (
							<>
								현재 {isSendRequest} 모임에 <span>요청을 보내신 상태</span>입니다.
								<br />
								이전에 보냈던 요청을 취소하시고
							</>
						)}
						<br />
						{accessions.name} 모임에 참여하시겠습니까?
					</S.Text>
					<S.ButtonContainer>
						<S.CancelBtn onClick={modalClose} $width={"100%"}>
							<S.Name>취소</S.Name>
						</S.CancelBtn>
						<Square
							text={"가입"}
							onClick={handleButtonClick}
							status={true}
							width={"100%"}
							isLoading={loading}
						/>
					</S.ButtonContainer>
				</S.Container>
			</S.Content>
		</S.Black>
	)
}