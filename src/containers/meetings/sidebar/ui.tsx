'use client';
import * as S from './style';
import {createPortal} from 'react-dom'
import Image from 'next/image';
import Arrow from "@/assets/meeting/arrow.svg"
import {useModalStore} from "@/store/modal";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";



interface MeetingsSidebarProps {
	rooms: string;
	meetings: {
		groupId: string;
		name: string;
		description: string;
		currentParticipation: number;
		maxParticipation: number;
		profile : string
	}[]
}

export default function MeetingsSidebar({rooms, meetings}: MeetingsSidebarProps) {
	const {open} = useModalStore();
	const {setSelect, setMeetingId} = useSelectOtherMeetingDetailStore()
	const openModal = (name: string, id : string) => {
		open();
		setMeetingId(id)
		setSelect(name)
	}
	
	return createPortal(
		<S.SidebarContainer isOpen={true}>
			<S.Head>
				<p>부산광역시 {rooms}</p>
			</S.Head>
			<S.Content>
				{meetings?.length > 0 ?  meetings?.map(meeting => (
					<S.Meeting key={meeting.groupId} onClick={() => openModal(meeting?.name, meeting?.groupId)}>
						<S.ImgBox>
							<Image src={meeting.profile} alt="meeting" fill/>
						</S.ImgBox>
						<S.Info>
							<S.Sub>
								<p>인원 : {meeting.currentParticipation} / {meeting.maxParticipation}</p>
								<Image src={Arrow} alt="meeting" width={8} height={8}/>
							</S.Sub>
							<S.Title>{meeting.name}</S.Title>
							<S.Desc>{meeting.description}</S.Desc>
						</S.Info>
					</S.Meeting>
				)) : <p>해당 지역에는 모임이 존재하지 않습니다.</p>}
			</S.Content>
		</S.SidebarContainer>,
		document.body
	);
}