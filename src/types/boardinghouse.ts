export enum RoomStatus {
	EMPTY_ROOM = "EMPTY_ROOM",
	FULL = "FULL",
	REMAIN = "REMAIN",
}

export enum Gender {
	MALE = "MALE",
	FEMALE = "FEMALE",
	ALL = "ALL",
}

export interface UserType {
	id: string;
	name?: string | null;
	email?: string | null;
	profile?: string | null;
}

export interface HostType {
	id: string;
	name?: string | null;
	email?: string | null;
	user?: UserType | null;
}

export interface BoardingHouseType {
	houseId: string;
	host?: HostType | null;
	name?: string | null;
	location?: string | null;
	houseCallNumber?: string | null;
	description?: string | null;
	nearestStation?: string | null;
	nearestSchool?: string | null;
	gender?: Gender | null;
	isMealProvided?: boolean | null;
}

export interface BoardingRoomFileType {
	fileId: string;
	roomId: string;
	url: string;
}

export interface ContractPeriodType {
	contractPeriodId: string;
	roomId: string;
	contractPeriod: number;
}

export interface BoardingRoomOptionType {
	optionId: string;
	roomId: string;
	name: string;
}

export interface BoardingRoomType {
	roomId: string;
	name?: string | null;
	description?: string | null;
	monthlyRent?: number | null;
	headCount?: number | null;
	status?: RoomStatus | null;
	day?: string | null;
	boardingHouse?: BoardingHouseType | null;
	boardingRoomFile?: BoardingRoomFileType[];
	contractPeriod?: ContractPeriodType[];
	boardingRoomOption?: BoardingRoomOptionType[];
}
export interface BoarderType {
	boarder?:{
		callNumber : string,
		gender : Gender,
		user : {
			id: string;
			name: string;
			profile: string;
		}
	}
}

export interface BoardingRoomAndBoardersType {
	room?: BoardingRoomType;
	contractInfo : BoarderType[] | null
}

export interface CreateBoardingHouseType {
	boardingRoomInfo : {
		name: string
		monthlyRent: number
		headCount: number
		description: string
	}
	roomId ?: string
	files : string[]
	contractPeriod : number[]
	options:string[]
}

export interface GetBoardingRoomByRoomId{
	roomId : string
	name : string
	description : string
	monthlyRent : number
	headCount : number
	boardingRoomOption :{
		optionId : string
		name : string
	}[]
boardingRoomFile  : {
	fileId : string
	url : string
}[]
contractPeriod : {
	contractPeriodId : string
	contractPeriod : number
}[]
day : string
}