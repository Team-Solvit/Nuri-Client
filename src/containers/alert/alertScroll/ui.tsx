import * as S from "./style"
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"

export default function AlertScroll() {
	const fakeData = [
		{id: 1, title: "알림 제목"},
		{id: 2, title: "알림 제목"},
		{id: 3, title: "알림 제목"},
		{id: 4, title: "알림 제목"},
		{id: 5, title: "알림 제목"},
		{id: 6, title: "알림 제목"},
		{id: 7, title: "알림 제목"},
		{id: 8, title: "알림 제목"},
		{id: 9, title: "알림 제목"},
		{id: 10, title: "알림 제목"},
		{id: 11, title: "알림 제목"},
	]
	return (
		<S.AlertScrollContainer>
			{fakeData.map(alert => (
				// onClick 을 나중에 서버에서주는 알림 타입에따라 바꿔야함
				<S.Alert key={alert.id} onClick={() => console.log(alert.id)}>
					<S.Profile>
						<Image src={Profile} alt="profile" fill/>
					</S.Profile>
					<S.Info>
						<S.Title>{alert.title}</S.Title>
					</S.Info>
				</S.Alert>
			))}
		</S.AlertScrollContainer>
	)
}