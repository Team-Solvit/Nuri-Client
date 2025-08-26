export interface ChatMessage {
	id: string;
	contents: string;
	createdAt: {
		time: string;
		date: string;
	};
	sender: {
		profile: string | null;
		name: string;
	}
	roomId: string;
	
	img?: string;
	roomTour?: RoomTour
	replyChat?: boolean | null;
	contract?: Contract
}

export interface ChatReadMessageResponse extends Omit<ChatMessage, "createdAt"> {
	createdAt: string;
}

export interface ChatMessageResponse {
	id: string;
	contents: string;
	createdAt: {
		time: string;
		date: string;
	};
	sendAt?: string;
	userId?: string;
	name?: string;
	sender: {
		profile: string | undefined;
		name: string | undefined;
	}
	roomId: string;
	picture?: string;
	img?: string;
	roomTour?: RoomTour
	replyChat?: boolean | null;
	contract?: Contract
}

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
	master: boolean
}

export interface Contract {
	name: string,
	contractId: number,
	thumbnail: string,
	master: boolean
}