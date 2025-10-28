import { ApolloClient, gql } from '@apollo/client';
import { BoardingHouseSettingRequestDto } from '@/types/boarding';

export const HostGQL = {
  QUERIES: {
    GET_HOST_BOARDING_ROOMS: gql`
      query GetHostBoardingRooms($userId: String!) {
        getHostBoardingRooms(userId: $userId) {
          boardingHouse {
            nearestSchool
            nearestStation
            location
          }
          name
          description
        }
      }
    `,
  },
  MUTATIONS: {
    CREATE_BOARDING_HOUSE: gql`
      mutation CreateBoardingHouse($boardingHouseSettingRequestDto: BoardingHouseSettingInput!) {
        createBoardingHouse(boardingHouseSettingRequestDto: $boardingHouseSettingRequestDto)
      }
    `,
    WITHDRAW_USER: gql`
      mutation WithdrawUser($emailVerifyTicket: String!) {
        withdrawUser(emailVerifyTicket: $emailVerifyTicket)
      }
    `,
  }
};

export const HostService = {
  createBoardingHouse: async (client: ApolloClient<any>, boardingHouseSettingRequestDto: BoardingHouseSettingRequestDto): Promise<boolean> => {
    const { data } = await client.mutate<{ createBoardingHouse: boolean }>({
      mutation: HostGQL.MUTATIONS.CREATE_BOARDING_HOUSE,
      variables: {
        boardingHouseSettingRequestDto: {
          houseName: boardingHouseSettingRequestDto.name,
          address: boardingHouseSettingRequestDto.address,
          callNumber: boardingHouseSettingRequestDto.callNumber || '',
          introduce: boardingHouseSettingRequestDto.introduce,
          position: boardingHouseSettingRequestDto.detailAddress,
          nearestStation: boardingHouseSettingRequestDto.station,
          nearestSchool: boardingHouseSettingRequestDto.university,
          gender: boardingHouseSettingRequestDto.gender,
          lat: boardingHouseSettingRequestDto.lat,
          lon: boardingHouseSettingRequestDto.lng,
          isMealProvided: boardingHouseSettingRequestDto.mealProvided,
        }
      }
    });
    return data?.createBoardingHouse ?? false;
  },
  
  withdrawUser: async (client: ApolloClient<any>, emailVerifyTicket: string): Promise<boolean> => {
    const { data } = await client.mutate<{ withdrawUser: boolean }>({
      mutation: HostGQL.MUTATIONS.WITHDRAW_USER,
      variables: { emailVerifyTicket }
    });
    return data?.withdrawUser ?? false;
  }
};
