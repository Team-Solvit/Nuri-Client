import {gql} from '@apollo/client';

export const BoardingHouseQueries = {
	GET_BOARDING_HOUSE_INFO: gql`
		query {
		  getMyBoardingHouse {
		    houseId
		    host {
		      id
		      name
		      email
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
		query GetRoomsAndBoarders($userId: String) {
		  getBoardingRoomAndBoardersInfoList(userId: $userId) {
		    room {
		      roomId
		      name
		      status
		      boardingRoomFile {
		        fileId
		        url
		      }
		    }
		    boarders {
		      id
		      name
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
		mutation CreateBoardingRoom($input: CreateBoardingRoomRequest!) {
		  createBoardingRoom(createBoardingRoomInput: $input)
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