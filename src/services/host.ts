// import { ApolloClient, gql } from '@apollo/client';
// import { BoardingHouseSettingRequestDto } from '@/types/boarding';

// export const HostGQL = {
//   MUTATIONS: {
//     CREATE_BOARDING_HOUSE: gql`
//       mutation CreateBoardingHouse($boardingHouseSettingRequestDto: BoardingHouseSettingRequestDto!) {
//         createBoardingHouse(boardingHouseSettingRequestDto: $boardingHouseSettingRequestDto)
//       }
//     `,
//     WITHDRAW_USER: gql`
//       mutation WithdrawUser($emailVerifyTicket: String!) {
//         withdrawUser(emailVerifyTicket: $emailVerifyTicket)
//       }
//     `,
//   }
// };

// export const HostService = {
//   createBoardingHouse: async (client: ApolloClient<any>, boardingHouseSettingRequestDto: BoardingHouseSettingRequestDto): Promise<boolean> => {
//     const { data } = await client.mutate<{ createBoardingHouse: boolean }>({
//       mutation: HostGQL.MUTATIONS.CREATE_BOARDING_HOUSE,
//       variables: { boardingHouseSettingRequestDto }
//     });
//     return data?.createBoardingHouse ?? false;
//   },
  
//   withdrawUser: async (client: ApolloClient<any>, emailVerifyTicket: string): Promise<boolean> => {
//     const { data } = await client.mutate<{ withdrawUser: boolean }>({
//       mutation: HostGQL.MUTATIONS.WITHDRAW_USER,
//       variables: { emailVerifyTicket }
//     });
//     return data?.withdrawUser ?? false;
//   }
// };
