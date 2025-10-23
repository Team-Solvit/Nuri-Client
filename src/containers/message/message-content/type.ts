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
	replyChat?:  ReplyTo | null
	contract?: Contract
}

export interface ChatReadMessageResponse extends Omit<ChatMessage, "createdAt"> {
	createdAt: string;
}

export interface ChatMessageResponse {
	contents: string;
	id: string;
	name: string;
	picture: string;
	replyChat?: ReplyTo | null;
	roomId: string;
	sendAt: string;
	sender: {
		profile: string | null;
		name: string;
	};
}

export interface ReplyTo {
	chatId : string,
	contents : string,
	name : string
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