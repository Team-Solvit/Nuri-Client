import * as S from "./style"
import Image from "next/image"
import Square from "@/components/ui/button/square";
import React from "react";
import {useModalStore} from "@/store/modal";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import { useQuery} from "@apollo/client";
import { MeetingQueries} from "@/services/meeting";
import {useUserStore} from "@/store/user";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useLoadingEffect} from "@/hooks/useLoading";
interface MeetingMemberType {
	userId: string;
	name: string;
	profile: string;
	joinedAt: string;
	role: "USER" | "INTERNATIONAL_STUDENT" | "HOST" | "THIRD_PARTY";
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
	
	const {userId} = useUserStore()
	const {find} = useOtherMeetingFind()
	
	useLoadingEffect(loading)

	const roleLabels: Record<string, string> = {
		USER: "회원",
		INTERNATIONAL_STUDENT: "유학생",
		HOST: "호스트",
		THIRD_PARTY: "관리자"
	}
	const getRoleLabel = (role?: string) => role ? (roleLabels[role] ?? role) : ""

	return (
		<S.MeetingMemberContainer>
			{loading ?
				 <p>불러오는 중 입니다....</p>
				: meetingMember?.getGroupMembers && meetingMember?.getGroupMembers?.length > 0 ? meetingMember?.getGroupMembers?.map((member : MeetingMemberType) => {
						const profileSrc: string =
							!member?.profile
								? "/post/default.png"
								: /^https?:\/\//.test(member.profile)
									? member.profile
									: `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${member.profile}`;
					return (
						<S.Member
							key={member.userId}
							onClick={() => memberClick(member.userId)}
							role="button"
							tabIndex={0}
						>
							<S.ImgBox>
								<Image style={{objectFit: "cover"}} src={profileSrc} alt="meeting" fill/>
							</S.ImgBox>
							<S.NameBox>
								<S.Name>{member.name}</S.Name>
								{/* role 표시 추가 */}
								<S.Role>{getRoleLabel(member.role)}</S.Role>
								{member.userId === userId && !find &&
				                  <S.Leave onClick={(e) => leaveCheck(e)}>
				                    <Square text={"탈퇴"} status={true} width={"max-content"}/>
				                  </S.Leave>}
							</S.NameBox>
						</S.Member>
					)
					})
					: <p>모임원이 존재하지 않습니다.</p>
			}
		</S.MeetingMemberContainer>
	)
}