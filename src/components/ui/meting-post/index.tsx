import * as S from "./style"
import Post from "@/components/ui/post";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {useLoadingEffect} from "@/hooks/useLoading";

export default function MeetingPost({isModal, groupId}: { isModal: boolean, groupId: string }) {
	
	const {data: meetingPost, loading} = useQuery(MeetingQueries.GET_MEETING_POST, {
		variables: {
			groupId: groupId
		},
		skip: !groupId,
	})
	useLoadingEffect(loading)
	const posts = meetingPost?.getGroupPosts
	return (
		<S.MetingPostContainer isModal={isModal}>
			{loading ?
				<p>게시물을 불러오고 있습니다...</p> :
				posts && posts.length > 0 ? posts.map((post : {postId : string,
				thumbnail : string}) => (
				<Post key={post.postId} post={post}/>
			)) : <p>게시물이 존재하지 않습니다.</p>}
		</S.MetingPostContainer>
	)
}