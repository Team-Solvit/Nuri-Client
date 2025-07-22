export interface MeetingCalenderProps {
	id: number;
	title: string;
	date: string;
	cost: number;
	startTime: string;
	endTime: string;
	description: string;
}

export const meetings: Record<string, MeetingCalenderProps> = {
	"2025. 7. 21.": {
		id: 1,
		title: "행사1",
		date: "2025-07-17",
		cost: 5000,
		startTime: "12:00",
		endTime: "15:00",
		description: "전공동아리 발표 둘러보기",
	}
}