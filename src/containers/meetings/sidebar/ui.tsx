'use client';
import * as S from './style';
import {createPortal} from 'react-dom'
import Image from 'next/image';
import Arrow from "@/assets/meeting/arrow.svg"
import {useModalStore} from "@/store/modal";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import MeetingsSidebarSkeleton from "@/components/ui/skeleton/MeetingsSidebarSkeleton";


interface MeetingsSidebarProps {
	rooms: string;
	meetings: {
		groupId: string;
		name: string;
		description: string;
		currentParticipation: number;
		maxParticipation: number;
		profile : string
	}[],
	isLoading :boolean
}

export default function MeetingsSidebar({rooms, meetings, isLoading}: MeetingsSidebarProps) {
	const {open} = useModalStore();
	const {setSelect, setMeetingId} = useSelectOtherMeetingDetailStore()
	const openModal = (name: string, id : string) => {
		open();
		setMeetingId(id)
		setSelect(name)
	}
	
	// 로딩 중이면 스켈레톤 사이드바 표시
	if(isLoading) return <MeetingsSidebarSkeleton />
	
	return createPortal(
		<S.SidebarContainer isOpen={true}>
			<S.Head>
				<p>부산광역시 {rooms}</p>
			</S.Head>
			<S.Content>
				{meetings?.length > 0 ?  meetings?.map(meeting => (
					<S.Meeting key={meeting.groupId} onClick={() => openModal(meeting?.name, meeting?.groupId)}>
						<S.ImgBox>
							<Image src={meeting?.profile ? process.env.NEXT_PUBLIC_IMAGE_URL + meeting.profile : "/post/default.png"} alt="meeting" fill/>
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
				)): <p>등록된 모임이 없습니다.</p>}
			</S.Content>
		</S.SidebarContainer>,
		document.body
	);
}