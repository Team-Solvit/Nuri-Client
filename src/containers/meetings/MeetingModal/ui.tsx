"use client"

import * as S from "./style"
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";
import Image from "next/image";
import BannerImg from "@/assets/meeting/banner.png"
import Square from "@/components/ui/button/square";
import Meeting from "@/assets/meeting/profile.png";
import {useState} from "react";
import MeetingPost from "@/components/ui/meting-post";
import MeetingCalender from "@/components/ui/meeting-calender";
import {MeetingMember} from "@/components/ui/meeting-member";

export default function MeetingModal() {
	const {isOpen} = useModalStore();
	const [selected, setSelected] = useState(1);
	if (!isOpen) return null
	return (
		<Modal>
			<S.ModalContainer>
				<S.Banner>
					<Image style={{objectFit: "cover"}} src={BannerImg} alt={"banner"} fill/>
					<S.Gradient/>
				</S.Banner>
				<S.Content>
					<S.TitleBox>
						<S.Info>
							<S.ImgBox>
								<Image src={Meeting} alt="meeting" fill/>
							</S.ImgBox>
							<S.Name>
								<h3>Meeting title</h3>
								<p>부산광역시 사하구</p>
							</S.Name>
						</S.Info>
						<Square text={"가입"} onClick={() => {
						}} status={true} width={"100px"}/>
					</S.TitleBox>
					<S.Description>
						설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
					</S.Description>
				</S.Content>
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
				{selected === 1 && <MeetingPost/>}
				{selected === 2 && <MeetingCalender/>}
				{selected === 3 && <MeetingMember/>}
			</S.ModalContainer>
		</Modal>
	)
}