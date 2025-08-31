import { ApolloClient, gql } from '@apollo/client';
import {
  BoardingHouse,
  RoomContract,
  BoardingManageWork,
  BoardingManageWorkReadInput,
  BoardingManageWorkFileUploadInput
} from '@/types/boarding';

export const BoardingGQL = {
  QUERIES: {
    GET_MANAGE_HOUSE_LIST: gql`
      query GetManageBoardingHouseList {
        getManageBoardingHouseList {
          houseId
          name
          location
          lat
          lon
          host { user { id name } }
        }
      }
    `,
    GET_MANAGE_ROOM_LIST: gql`
      query GetManageBoardingRoomList($houseId: String!) {
        getManageBoardingRoomList(houseId: $houseId) {
          contractInfo {
            status
            boarder { user { id name userId } }
          }
          room {
            roomId
            name
            description
            boardingRoomFile { url }
            boardingHouse { host { user { id name } } }
            contractPeriod { contractPeriod }
          }
        }
      }
    `,
    GET_ROOM_CONTRACT_LIST: gql`
      query GetRoomContractList($roomId: String!) {
        getRoomContractList(roomId: $roomId) {
          contractInfo {
            status
            expiryDate
            boarder { user { id name } callNumber }
          }
          room {
            roomId
            name
            monthlyRent
            boardingHouse {
              houseId
              name
              host { user { id name } callNumber }
            }
          }
        }
      }
    `,
    GET_BOARDING_MANAGE_WORK: gql`
      query GetBoardingManageWork($date: String!, $houseId: String) {
        getBoardingManageWork(boardingManageWorkReadInput: { date: $date, houseId: $houseId }) {
          manageWorkId
          name
          date
          file
          type
          status
          relationship {
            relationshipId
            thirdParty { user { id name } }
            boarder { user { id name } callNumber }
            boarderHouse { houseId name }
          }
        }
      }
    `,
  },
  MUTATIONS: {
    COMPLETE_WORK: gql`
      mutation CompleteBoardingManageWork($workId: String!) {
        completeBoardingManageWork(workId: $workId)
      }
    `,
    INCOMPLETE_WORK: gql`
      mutation InCompleteBoardingManageWork($workId: String!) {
        inCompleteBoardingManageWork(workId: $workId)
      }
    `,
    UPLOAD_WORK_FILE: gql`
      mutation UploadBoardingManageWorkFile($workId: String!, $file: String!) {
        uploadBoardingManageWorkFile(boardingManageWorkFileUploadInput: { workId: $workId, file: $file })
      }
    `,
  }
};

export const BoardingService = {
  getManageBoardingHouseList: async (client: ApolloClient<any>): Promise<BoardingHouse[]> => {
    const { data } = await client.query<{ getManageBoardingHouseList: BoardingHouse[] }>({
      query: BoardingGQL.QUERIES.GET_MANAGE_HOUSE_LIST,
      fetchPolicy: 'no-cache'
    });
    return data?.getManageBoardingHouseList ?? [];
  },
  getManageBoardingRoomList: async (client: ApolloClient<any>, houseId: string): Promise<RoomContract[]> => {
    const { data } = await client.query<{ getManageBoardingRoomList: RoomContract[] }>({
      query: BoardingGQL.QUERIES.GET_MANAGE_ROOM_LIST,
      variables: { houseId },
      fetchPolicy: 'no-cache'
    });
    return data?.getManageBoardingRoomList ?? [];
  },
  getRoomContractList: async (client: ApolloClient<any>, roomId: string): Promise<RoomContract | null> => {
    const { data } = await client.query<{ getRoomContractList: RoomContract }>({
      query: BoardingGQL.QUERIES.GET_ROOM_CONTRACT_LIST,
      variables: { roomId },
      fetchPolicy: 'no-cache'
    });
    return data?.getRoomContractList ?? null;
  },
  getBoardingManageWork: async (client: ApolloClient<any>, input: BoardingManageWorkReadInput): Promise<BoardingManageWork[]> => {
    const { data } = await client.query<{ getBoardingManageWork: BoardingManageWork[] }>({
      query: BoardingGQL.QUERIES.GET_BOARDING_MANAGE_WORK,
      variables: { date: input.date, houseId: input.houseId },
      fetchPolicy: 'no-cache'
    });
    return data?.getBoardingManageWork ?? [];
  },
  completeWork: async (client: ApolloClient<any>, workId: string): Promise<string> => {
    const { data } = await client.mutate<{ completeBoardingManageWork: string }>({
      mutation: BoardingGQL.MUTATIONS.COMPLETE_WORK,
      variables: { workId }
    });
    return data?.completeBoardingManageWork ?? '';
  },
  inCompleteWork: async (client: ApolloClient<any>, workId: string): Promise<string> => {
    const { data } = await client.mutate<{ inCompleteBoardingManageWork: string }>({
      mutation: BoardingGQL.MUTATIONS.INCOMPLETE_WORK,
      variables: { workId }
    });
    return data?.inCompleteBoardingManageWork ?? '';
  },
  uploadWorkFile: async (client: ApolloClient<any>, input: BoardingManageWorkFileUploadInput): Promise<string> => {
    const { data } = await client.mutate<{ uploadBoardingManageWorkFile: string }>({
      mutation: BoardingGQL.MUTATIONS.UPLOAD_WORK_FILE,
      variables: { workId: input.workId, file: input.file }
    });
    return data?.uploadBoardingManageWorkFile ?? '';
  }
};