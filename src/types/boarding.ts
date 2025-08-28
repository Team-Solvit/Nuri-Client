export interface BoardingUserRef {
  id: string;
  name: string;
  userId?: string; // 일부 쿼리에서 추가로 내려옴
}

export interface BoardingHost {
  user: BoardingUserRef;
  callNumber?: string;
}

export interface BoardingHouse {
  houseId: string;
  name: string;
  location?: string;
  host?: BoardingHost;
}

export interface BoardingRoomFile { url: string; }

export interface ContractPeriod { contractPeriod: string; }

export interface BoardingRoom {
  roomId: string;
  name: string;
  description?: string;
  monthlyRent?: number;
  boardingRoomFile?: BoardingRoomFile[];
  boardingHouse?: BoardingHouse;
  contractPeriod?: ContractPeriod; // 단건일 수도 있어 구조 유연성 확보
}

export interface RoomContractInfo {
  status: string; // Boolean/Enum 추후 스키마 보고 좁힐 수 있음
  expiryDate?: string;
  boarder?: { user: BoardingUserRef; callNumber?: string };
}

export interface RoomContract {
  contractInfo?: RoomContractInfo; // 스키마 상 배열 가능성 있으면 조정 필요
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

// 입력 타입
export interface BoardingManageWorkReadInput {
  date: string; // YYYY-MM-DD
  houseId?: string;
}

export interface BoardingManageWorkFileUploadInput {
  workId: string;
  file: string; // URL 또는 업로드된 파일 식별자
}
