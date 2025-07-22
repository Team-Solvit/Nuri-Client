"use client"
import Meeting from "@/containers/meetings/Meeting/ui";
import {useModalStore} from "@/store/modal";
import MeetingLeave from "@/containers/meetings/MeetingLeave/ui";

export default function MeetingModal() {
	const {isOpen} = useModalStore();
	const fakeData = {
		id: "1",
		title: "다함께 돌자 돌네",
		location: "부산광역시 남구",
		description: "상냥하게 ",
		bannerImage: "/meeting/banner.png",
		profileImage: "/meeting/profile.png"
	}
	return (
		<>
			<Meeting {...fakeData}/>
			{isOpen && <MeetingLeave/>}
		</>
	)
}