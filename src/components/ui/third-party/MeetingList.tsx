import React from "react";
import styled from "@emotion/styled";
import Square from "../button/square";
import {colors, fontSizes} from "@/styles/theme";
import Image from "next/image";
import {useMeetingStore} from "@/store/meeting";
import {mq} from '@/styles/media';
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

const MeetingTime = "/icons/meeting-time.svg";
const MeetingLocation = "/icons/meeting-location.svg";

interface MeetingListItem {
	id: number;
	title: string;
	time: string;
	location: string;
}

interface MeetingListProps {
	title: string;
	meetingList: MeetingListItem[];
}

export default function MeetingList({title, meetingList}: MeetingListProps) {
	const navigate = useNavigationWithProgress();
	const selectMeeting = useMeetingStore((s) => s.select);
	
	return (
		<Wrapper>
			<SectionTitle>{title}</SectionTitle>
			<List>
				{meetingList.length === 0 ? (
					<Empty>모임이 없습니다.</Empty>
				) : (
					meetingList.map((meeting) => (
						<Card key={meeting.id}>
							<Info>
								<MeetingTitle>
									{meeting.title}
									<p>함께 모임을 진행해보세요</p>
								</MeetingTitle>
								<Divider/>
								<Meta>
									<Time><Image src={MeetingTime} alt="Meeting Time" width={16} height={16}/> {meeting.time}</Time>
									<Location><Image src={MeetingLocation} alt="Meeting Location" width={16}
									                 height={16}/> {meeting.location}</Location>
								</Meta>
							</Info>
							<Square text="모임 관리" onClick={() => {
								selectMeeting(meeting);
								navigate(`/meeting/third-party/detail/${meeting.id}`);
							}} status={true} width="max-content"/>
						</Card>
					))
				)}
			</List>
		</Wrapper>
	);
}

const Wrapper = styled.div`
  width: 100%;
`;
const SectionTitle = styled.h2`
  font-size: ${fontSizes.H4};
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 18px;

  ${mq.mobile} {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`;
const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  padding: 32px;
  gap: 32px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 16px 20px;
    gap: 20px;
    border-radius: 12px;
  }
`;
const Info = styled.div`
  display: flex;
  gap: 16px;

  ${mq.mobile} {
    width: 100%;
    gap: 12px;
  }
`;
const MeetingTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 14px;
    color: ${colors.gray};
    font-weight: 400;
  }

  ${mq.mobile} {
    font-size: 16px;
    gap: 6px;

    p {
      font-size: 12px;
    }
  }
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  color: ${colors.gray};

  ${mq.mobile} {
    font-size: 13px;
    gap: 6px;
  }
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Divider = styled.span`
  width: 1px;
  align-self: stretch;
  background: ${colors.line};
  display: inline-block;

  ${mq.mobile} {
    display: none;
  }
`;
const Empty = styled.div`
  color: #bbb;
  font-size: 16px;
  text-align: center;
  padding: 32px 0;

  ${mq.mobile} {
    font-size: 14px;
    padding: 24px 0;
  }
`;