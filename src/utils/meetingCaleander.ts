import {MeetingCalendarProps, MeetingCalendarResponseState} from "@/types/meetings";

export function convertMeetingsToTimeOnly(meetings?: MeetingCalendarResponseState[]) : Record<string, MeetingCalendarProps> {
	  if(!meetings) return {"null" : {scheduleId: "", title: "", description: "", location: "", durationMinutes: 0, startTime: "", endTime: ""}};
	  return meetings.reduce<Record<string, MeetingCalendarProps>>((acc, meeting) => {
		const startDate = new Date(meeting.scheduledAt);
		const endDate = new Date(startDate.getTime() + meeting.durationMinutes * 60 * 1000);
		
		const key = `${startDate.getFullYear()}. ${startDate.getMonth() + 1}. ${startDate.getDate()}.`;
		
		const formatTime = (date: Date) =>
			date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
		
		const {scheduleId, title, description, location, durationMinutes} = meeting;
		    acc[key] = {
			      scheduleId,
			      title,
			      description,
			      location,
			      durationMinutes,
			      startTime: formatTime(startDate),
			      endTime: formatTime(endDate),
			    };
		
		return acc;
	}, {} as Record<string, MeetingCalendarProps>);
}