import * as S from "./style"
import Post from "@/components/ui/post";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";

export default function MeetingPost({isModal, groupId}: { isModal: boolean, groupId: number }) {
	
	const {data: meetingPost} = useQuery(MeetingQueries.GET_MEETING_POST, {
		variables: {
			groupId: 1
		}
	})
	console.log('모임 게시물(meetingPost):', meetingPost) // 모임 게시물(meetingPost) 데이터 출력
	
	const fakeData = [
		{
			id: 1,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 2,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 3,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 4,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 5,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 6,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 7,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 8,
			thumbnail: '/post/post-example.png',
		},
		{
			id: 9,
			thumbnail: '/post/post-example.png',
		},
	]
	return (
		<S.MetingPostContainer isModal={isModal}>
			{fakeData.map(post => (
				<Post key={post.id} post={post}/>
			))}
		</S.MetingPostContainer>
	)
}