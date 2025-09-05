'use client';
import * as S from './style';
import {createPortal} from 'react-dom'
import Image from 'next/image';
import type {Meeting} from "@/containers/meetings/accession/type";
import Arrow from "@/assets/meeting/arrow.svg"
import {useModalStore} from "@/store/modal";
import {useRouter} from "next/navigation";
import {useMeetingStore} from "@/store/meetingData";


interface MeetingsSidebarProps {
	rooms: string;
	meetings: Meeting[]
}

export default function MeetingsSidebar({rooms, meetings}: MeetingsSidebarProps) {
	const {open} = useModalStore();
	const {select} = useMeetingStore()
	const router = useRouter();
	const openModal = (id: number) => {
		open();
		router.push(`?id=${id}`, {scroll: false});
		console.log(meetings[Number(id)-1])
		select(meetings[Number(id)-1])
	}
	
	return createPortal(
		<S.SidebarContainer isOpen={true}>
			<S.Head>
				<p>부산광역시 {rooms}</p>
			</S.Head>
			<S.Content>
				{meetings.map(meeting => (
					<S.Meeting key={meeting.id} onClick={() => openModal(meeting.id)}>
						<S.ImgBox>
							<Image src={meeting.img} alt="meeting" fill/>
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
				))}
			</S.Content>
		</S.SidebarContainer>,
		document.body
	);
}