"use client"

import * as S from "./style"
import Image from "next/image";
import BannerImg from "@/assets/meeting/banner.png"
import Square from "@/components/ui/button/square";
import MeetingProfile from "@/assets/meeting/profile.png";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import MeetingCalender from "@/components/ui/meeting-calender";
import {MeetingMember} from "@/components/ui/meeting-member";
import {MeetingProps} from "./type";
import {Nav} from "@/containers/meetings/MeetingModal/ui";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";

export default function Meeting(meeting: MeetingProps) {
	const [selected, setSelected] = useState(1);
	const {setFind} = useOtherMeetingFind();
	
	const handleBack = () => {
		setFind(true);
	}
	const {meetingId} = useSelectOtherMeetingDetailStore()
	const {data: meetingInfo} = useQuery(MeetingQueries.GET_MEETING_INFO, {
		variables: {
			groupId: meetingId
		}
	})
	console.log('모임 정보(meetingInfo):', meetingInfo)
	
	return (
		<S.ModalContainer>
			<S.Banner>
				<Image style={{objectFit: "cover"}} src={BannerImg} alt={"banner"} fill/>
				<S.Gradient/>
				<S.BackBtnBox>
					<Square text={"다른 모임 둘러보기"} onClick={handleBack} status={true} width={"max-content"}/>
				</S.BackBtnBox>
			</S.Banner>
			<S.Content>
				<S.TitleBox>
					<S.Info>
						<S.ImgBox>
							<Image src={MeetingProfile} alt="meeting" fill/>
						</S.ImgBox>
						<S.Name>
							<h3>{meeting.title}</h3>
							<p>{meeting.location}</p>
						</S.Name>
					</S.Info>
				</S.TitleBox>
				<S.Description>
					{meeting.description || "모임 설명이 없습니다."}
				</S.Description>
			</S.Content>
			<Nav selected={selected} setSelected={setSelected}/>
			{selected === 1 && <MeetingPost groupId={1} isModal={true}/>}
			{selected === 1 && <S.BtnBox>
        <Square text={"게시물 작성"} status={true} width={"calc(84.5vw - 10rem)"} onClick={() => {
				}}/>
      </S.BtnBox>}
			{selected === 2 && <MeetingCalender groupId={meetingId}/>}
			{selected === 3 && <MeetingMember groupId={meetingId}/>}
		</S.ModalContainer>
	)
}