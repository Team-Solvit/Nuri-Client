import { gql } from '@apollo/client';

export const SEARCH_BOARDING_ROOM = gql`
  query SearchBoardingRoom($boardingRoomSearchFilter: BoardingRoomSearchFilter!) {
    searchBoardingRoom(boardingRoomSearchFilter: $boardingRoomSearchFilter) {
      roomId
      name
      description
      monthlyRent
      headCount
      likeCount
      isLiked
      commentCount
      status
      day
    }
  }
`;

// 타입은 별도 파일에서 import
export type { 
  BoardingRoom, 
  Location, 
  ContractPeriod, 
  Price, 
  BoardingRoomSearchFilter,
  PostItemData 
} from '@/types/explore';
