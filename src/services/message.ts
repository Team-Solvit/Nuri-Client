import {ApolloClient, gql} from "@apollo/client";
import {RoomCreateRequestDto, RoomInviteRequestDto} from "@/types/message";

export const MessageQueries = {
	GET_ROOMS_CHAT_LIST: gql`
      query GetRooms($page: Int!, $size: Int!) {
			  getRooms(page: $page, size: $size) {
			    content {
			      roomDto {
			        name
			        profile
			      }
			      latestMessage
			      latestCreatedAt
			    }
			    pageInfo {
			      pageNumber
			      pageSize
			      totalElements
			      totalPages
			    }
			  }
			}
    `,
	READ_MESSAGES: gql`
		query ReadMessages($roomId: String!) {
		  readMessages(roomId: $roomId) {
		    id
		    roomId
		    sender {
		      name
		      profile
		    }
		    createdAt
		    contents
		    replyChat {
		      chatId
		      contents
		      name
		    }
		  }
		}
	`,
}

export const MessageMutations = {
	CREATE_ROOM: gql`
		mutation CreateRoom($input: RoomCreateRequestDto!) {
		  createRoom(roomCreateRequestDto: $input) {
		    id
		    room {
		      name
		      profile
		    }
		    users
		  }
		}
	`,
	INVITE: gql`
		mutation Invite($input: RoomInviteRequestDto!) {
		  invite(roomInviteRequestDto: $input)
		}
	`,
	EXIT: gql`
		mutation Exit($roomId: String!) {
		  exit(roomId: $roomId)
		}
	`,
	KICK: gql`
		mutation Kick($roomId: String!, $userId: String!) {
		  kick(roomId: $roomId, userId: $userId)
		}
	`,
}


export const MessageService = {
	createChatRoom: async (client: ApolloClient<any>, roomCreateInput: RoomCreateRequestDto) => {
		await client.mutate({
			mutation: MessageMutations.CREATE_ROOM,
			variables: {
				input: roomCreateInput
			},
			fetchPolicy: 'no-cache',
		});
	},
	inviteUserInChatRoom: async (client: ApolloClient<any>, roomInviteInput: RoomInviteRequestDto) => {
		await client.mutate({
			mutation: MessageMutations.INVITE,
			variables: {
				input: roomInviteInput,
			},
		})
	},
	exitChatRoom: async (client: ApolloClient<any>, roomId: string) => {
		await client.mutate({
			mutation: MessageMutations.EXIT,
			variables: {
				roomId: roomId,
			},
		})
	},
	kickChatRoom: async (client: ApolloClient<any>, roomId: string, userId: string) => {
		await client.mutate({
			mutation: MessageMutations.KICK,
			variables: {
				roomId: roomId,
				userId: userId,
			}
		})
	}
}