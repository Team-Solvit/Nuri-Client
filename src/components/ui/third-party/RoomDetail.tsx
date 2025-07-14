
import React from 'react';
import styled from '@emotion/styled';
import { fontSizes, colors } from '@/styles/theme';
import Square from '../button/square';

interface Room {
	number: string;
	names: string;
}

interface RoomDetailProps {
	id: number;
	room: Room | null;
	title: string;
	address: string;
	close: () => void;
}

const RoomDetailData = {
	host: {
		name: "김경숙",
		phone: "010-1234-4567",
	},
	members: [
		{ name: "오주현", phone: "010-1234-4567", contractPeriod: "2025.01.05 ~ 2025.05.05" },
		{ name: "윤도훈", phone: "010-8765-4321", contractPeriod: "2024.12.21 ~ 2025.05.21" },
		{ name: "박동현", phone: "010-4949-4321", contractPeriod: "2025.01.21 ~ 2025.05.21" },
		{ name: "박동현", phone: "010-4949-4321", contractPeriod: "2025.01.21 ~ 2025.05.21" },
		{ name: "박동현", phone: "010-4949-4321", contractPeriod: "2025.01.21 ~ 2025.05.21" },
		{ name: "박동현", phone: "010-4949-4321", contractPeriod: "2025.01.21 ~ 2025.05.21" },
	]
}

export default function RoomDetail({ id, room, title, address, close }: RoomDetailProps) {
	if (!room) return null;
	
	return (
		<Wrapper>
			<Header>
				<Title>{title} ({room.number})</Title>
				<Address>{address}</Address>
			</Header>
			
			<Host>
				<Label>호스트</Label>
				<HostName>{RoomDetailData.host.name}</HostName>
				<PhoneNumber>{RoomDetailData.host.phone}</PhoneNumber>
			</Host>
			
			<Members>
				<Label>유학생</Label>
				<MemberGrid>
					{RoomDetailData.members.map((member, index) => (
						<MemberItem key={index}>
							<MemberName>{member.name}</MemberName>
							<PhoneNumber>{member.phone}</PhoneNumber>
							<ContractPeriod>계약 기간 : {member.contractPeriod}</ContractPeriod>
						</MemberItem>
					))}
				</MemberGrid>
			</Members>
			<Square text='완료' onClick={() => { close() }} status={true} width='fix-content' />
		</Wrapper>
	);
}

const Wrapper = styled.div``;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 0 0 8px 0;
`;

const Address = styled.p`
  color: #999;
  margin: 0;
`;

const Label = styled.div`
  display: inline-block;
  background: rgba(255, 157, 157, 0.10);
  color: ${colors.primary};
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  font-size: ${fontSizes.Small};
  margin-bottom: 16px;
`;

const Host = styled.div`
  margin-bottom: 24px;
`;

const HostName = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;
`;

const PhoneNumber = styled.p`
  font-size: ${fontSizes.Body};
  color: #666;
  margin: 0;
`;

const Members = styled.div`

`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-height: 200px;
  overflow-y: scroll;
  scrollbar-color: #ccc transparent;
  scrollbar-width: thin;
`;

const MemberItem = styled.div`
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const MemberName = styled.h4`
  font-size: ${fontSizes.Body};
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;
`;

const ContractPeriod = styled.p`
  font-size: 14px;
  color: #999;
  margin: 4px 0 0 0;
`;