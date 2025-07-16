export interface MeetingCalenderProps {
	id: number;
	title: string;
	date: string;
	cost: number;
	startTime: string;
	endTime: string;
	description: string;
}

export const meetings: MeetingCalenderProps = {
	id: 1,
	title: "다함께 놀자 동네",
	date: "2025-07-17",
	cost: 5000,
	startTime: "12:00",
	endTime: "15:00",
	description: "전공동아리 발표 둘러보기",
}