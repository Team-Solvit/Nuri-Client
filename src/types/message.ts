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
	profile: string;
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
	type: ContractStatus;
	roomId: string;
	hostId: string;
	contractPeriod: number;
	expiryDate: string;
	status: string;
	contractId: string;
	thumbnail: string;
	boardingHouseName: string;
	roomName: string;
	boarderName: string;
	price: number;
	area: string;
	
}
type ContractStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "REJECTED"