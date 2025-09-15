"use client"

import * as S from "./style"
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";
import Image, {StaticImageData} from "next/image";
import Square from "@/components/ui/button/square";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import {MeetingMember} from "@/components/ui/meeting-member";
import {MeetingModalProps} from "@/containers/meetings/MeetingModal/type";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import {useMeetingAccessionStore} from "@/store/meetingAccessionData";

export const Banner = ({bannerImage}: { bannerImage: string | StaticImageData }) => {
	return (
		<S.Banner>
			<Image style={{objectFit: "cover"}} src={bannerImage ? bannerImage : "/post/profile.png"} alt={"banner"} fill/>
			<S.Gradient/>
		</S.Banner>
	)
}

export const MeetingContent = (props: MeetingModalProps & {
	setIsAccessionAction: (isAccession: boolean) => void;
}) => {
	const {setAccession} = useMeetingAccessionStore()
	return (
		<S.Content>
			<S.TitleBox>
				<S.Info>
					<S.ImgBox>
						<Image src={props?.profile} alt="meeting" fill/>
					</S.ImgBox>
					<S.Name>
						<h3>{props.name}</h3>
						<p>{props.area?.area}</p>
					</S.Name>
				</S.Info>
				<S.SignBtnBox>
					<Square text={"가입"} onClick={() => {
						props.setIsAccessionAction(true)
						setAccession({
							name : props.name,
							groupId : props.groupId,
						})
					}} status={true} width={"100px"}/>
				</S.SignBtnBox>
			</S.TitleBox>
			<S.Description>
				{props.description || "모임 설명이 없습니다."}
			</S.Description>
		</S.Content>
	)
}

export const Nav = ({isModal, selected, setSelected}: { isModal: boolean, selected: number, setSelected: (id: number) => void }) => {
	return (
		<S.Nav isSelected={selected}>
			<S.PBox isModal = {isModal}>
				<p onClick={() => setSelected(1)}>게시물</p>
			</S.PBox>
			{!isModal &&
        <S.PBox isModal={isModal}>
          <p onClick={() => setSelected(2)}>일정</p>
        </S.PBox>
			}
			<S.PBox isModal = {isModal}>
				<p onClick={() => setSelected(isModal ? 2 : 3)}>모임원</p>
			</S.PBox>
		</S.Nav>
	)
}

export default function MeetingModal({
	                                     setIsAccessionAction
                                     }: {
	setIsAccessionAction: (bool: boolean) => void
}) {
	const {isOpen} = useModalStore();
	const [selected, setSelected] = useState(1);
	const {meetingId} = useSelectOtherMeetingDetailStore()
	
	const {data: meetingInfo} = useQuery(MeetingQueries.GET_MEETING_INFO, {
		variables: {
			groupId: meetingId
		},
		skip: !meetingId,
	});
	
	console.log('모임 상세 정보(meetingInfo):', meetingInfo?.getGroupInfo) // 모임 상세 정보(meetingInfo) 출력
	const meetingInfoData = meetingInfo?.getGroupInfo;
	const props = {...meetingInfoData, setIsAccessionAction};
	
	if (!isOpen) return null
	return (
		<Modal>
			<S.ModalContainer>
				<Banner bannerImage={meetingInfoData?.banner}/>
				<MeetingContent {...props} />
				<Nav isModal ={true} selected={selected} setSelected={setSelected}/>
				{selected === 1 && <MeetingPost isModal={true} groupId={meetingId ?? ""}/>}
				{selected === 2 && <MeetingMember groupId={meetingId ?? ""}/>}
			</S.ModalContainer>
		</Modal>
	)
}