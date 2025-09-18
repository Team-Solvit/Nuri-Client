import {MeetingCalenderProps, MeetingCalenderResponseState} from "@/types/meetings";

export const meetings1 : MeetingCalenderResponseState[] = [
	{
		scheduleId:"a83ce667-98a6-486b-b1d6-a752761afb32",
		title:"스터디 모임",
		description:"이번 주 스터디 모임입니다.",
		location:"강의실 101호",
		scheduledAt:"2025-09-20T15:00Z",
		durationMinutes:120
	}
]

export const meetings: Record<string, MeetingCalenderProps> = {
	"2025. 9. 20.": {
		scheduleId:"a83ce667-98a6-486b-b1d6-a752761afb32",
		title:"스터디 모임",
		description:"이번 주 스터디 모임입니다.",
		location:"강의실 101호",
		startTime: "12:00",
		endTime: "15:00",
		durationMinutes:120
	}
}