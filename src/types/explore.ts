export interface BoardingRoom {
  roomId: string;
  name: string;
  monthlyRent: number;
  boardingHouse: {
    host: {
      user: {
        name: string;
        userId: string;
        profile?: string;
      };
    };
    location: string;
  };
  boardingRoomFile: {
    fileId: string;
    url?: string;
  }[];
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
  id: string;
  user: string;
  userId: string;
  title: string;
  //region: string;
  price: string;
  //period: number;
  //gender: string;
  thumbnail: string;
  userProfile: string;
}
