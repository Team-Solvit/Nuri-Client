"use client"

import * as S from "./style"
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";
import Image, {StaticImageData} from "next/image";
import BannerImg from "@/assets/meeting/banner.png"
import Square from "@/components/ui/button/square";
import Meeting from "@/assets/meeting/profile.png";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import MeetingCalender from "@/components/ui/meeting-calender";
import {MeetingMember} from "@/components/ui/meeting-member";
import {MeetingModalProps} from "@/containers/meetings/MeetingModal/type";

export const Banner = ({bannerImage}: { bannerImage: string | StaticImageData }) => {
	return (
		<S.Banner>
			<Image style={{objectFit: "cover"}} src={bannerImage} alt={"banner"} fill/>
			<S.Gradient/>
		</S.Banner>
	)
}

export const MeetingContent = (props: MeetingModalProps & {
	setIsAccessionAction: (isAccession: boolean) => void;
}) => {
	return (
		<S.Content>
			<S.TitleBox>
				<S.Info>
					<S.ImgBox>
						<Image src={Meeting} alt="meeting" fill/>
					</S.ImgBox>
					<S.Name>
						<h3>{props.title}</h3>
						<p>{props.location}</p>
					</S.Name>
				</S.Info>
				<Square text={"가입"} onClick={() => {
					props.setIsAccessionAction(true)
				}} status={true} width={"100px"}/>
			</S.TitleBox>
			<S.Description>
				{props.description || "모임 설명이 없습니다."}
			</S.Description>
		</S.Content>
	)
}

export const Nav = ({selected, setSelected}: { selected: number, setSelected: (id: number) => void }) => {
	return (
		<S.Nav isSelected={selected}>
			<S.PBox>
				<p onClick={() => setSelected(1)}>게시물</p>
			</S.PBox>
			<S.PBox>
				<p onClick={() => setSelected(2)}>일정</p>
			</S.PBox>
			<S.PBox>
				<p onClick={() => setSelected(3)}>모임원</p>
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
	const fakeData: MeetingModalProps = {
		title: "다함께 놀자 동네",
		description: "누구보다 재미있게",
		location: "부산광역시 남구",
		bannerImage: BannerImg,
		profileImage: "/meeting/profile.png"
	}
	const props = {...fakeData, setIsAccessionAction};
	
	if (!isOpen) return null
	return (
		<Modal>
			<S.ModalContainer>
				<Banner bannerImage={fakeData.bannerImage}/>
				<MeetingContent {...props} />
				<Nav selected={selected} setSelected={setSelected}/>
				{selected === 1 && <MeetingPost/>}
				{selected === 2 && <MeetingCalender/>}
				{selected === 3 && <MeetingMember isMember={false}/>}
			</S.ModalContainer>
		</Modal>
	)
}