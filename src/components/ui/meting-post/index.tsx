import * as S from "./style"
import Post from "@/components/ui/post";
import {useMeetingStore} from "@/store/meetingData";

export default function MeetingPost({isModal}: { isModal: boolean }) {
	const {meeting} = useMeetingStore()
	return (
		<S.MetingPostContainer isModal={isModal}>
			{meeting?.post.map(post => (
				<Post key={post.id} post={post}/>
			))}
		</S.MetingPostContainer>
	)
}