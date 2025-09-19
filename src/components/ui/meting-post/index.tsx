import * as S from "./style"
import Post from "@/components/ui/post";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";

export default function MeetingPost({isModal, groupId}: { isModal: boolean, groupId: string }) {
	
	const {data: meetingPost} = useQuery(MeetingQueries.GET_MEETING_POST, {
		variables: {
			groupId: groupId
		},
		skip: !groupId,
	})
	
	const posts = meetingPost?.getGroupPosts
	return (
		<S.MetingPostContainer isModal={isModal}>
			{posts && posts.map((post : {postId : string,
				thumbnail : string}) => (
				<Post key={post.postId} post={post}/>
			))}
		</S.MetingPostContainer>
	)
}