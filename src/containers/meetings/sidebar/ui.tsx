'use client';
import * as S from './style';
import {createPortal} from 'react-dom'
import Image from 'next/image';
import Meeting from "@/assets/meeting/profile.png"
import Arrow from "@/assets/meeting/arrow.svg"
import {useModalStore} from "@/store/modal";
import {useRouter} from "next/navigation";


interface MeetingsSidebarProps {
	rooms: string;
}

export default function MeetingsSidebar({rooms}: MeetingsSidebarProps) {
	const fakeData = [
		{id: 1, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
		{id: 2, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
		{id: 3, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
		{id: 4, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
		{id: 5, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
		{id: 6, title: "다함께 놀자 동네", content: "dajflkdjskfjfj", personnel: 2, maxPersonnel: 3},
	]
	
	const {open} = useModalStore();
	const router = useRouter();
	const openModal = (id: number) => {
		open();
		router.push(`?id=${id}`, {scroll: false});
		
	}
	
	return createPortal(
		<S.SidebarContainer isOpen={true}>
			<S.Head>
				<p>부산광역시 {rooms}</p>
			</S.Head>
			<S.Content>
				{fakeData.map(meeting => (
					<S.Meeting key={meeting.id} onClick={() => openModal(meeting.id)}>
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
				))}
			</S.Content>
		</S.SidebarContainer>,
		document.body
	);
}