import * as S from "./style"
import Image from "next/image";

export default function AlertScroll() {
	const fakeData = [
		{id: 1, title: "huhon123님이 회원님을 팔로우하기 시작했습니다.", img : "/post/member-profile.png"},
		{id: 2, title: "그랜마하우스 301호 룸투어가 내일 있습니다.", img : "/post/post-example.png"},
		{id: 3, title: "회원님의 글에 5명이 좋아요를 눌렀습니다.", img : "/post/post-example2.png"},
		{id: 4, title: "subin393님이 회원님의 게시글에 댓글을 남겼습니다.", img : "/post/profile2.jpeg"},
		{id: 5, title: "zuu3님이 회원님을 팔로우하기 시작했습니다.", img : "/post/profile3.jpg"},
	]
	return (
		<S.AlertScrollContainer>
			{fakeData.map(alert => (
				// onClick 을 나중에 서버에서주는 알림 타입에따라 바꿔야함
				<S.Alert key={alert.id} onClick={() => console.log(alert.id)}>
					<S.Profile>
						<Image src={alert.img} alt="profile" fill/>
					</S.Profile>
					<S.Info>
						<S.Title>{alert.title}</S.Title>
					</S.Info>
				</S.Alert>
			))}
		</S.AlertScrollContainer>
	)
}