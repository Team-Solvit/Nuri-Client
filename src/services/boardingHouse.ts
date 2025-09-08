import {ApolloClient, gql} from '@apollo/client';
import {CreateBoardingHouseType} from "@/types/boardinghouse";

export const BoardingHouseQueries = {
	GET_BOARDING_HOUSE_INFO: gql`
		query {
		  getMyBoardingHouse {
		    houseId
		    host {
		     callNumber
         user {
          id
			    userId
			    country
			    language
			    name
			    email
			    introduce
			    profile
			    role
         }
		    }
		    name
		    location
		    houseCallNumber
		    description
		    nearestStation
		    nearestSchool
		    gender
		    isMealProvided
		  }
		}
	`,
	GET_BOARDING_HOUSE_ROOMS: gql`
		query getBoardingRoomAndBoardersInfoList {
		  getBoardingRoomAndBoardersInfoList {
		    room {
		      roomId
		      name
		      status
		      boardingRoomFile {
		        fileId
		        url
		      }
		    }
        contractInfo {
          boarder{
             callNumber
				     gender
				     user{
						    id
					      userId
					      name
					      profile
				     }
          }
        }
		  }
		}
	`,
	GET_BOARDING_HOUSE_ROOM_INFO: gql`
		query GetBoardingRoom($roomId: String!) {
		  getBoardingRoom(roomId: $roomId) {
		    roomId
		    name
		    description
		    monthlyRent
		    headCount
		    boardingRoomOption {
		      optionId
		      name
		    }
		    boardingRoomFile {
		      fileId
		      url
		    }
		    contractPeriod {
		      contractPeriodId
		      contractPeriod
		    }
		    day
		  }
		}
	`,
};

export const BoardingHouseMutations = {
	CREATE_BOARDING_ROOM: gql`
		mutation CreateBoardingRoom($input: BoardingRoomCreateInput!) {
		  createBoardingRoom(boardingRoomCreateInput: $input)
		}
	`,
	DELETE_BOARDING_ROOM: gql`
		mutation DeleteBoardingRoom($roomId: String!) {
		  deleteBoardingRoom(roomId: $roomId)
		}
	`,
	END_BOARDING_ROOM_CONTRACT: gql`
		mutation EndBoardingRoomContract($roomId: String!) {
		  endBoardingRoomContract(roomId: $roomId)
		}
	`,
	PATCH_BOARDING_ROOM: gql`
		mutation PatchBoardingRoom($roomId: String!, $input: PatchBoardingRoomRequest!) {
		  patchBoardingRoom(roomId: $roomId, patchBoardingRoomInput: $input)
		}
	`,
};

export const BoardingHouseService = {
	createBoardingRoom: async (
		client: ApolloClient<any>,
		input: CreateBoardingHouseType
	): Promise<string> => {
		const {data} = await client.mutate<{ createBoardingRoom: string }>({
			mutation: BoardingHouseMutations.CREATE_BOARDING_ROOM,
			variables: {input},
		});
		return data?.createBoardingRoom ?? "";
	},
	
	deleteBoardingRoom: async (
		client: ApolloClient<any>,
		roomId: string
	): Promise<string> => {
		const {data} = await client.mutate<{ deleteBoardingRoom: string }>({
			mutation: BoardingHouseMutations.DELETE_BOARDING_ROOM,
			variables: {roomId},
		});
		return data?.deleteBoardingRoom ?? "";
	},
	
	endBoardingRoomContract: async (
		client: ApolloClient<any>,
		roomId: string
	): Promise<string> => {
		const {data} = await client.mutate<{ endBoardingRoomContract: string }>({
			mutation: BoardingHouseMutations.END_BOARDING_ROOM_CONTRACT,
			variables: {roomId},
		});
		return data?.endBoardingRoomContract ?? "";
	},
	
	patchBoardingRoom: async (
		client: ApolloClient<any>,
		input: CreateBoardingHouseType & { roomId: string }
	): Promise<string> => {
		const {data} = await client.mutate<{ patchBoardingRoom: string }>({
			mutation: BoardingHouseMutations.PATCH_BOARDING_ROOM,
			variables: {input},
		});
		return data?.patchBoardingRoom ?? "";
	},
};