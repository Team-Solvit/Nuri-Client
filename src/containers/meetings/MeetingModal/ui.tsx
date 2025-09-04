"use client"

import * as S from "./style"
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";
import Image, {StaticImageData} from "next/image";
import Square from "@/components/ui/button/square";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import MeetingCalender from "@/components/ui/meeting-calender";
import {MeetingMember} from "@/components/ui/meeting-member";
import type {Meeting} from "@/containers/meetings/accession/type"
import {useSearchParams} from "next/navigation";

export const Banner = ({bannerImage}: { bannerImage: string | StaticImageData }) => {
	return (
		<S.Banner>
			<Image style={{objectFit: "cover"}} src={bannerImage} alt={"banner"} fill/>
			<S.Gradient/>
		</S.Banner>
	)
}
export const MeetingContent = ({
	                               setIsAccessionAction,
	                               props
                               }: {
	setIsAccessionAction: (bool: boolean, idx : number) => void;
	props: Meeting;
}) => {
	return (
		<S.Content>
			<S.TitleBox>
				<S.Info>
					<S.ImgBox>
						<Image src={props.img} alt="meeting" fill/>
					</S.ImgBox>
					<S.Name>
						<h3>{props.title}</h3>
						<p>{props.location}</p>
					</S.Name>
				</S.Info>
				<S.SignBtnBox>
					<Square text={"가입"} onClick={() => {
						setIsAccessionAction(true, props.id)
					}} status={true} width={"100px"}/>
				</S.SignBtnBox>
			</S.TitleBox>
			<S.Description>
				{props.content || "모임 설명이 없습니다."}
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

export default function MeetingModal({fakeData,
	                                     setIsAccessionAction
                                     }: {
	fakeData : Meeting[]
	setIsAccessionAction: (bool: boolean, idx : number) => void
}) {
	const {isOpen} = useModalStore();
	const [selected, setSelected] = useState(1);
	const searchParams = useSearchParams();
	const id = searchParams?.get("id");
	if (!isOpen || !id) return null
	const num = Number(id) - 1
	return (
		<Modal>
			<S.ModalContainer>
				<Banner bannerImage={fakeData[num].banner}/>
				<MeetingContent  setIsAccessionAction={setIsAccessionAction}
				                 props={fakeData[num]} />
				<Nav selected={selected} setSelected={setSelected}/>
				{selected === 1 && <MeetingPost isModal={true}/>}
				{selected === 2 && <MeetingCalender/>}
				{selected === 3 && <MeetingMember isMember={false}/>}
			</S.ModalContainer>
		</Modal>
	)
}