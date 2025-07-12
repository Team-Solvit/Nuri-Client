import React from 'react';
import * as S from './style';
import Square from '@/components/ui/button/square';
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"

const fakeData = {
	roomInfo: {
		phone: '010-1234-5678',
		location: '부산광역시 남구',
		gender: '여성전용',
		
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
	return (
		<S.Container>
			<S.Header>
				<S.Title>그랜마 하우스</S.Title>
				<S.Setting>하숙집 설정</S.Setting>
			</S.Header>
			<S.InfoSection>
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
				<S.More>더보기</S.More>
			</S.InfoSection>
			<S.RoomInfoContainer>
				<S.RoomInfoTitle>방 정보</S.RoomInfoTitle>
				<Square text='방추가' status={true} width='100px' onClick={() => {
				}}/>
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
								<Square text={"계약 종료"} onClick={() => {
								}} status={true} width={"max-content"}/>
							)}
						</S.RoomHeader>
					</S.RoomCard>
				))}
			</S.RoomList>
		</S.Container>
	);
};

export default HouseScroll;