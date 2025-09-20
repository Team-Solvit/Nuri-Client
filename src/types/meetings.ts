export interface Area {
	area: string;
	longitude: number;
	latitude: number;
}

export interface AreaResponse {
	getAreas: Area[];
}
export interface Marker {
	id: number;
	position: {
		lat: number;
		lng: number;
	};
}
export interface M {
	id: number;
	title: string;
}
export interface Status{
		groupId: null | string,
		groupName: null | string,
		hasGroup: boolean,
}
export interface MeetingCalendarProps {
	scheduleId:string;
	title:string;
	location:string;
	description:string;
	startTime:string;
	endTime:string;
	durationMinutes:number;
}

export interface MeetingCalendarResponseState {
	scheduleId:string;
	title:string;
	description:string;
	location:string;
	scheduledAt:string;
	durationMinutes:number
}