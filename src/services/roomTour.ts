import {gql} from "@apollo/client";

export const RoomTourQueries = {
	GET_ROOM_TOUR: gql`
		query getRoomTour($roomTourId: String!){
		getRoomTour(roomTourId: $roomTourId){
				user {
					id
          userId
	        name
				}
		    boarderRoom {
		      name
		      boardingHouse {
		        name
		        location
		        lat
            lon
		      }
		    }
		    host {
		      callNumber
          user {
            id
	          userId
		        name
          }
		    }
		    time
		    status
			}
		}
	`,
}

export const RoomTourMutations = {
	ACCEPT_ROOM_TOUR: gql`
	mutation approveRoomTour($roomTourId: String!) {
			approveRoomTour(roomTourId: $roomTourId)
		}
	`,
	REJECT_ROOM_TOUR: gql`
		mutation rejectRoomTour($roomTourId: String!) {
			rejectRoomTour(roomTourId: $roomTourId)
		}
	`
}