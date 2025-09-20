"use client"

import * as S from "./style"
import Image from "next/image";
import Square from "@/components/ui/button/square";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import MeetingCalender from "@/components/ui/meeting-calendar";
import {MeetingMember} from "@/components/ui/meeting-member";
import {Nav} from "@/containers/meetings/MeetingModal/ui";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import {useParams} from "next/navigation";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useIsMakeGroupPostStore} from "@/store/isMakeGroupPost";

export default function Meeting() {
	const [selected, setSelected] = useState(1);
	const {setFind} = useOtherMeetingFind();
	const navigate = useNavigationWithProgress();
	const handleBack = () => {
		setFind(true);
		navigate('/meetings')
	}
	const {meetingId} = useSelectOtherMeetingDetailStore()
	const params = useParams()
	const {data: meetingInfo, loading} = useQuery(MeetingQueries.GET_MEETING_INFO, {
		variables: {
			groupId: meetingId || params.id
		}
	})
	const meeting = meetingInfo?.getGroupInfo
	const {setGroup} = useIsMakeGroupPostStore()
	const handleCreatePost = () => {
		navigate(`/creating`)
		setGroup()
	}
	useLoadingEffect(loading)
	if(loading || !meeting) return null;
	return (
		<S.ModalContainer>
			<S.Banner>
				<Image style={{objectFit: "cover"}} src={meeting ? process.env.NEXT_PUBLIC_IMAGE_URL + meeting?.banner : "/post/default.png"} alt={"banner"} fill/>
				<S.Gradient/>
				<S.BackBtnBox>
					<Square text={"다른 모임 둘러보기"} onClick={handleBack} status={true} width={"max-content"}/>
				</S.BackBtnBox>
			</S.Banner>
			<S.Content>
				<S.TitleBox>
					<S.Info>
						<S.ImgBox>
							<Image src={meeting ? process.env.NEXT_PUBLIC_IMAGE_URL + meeting?.profile : "/post/default.png"} alt="meeting" fill/>
						</S.ImgBox>
						<S.Name>
							<h3>{meeting?.name}</h3>
							<p>{meeting?.area?.area}</p>
						</S.Name>
					</S.Info>
				</S.TitleBox>
				<S.Description>
					{meeting.description || "모임 설명이 없습니다."}
				</S.Description>
			</S.Content>
			<Nav isModal={false} selected={selected} setSelected={setSelected}/>
			{selected === 1 && <MeetingPost groupId={params.id as string || ""} isModal={true}/>}
			{selected === 1 && <S.BtnBox>
        <Square text={"게시물 작성"} status={true} width={"calc(84.5vw - 10rem)"} onClick={handleCreatePost} />
      </S.BtnBox>}
			{selected === 2 && <MeetingCalender groupId={params.id as string || ""}/>}
			{selected === 3 && <MeetingMember groupId={params.id as string || ""}/>}
		</S.ModalContainer>
	)
}