"use client";

import React, {useState} from 'react';
import * as S from './style';
import Square from '@/components/ui/button/square';
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"
import {useRouter} from 'next/navigation';
import {useModalStore} from "@/store/modal";

const fakeData = {
	roomInfo: {
		name: '그랜마 하우스',
		phone: '010-1234-5678',
		location: '부산광역시 남구 땡땡동',
		gender: '여성전용',
		description: "안녕하세요 그랜마 하우스 입니다",
		nearby_station: "땡땡역",
		nearby_school: "부산대",
		meal: true
		
	},
	roomList: [
		{
			roomName: '301호',
			userId: 'huhon123',
			status: '계약 종료',
			profile: true,
		},
		{
			roomName: '302호',
			userId: '',
			status: '',
			profile: false,
			empty: true,
		},
	],
};

const HouseScroll = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const handleLocation = (path: string) => {
		router.push(path);
	}
	const {open} = useModalStore();
	const openModal = (number: string) => {
		open();
		router.push(`/myHouse?name=${fakeData.roomInfo.name}&number=${number}`, {scroll: false});
	}
	return (
		<S.Container>
			<S.Header>
				<S.Title>그랜마 하우스</S.Title>
				<S.Setting onClick={() => handleLocation("/user")}>하숙집 설정</S.Setting>
			</S.Header>
			<S.InfoSection isOpen={isOpen}>
				<S.InfoRow>
					<S.InfoLabel>전화번호</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.phone}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>위치</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.location}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>성별</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.gender}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>식사제공여부</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.meal ? "제공" : "미제공"}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>가까운 역</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.nearby_station}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoLabel>가까운 학교</S.InfoLabel>
					<S.InfoValue>{fakeData.roomInfo.nearby_school}</S.InfoValue>
				</S.InfoRow>
				<S.InfoRow>
					<S.InfoValue>{fakeData.roomInfo.description}</S.InfoValue>
				</S.InfoRow>
			</S.InfoSection>
			<S.More onClick={() => setIsOpen(!isOpen)}>{isOpen ? "숨기기" : "더보기"}</S.More>
			<S.RoomInfoContainer>
				<S.RoomInfoTitle>방 정보</S.RoomInfoTitle>
				<Square text='방추가' status={true} width='100px' onClick={() => handleLocation("/myHouse/addition")}/>
			</S.RoomInfoContainer>
			<S.RoomList>
				{fakeData.roomList.map((room, idx) => (
					<S.RoomCard key={room.roomName + idx}>
						<S.RoomImage>
							<Image src={Profile} alt={"profile"} fill style={{objectFit: "cover"}}/>
						</S.RoomImage>
						<S.RoomHeader>
							<S.RoomInfo>
								<S.RoomName>{room.roomName}</S.RoomName>
								{room.profile && (
									<S.ProfileWrap>
										<S.ProfileImg>
											<Image src={Profile} alt={"profile"} fill style={{objectFit: "cover"}}/>
										</S.ProfileImg>
										<S.UserId>{room.userId}</S.UserId>
									</S.ProfileWrap>
								)}
								{room.empty && (
									<S.UserId color="#8c8c8c">비어있음</S.UserId>
								)}
							</S.RoomInfo>
							{room.status && (
								<Square text={"계약 종료"} onClick={() => openModal(room.roomName)} status={true} width={"max-content"}/>
							)}
						</S.RoomHeader>
					</S.RoomCard>
				))}
			</S.RoomList>
		</S.Container>
	);
};

export default HouseScroll;