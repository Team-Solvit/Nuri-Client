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
import {useRouter} from "next/navigation";

export default function Meeting() {
	const [selected, setSelected] = useState(1);
	const router = useRouter();
	const handleBack = () => {
		router.push("/meetings");
	}
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
							<h3>Meeting title</h3>
							<p>부산광역시 사하구</p>
						</S.Name>
					</S.Info>
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
			{selected === 1 && <S.BtnBox>
        <Square text={"게시물 작성"} status={true} width={"calc(84.5vw - 10rem)"} onClick={() => {
				}}/>
      </S.BtnBox>}
			{selected === 2 && <MeetingCalender/>}
			{selected === 3 && <MeetingMember/>}
		</S.ModalContainer>
	)
}