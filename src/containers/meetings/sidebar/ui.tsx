'use client';
import * as S from './style';
import {createPortal} from 'react-dom'
import Image from 'next/image';
import Meeting from "@/assets/meeting/profile.png"
import Arrow from "@/assets/meeting/arrow.svg"
import {useModalStore} from "@/store/modal";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";



interface MeetingsSidebarProps {
	rooms: string;
	meetings: {
		id: number;
		title: string;
		content: string;
		personnel: number;
		maxPersonnel: number;
	}[]
}

export default function MeetingsSidebar({rooms, meetings}: MeetingsSidebarProps) {
	const {open} = useModalStore();
	const {setSelect, setMeetingId} = useSelectOtherMeetingDetailStore()
	const openModal = (name: string, id : number) => {
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
					<S.Meeting key={meeting.id} onClick={() => openModal(meeting?.title, meetings?.id)}>
						<S.ImgBox>
							<Image src={Meeting} alt="meeting" fill/>
						</S.ImgBox>
						<S.Info>
							<S.Sub>
								<p>인원 : {meeting.personnel} / {meeting.maxPersonnel}</p>
								<Image src={Arrow} alt="meeting" width={8} height={8}/>
							</S.Sub>
							<S.Title>{meeting.title}</S.Title>
							<S.Desc>{meeting.content}</S.Desc>
						</S.Info>
					</S.Meeting>
				)) : <p>해당 지역에는 모임이 존재하지 않습니다.</p>}
			</S.Content>
		</S.SidebarContainer>,
		document.body
	);
}