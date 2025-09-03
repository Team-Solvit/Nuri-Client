import * as S from "./style"
import Profile from "@/assets/meeting/member-profile.png"
import Image from "next/image"
import Square from "@/components/ui/button/square";
import React from "react";
import {useModalStore} from "@/store/modal";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useMeetingStore} from "@/store/meetingData";

export const MeetingMember = ({isMember}: { isMember: boolean }) => {
	const {meeting} = useMeetingStore()
	const navigate = useNavigationWithProgress();
	const memberClick = (id: number) => {
		navigate(`/profile/${id}`)
	}
	const {open} = useModalStore();
	const leaveCheck = (e: React.MouseEvent) => {
		e.stopPropagation();
		open();
	}
	return (
		<S.MeetingMemberContainer>
			{meeting?.member?.map(member => (
				<S.Member
					key={member.id}
					onClick={() => memberClick(member.id)}
					role="button"
					tabIndex={0}
				>
					<S.ImgBox>
						<Image src={Profile} alt="meeting" fill/>
					</S.ImgBox>
					<S.NameBox>
						<S.Name>{member.name}</S.Name>
						<S.Count>게시물 {member["게시물"]} 팔로워 {member["팔로워"]} 팔로우 {member["팔로우"]}</S.Count>
						{isMember &&
              <S.Leave onClick={(e) => leaveCheck(e)}>
                <Square text={"탈퇴"} onClick={() => {
								}} status={true} width={"max-content"}/>
              </S.Leave>}
					</S.NameBox>
				</S.Member>
			))}
		</S.MeetingMemberContainer>
	)
}