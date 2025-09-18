

import * as S from "./style"
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import Square from "@/components/ui/button/square";

export default function BackMeetingRoomBtn() {
	const {find, setFind} = useOtherMeetingFind()
	const {meetingId} = useSelectOtherMeetingDetailStore()
	const navigate = useNavigationWithProgress()
	const handleBack = () => {
		setFind(true)
		navigate(`/meetings/${meetingId}`)
	}
	if(!find) return null;
	return(
		<S.BackMeetingRoomBtnContainer>
			<Square text={"뒤로가기"} status={true} width={"100px"} onClick={handleBack} />
		</S.BackMeetingRoomBtnContainer>
	)
}