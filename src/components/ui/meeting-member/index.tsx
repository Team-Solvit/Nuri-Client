import * as S from "./style"
import Profile from "@/assets/meeting/member-profile.png"
import Image from "next/image"
import {useRouter} from "next/navigation";

export const MeetingMember = () => {
	const fakeData = [
		{id: 1, name: "test1", "게시물": 0, "팔로워": 0, "팔로우": 0},
		{id: 2, name: "test2", "게시물": 0, "팔로워": 0, "팔로우": 0},
		{id: 3, name: "test3", "게시물": 0, "팔로워": 0, "팔로우": 0},
		{id: 4, name: "test4", "게시물": 0, "팔로워": 0, "팔로우": 0},
	]
	const router = useRouter();
	const memberClick = (id: number) => {
		router.push(`/user/${id}`)
	}
	return (
		<S.MeetingMemberContainer>
			{fakeData.map(member => (
				<S.Member key={member.id} onClick={() => memberClick(member.id)}>
					<S.ImgBox>
						<Image src={Profile} alt="meeting" fill/>
					</S.ImgBox>
					<S.NameBox>
						<S.Name>{member.name}</S.Name>
						<S.Count>게시물 {member["게시물"]} 팔로워 {member["팔로워"]} 팔로우 {member["팔로우"]}</S.Count>
					</S.NameBox>
				</S.Member>
			))}
		</S.MeetingMemberContainer>
	)
}