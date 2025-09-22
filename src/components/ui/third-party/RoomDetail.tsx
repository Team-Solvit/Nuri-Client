import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { fontSizes, colors } from '@/styles/theme';
import Square from '../button/square';
import { mq } from '@/styles/media';
import { useApollo } from '@/lib/apolloClient';
import { BoardingService } from '@/services/boarding';
import type { RoomContract } from '@/types/boarding';

interface Room {
	roomId: string;
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

export default function RoomDetail({ id, room, title, address, close }: RoomDetailProps) {
	const client = useApollo();
	const [contracts, setContracts] = useState<RoomContract | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const roomId = room?.roomId || room?.number;

	useEffect(() => {
		if (!roomId) return;
		let active = true;
		(async () => {
			setLoading(true); setError(null);
			try {
				const list = await BoardingService.getRoomContractList(client, roomId);
				if (!active) return;
				setContracts(list);
			} catch (e) {
				if (!active) return;
				setError('계약 정보를 불러오지 못했습니다.');
			} finally {
				if (active) setLoading(false);
			}
		})();
		return () => { active = false; };
	}, [client, roomId]);

	if (!room) return null;

	const first = contracts;
	const host = first?.room?.boardingHouse?.host;
	const hostInfo = host?.user?.name ? { name: host.user.name, phone: host?.callNumber || '' } : null;

	const formatDate = (d?: string) => {
		if (!d) return '';
		return d.slice(0,10);
	};

	const members = (contracts?.contractInfo || []).map(info => {
		const name = info?.boarder?.user?.name;
		if (!name) return null;
		const expiry = (info as any).expiryDate || (info as any).expireDate;
		return { name, phone: info?.boarder?.callNumber, expiryDate: expiry ? formatDate(expiry) : undefined };
	}).filter(Boolean) as { name: string; phone?: string; expiryDate?: string }[];

	return (
		<Wrapper>
			<Header>
				<Title>{title} ({room.number})</Title>
				<Address>{address}</Address>
			</Header>

			<Host>
				<Label>호스트</Label>
				{loading && !hostInfo && <PhoneNumber>불러오는 중...</PhoneNumber>}
				{error && <PhoneNumber style={{ color: 'red' }}>{error}</PhoneNumber>}
				{!loading && !error && hostInfo && (
					<>
						<HostName>{hostInfo.name}</HostName>
						{hostInfo.phone && <PhoneNumber>{hostInfo.phone}</PhoneNumber>}
					</>
				)}
				{!loading && !error && !hostInfo && <PhoneNumber>정보 없음</PhoneNumber>}
			</Host>

			<Members>
				<Label>유학생</Label>
				{loading && members.length === 0 && <PhoneNumber>불러오는 중...</PhoneNumber>}
				{!loading && members.length === 0 && !error && <PhoneNumber>입주자 없음</PhoneNumber>}
				{error && <PhoneNumber style={{ color: 'red' }}>{error}</PhoneNumber>}
				{members.length > 0 && (
					<MemberGrid>
						{members.map((member, index) => (
							<MemberItem key={index}>
								<MemberName>{member.name}</MemberName>
								{member.phone && <PhoneNumber>{member.phone}</PhoneNumber>}
								{member.expiryDate && <ContractPeriod>계약 만료 일 : {member.expiryDate}</ContractPeriod>}
							</MemberItem>
						))}
					</MemberGrid>
				)}
			</Members>
			<Square text='완료' onClick={() => { close() }} status={true} width='fix-content' />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	padding: 2rem 3rem;
`;

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

const Members = styled.div``;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-height: 200px;
  overflow-y: scroll;
  scrollbar-color: #ccc transparent;
  scrollbar-width: thin;
  padding-right: 8px;
  background-clip: padding-box;

  &::-webkit-scrollbar {
	width: 8px;
  }
  &::-webkit-scrollbar-thumb {
	background: #ccc;
	border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
	background: transparent;
  }

  ${mq.mobile} {
	grid-template-columns: 1fr;

	padding-right: 20px;
  }
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