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
	replyChat?:  {
		chatId : string,
		contents : string,
		name : string
	}
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
	roomId: string;
	sendAt: string;
	userId: string;
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