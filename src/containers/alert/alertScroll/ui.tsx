import * as S from "./style"
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"

export default function AlertScroll() {
	const fakeData = [
		{id: 1, title: "알림 제목", content: "알림 내용"},
		{id: 2, title: "알림 제목", content: "알림 내용"},
		{id: 3, title: "알림 제목", content: "알림 내용"},
		{id: 4, title: "알림 제목", content: "알림 내용"},
		{id: 5, title: "알림 제목", content: "알림 내용"},
		{id: 6, title: "알림 제목", content: "알림 내용"},
		{id: 7, title: "알림 제목", content: "알림 내용"},
		{id: 8, title: "알림 제목", content: "알림 내용"},
		{id: 9, title: "알림 제목", content: "알림 내용"},
		{id: 10, title: "알림 제목", content: "알림 내용"},
		{id: 11, title: "알림 제목", content: "알림 내용"},
	]
	return (
		<S.AlertScrollContainer>
			{fakeData.map(alert => (
				<S.Alert key={alert.id}>
					<S.Profile>
						<Image src={Profile} alt="profile" fill/>
					</S.Profile>
					<S.Info>
						<S.Title>{alert.title}</S.Title>
						<S.Content>{alert.content}</S.Content>
					</S.Info>
				</S.Alert>
			))}
		</S.AlertScrollContainer>
	)
}