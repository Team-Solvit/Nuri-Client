import {ApolloClient, gql} from "@apollo/client";
import {RoomCreateRequestDto, RoomInviteRequestDto} from "@/types/message";

export const MessageQueries = {
	GET_ROOMS_CHAT_LIST: gql`
    query GetRooms($page: Int!, $size: Int!) {
      getRooms(page: $page, size: $size) {
        roomDto {
          id
          name
          profile
        }
        latestMessage
        latestCreatedAt
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
	GET_CONNECT_MESSAGES_LIST: gql`
		query {
		  getRoomsGroupChat
		}
	`,
	GET_USER_SEARCH: gql`
		query Query($userId: String!) {
		  queryUsers(userId: $userId) {
		    userId
		    name
		    profile
		  }
		}
	`
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
		return client.mutate({
			mutation: MessageMutations.CREATE_ROOM,
			variables: {
				input: roomCreateInput,
			},
			refetchQueries: [
				{query: MessageQueries.GET_ROOMS_CHAT_LIST, variables: {page: 0, size: 10}}
			],
			awaitRefetchQueries: true,
			fetchPolicy: 'no-cache',
		});
	},
	inviteUserInChatRoom: async (client: ApolloClient<any>, roomInviteInput: RoomInviteRequestDto) => {
		return client.mutate({
			mutation: MessageMutations.INVITE,
			variables: {
				input: roomInviteInput,
			},
		})
	},
	exitChatRoom: async (client: ApolloClient<any>, roomId: string) => {
		return client.mutate({
			mutation: MessageMutations.EXIT,
			variables: {
				roomId: roomId,
			},
			refetchQueries: [
				{query: MessageQueries.GET_ROOMS_CHAT_LIST, variables: {page: 0, size: 10}}
			],
			awaitRefetchQueries: true,
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