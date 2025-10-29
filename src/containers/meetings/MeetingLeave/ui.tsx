import * as S from "@/styles/confirm"
import Modal from "@/components/layout/modal";
import Square from "@/components/ui/button/square";
import { useModalStore } from "@/store/modal";
import { useMutation } from "@apollo/client";
import { MeetingMutations, MeetingQueries } from "@/services/meeting";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useLoadingEffect } from "@/hooks/useLoading";

export default function MeetingLeave() {
	const { close } = useModalStore();
	const [leaveMeeting, { loading }] = useMutation(MeetingMutations.LEAVE_MEETING, {
		refetchQueries: [MeetingQueries.GET_MEETING_STATUS],
		awaitRefetchQueries: true,
	});
	useLoadingEffect(loading);
	const navigate = useNavigationWithProgress()
	const handleLeave = async () => {
		if (loading) return;
		try {
			await leaveMeeting()
			close()
			navigate("/meetings")
		} catch {
		}
	}
	return (
		<Modal>
			<S.Container>
				<S.Title>모임 <span>탈퇴</span></S.Title>
				<S.Text>모임에서 탈퇴하시겠습니까?</S.Text>
				<S.ButtonContainer>
					<S.CancelBtn onClick={close} $width={"100%"}>
						<S.Name>취소</S.Name>
					</S.CancelBtn>
					<Square text={loading ? "로딩중..." : "탈퇴"} onClick={handleLeave} status={!loading} width={"100%"} />
				</S.ButtonContainer>
			</S.Container>
		</Modal>
	)
}