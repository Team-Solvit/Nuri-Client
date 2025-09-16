import * as S from "./style"
import Profile from "@/assets/meeting/member-profile.png"
import Image from "next/image"
import Square from "@/components/ui/button/square";
import React from "react";
import {useModalStore} from "@/store/modal";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useMutation, useQuery} from "@apollo/client";
import {MeetingMutations, MeetingQueries} from "@/services/meeting";
import {useUserStore} from "@/store/user";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useLoadingEffect} from "@/hooks/useLoading";
interface MeetingMemberType {
	userId: string;
	name: string;
	profile: string;
	joinedAt : string;
}

export const MeetingMember = ({groupId}: { groupId: string }) => {
	const navigate = useNavigationWithProgress();
	const memberClick = (id: string) => {
		navigate(`/profile/${id}`)
	}
	const {open} = useModalStore();
	const leaveCheck = (e: React.MouseEvent) => {
		e.stopPropagation();
		open();
	}
	
	const {data: meetingMember, loading} = useQuery(MeetingQueries.GET_MEETING_MEMBER, {
		variables: {
			groupId: groupId
		},
		skip: !groupId,
	})
	
	const {id} = useUserStore()
	const {find} = useOtherMeetingFind()
	const [leaveMeeting] = useMutation(MeetingMutations.LEAVE_MEETING);
	useLoadingEffect(loading)
	return (
		<S.MeetingMemberContainer>
			{loading ?
				 <p>불러오는 중 입니다....</p>
				: meetingMember?.getGroupMembers && meetingMember?.getGroupMembers?.length > 0 ? meetingMember?.getGroupMembers?.map((member : MeetingMemberType) => (
						<S.Member
							key={member.userId}
							onClick={() => memberClick(member.userId)}
							role="button"
							tabIndex={0}
						>
							<S.ImgBox>
								<Image src={Profile} alt="meeting" fill/>
							</S.ImgBox>
							<S.NameBox>
								<S.Name>{member.name}</S.Name>
								{/*<S.Count>게시물 {member["게시물"]} 팔로워 {member["팔로워"]} 팔로우 {member["팔로우"]}</S.Count>*/}
								{member.userId === id && !find &&
                  <S.Leave onClick={(e) => leaveCheck(e)}>
                    <Square text={"탈퇴"} onClick={() => {
											leaveMeeting();
										}} status={true} width={"max-content"}/>
                  </S.Leave>}
							</S.NameBox>
						</S.Member>
					))
					: <p>모임원이 존재하지 않습니다.</p>
			}
		</S.MeetingMemberContainer>
	)
}