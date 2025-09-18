import {MeetingCalenderProps, MeetingCalenderResponseState} from "@/types/meetings";

export function convertMeetingsToTimeOnly(meetings: MeetingCalenderResponseState[]) {
	if(!meetings) return;
	return meetings.reduce((acc: Record<string, MeetingCalenderProps>, meeting) => {
		const startDate = new Date(meeting.scheduledAt);
		const endDate = new Date(startDate.getTime() + meeting.durationMinutes * 60 * 1000);
		
		const key = `${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate()}.`;
		
		const formatTime = (date: Date) =>
			date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
		
		acc[key] = {
			...meeting,
			startTime: formatTime(startDate),
			endTime: formatTime(endDate)
		};
		
		return acc;
	}, {});
}