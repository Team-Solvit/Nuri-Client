export interface BoardingUserRef {
  id: string;
  name: string;
  userId?: string;
}

export interface BoardingHost {
  user: BoardingUserRef;
  callNumber?: string;
}

export interface BoardingHouse {
  houseId: string;
  name: string;
  location?: string;
  lat?: number;
  lon?: number;
  host?: BoardingHost;
}

export interface BoardingRoomFile { url: string; }

export interface ContractPeriod { contractPeriod: string; }

export interface BoardingRoom {
  roomId: string;
  name: string;
  description?: string;
  monthlyRent?: number;
  boardingRoomFile?: BoardingRoomFile;
  boardingHouse?: BoardingHouse;
  contractPeriod?: ContractPeriod;
}

export interface RoomContractInfo {
  status: string;
  expiryDate?: string;
  boarder?: { user: BoardingUserRef; callNumber?: string };
}

export interface RoomContract {
  contractInfo?: RoomContractInfo;
  room: BoardingRoom;
}

export type BoardingManageType = 'VISIT' | 'CALL';

export interface BoardingRelationship {
  relationshipId: string;
  thirdParty?: { user: BoardingUserRef };
  boarder?: { user: BoardingUserRef; callNumber?: string };
  boarderHouse?: BoardingHouse;
  boardingRoom?: BoardingRoom;
}

export interface BoardingManageWork {
  manageWorkId: string;
  relationship?: BoardingRelationship;
  name: string;
  date: string;
  file?: string;
  type?: BoardingManageType;
  status?: boolean;
}

export interface BoardingManageWorkReadInput {
  date: string;
  houseId?: string;
}

export interface BoardingManageWorkFileUploadInput {
  workId: string;
  file: string;
}
