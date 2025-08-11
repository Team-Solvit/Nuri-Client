export interface ChatMessage {
	id: number;
	type: 'sent' | 'received';
	text: string;
	time: string;
	date?: string;
	profile?: string;
	name?: string;
	img?: string;
	
	roomTour?: RoomTour
	replyTo?: ReplyTo
	contract?: Contract
}

export type Status = 'success' | 'fail' | 'ing'

export interface ReplyTo {
	id: number;
	text: string;
	name: string;
}

export interface RoomTour {
	name: string,
	tourId: number,
	date: string,
	time: string,
	thumbnail: string,
	master: boolean,
	status: Status
}

export interface Contract {
	name: string,
	contractId: number,
	thumbnail: string,
	master: boolean,
	status: Status
}