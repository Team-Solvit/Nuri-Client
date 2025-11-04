export type DateTime = string;
export type UUID = string;

// === Inputs ===
export interface RoomDtoInput {
	name: string;
	profile?: string | null;
}

export interface RoomCreateRequestDto {
	roomDto: RoomDtoInput;
	users: string[];
	isTeam: boolean;
}

export interface RoomInviteRequestDto {
	users: string[];
	roomId: string;
}

export interface ReplyChatInput {
	chatId: string;
	contents: string;
	name: string;
}

export interface ChatRecordRequestDto {
	roomId: string;
	contents: string;
	replyChat?: ReplyChatInput | null;
}

// === Types ===
export interface Sender {
	name: string;
	profile: string | null;
}

export interface ReplyChat {
	chatId: string;
	contents: string;
	name: string;
}

export interface ChatRecordResponseDto {
	id: UUID;
	roomId?: string | null;
	sender: Sender;
	createdAt: DateTime;
	contents: string;
	replyChat?: ReplyChat | null;
}

export interface NotificationResponseDto {
	name: string;
	picture: string;
	roomId: string;
	contents: string;
	sendAt: DateTime;
}

export interface RoomDto {
	name: string;
	id: string;
	profile?: string | null;
	memberCount:number
}

export interface RoomCreateResponseDto {
	id?: UUID | null;
	room?: RoomDto | null;
	users?: string[] | null;
}

export interface RoomReadResponseDto {
	roomDto: RoomDto;
	latestMessage?: string | null;
	latestCreatedAt?: DateTime | null;
}

export interface PageInfo {
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
}

export interface RoomReadPage {
	content: RoomReadResponseDto[];
	pageInfo: PageInfo;
}
export interface Contract {
	type: "contract";
	roomId: string;
	hostId: string;
	contractPeriod: number;
	expiryDate: string;
	status: RequestStatus;
	contractId: string;
	thumbnail: string;
	boardingHouseName: string;
	roomName: string;
	boarderName: string;
	price: number;
	area: string;
}

//type
export function isContract(obj: Contract|RoomTour|null|undefined): obj is Contract {
	return (
		typeof obj === "object" &&
		obj !== null &&
		obj.type === "contract"
	);
}

export function isRoomTour(obj: Contract|RoomTour|null|undefined): obj is RoomTour {
	return (
		typeof obj === "object" &&
		obj !== null &&
		obj.type === "roomTour"
	);
}

type RequestStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "REJECTED" | "APPROVED" | "CANCELLED" | "DELETED"

export interface RoomTour {
	area:string;
	boardingHouseName: string;
	price: number;
	requesterName: string;
	roomId: string;
	roomName: string;
	roomTourId: string;
	status: RequestStatus
	thumbnail: string;
	time: {
		year : number,
		month : number,
		day: number,
		hour: number,
		minute : number,
	};
	type: "roomTour"
}

export interface RoomTourResponseDto {
		user : {
		id : string;
		userId : string;
		name : string;
	}
boarderRoom : {
	name : string;
	boardingHouse  : {
		name : string;
		location : string;
		lat : string;
		lon : string;
	}
}
host  : {
	callNumber : string;
	user : {
		id : string;
		userId : string;
		name : string;
	}
}
time : string;
status : RequestStatus
}