"use client"
import Meeting from "@/containers/meetings/Meeting/ui";
import {useModalStore} from "@/store/modal";
import MeetingLeave from "@/containers/meetings/MeetingLeave/ui";

export default function MeetingModal() {
	const {isOpen} = useModalStore();
	return (
		<>
			<Meeting />
			{isOpen && <MeetingLeave/>}
		</>
	)
}