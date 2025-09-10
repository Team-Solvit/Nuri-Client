export interface BoardingRoom {
  roomId: string;
  name: string;
  description?: string;
  monthlyRent: number;
  headCount: number;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  status: string;
  day: string;
}

export interface Location {
  lat: number;
  lon: number;
  radiusMeters: string;
}

export interface ContractPeriod {
  min: number;
  max: number;
}

export interface Price {
  min: number;
  max: number;
}

export interface BoardingRoomSearchFilter {
  school?: Location;
  station?: Location;
  contractPeriod?: ContractPeriod;
  price?: Price;
  region?: string;
  start?: number;
  name?: string;
}

export interface PostItemData {
  id: number;
  user: string;
  title: string;
  region: string;
  price: string;
  period: number;
  gender: string;
  thumbnail: string;
  userProfile: string;
}
