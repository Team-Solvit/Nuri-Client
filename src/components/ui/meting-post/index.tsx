import * as S from "./style"
import Post from "@/components/ui/post";

export default function MeetingPost({isModal}: { isModal: boolean }) {
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