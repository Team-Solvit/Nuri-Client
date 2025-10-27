import {ApolloClient, gql} from "@apollo/client";
import {RoomCreateRequestDto, RoomInviteRequestDto} from "@/types/message";

export const MessageQueries = {
	GET_ROOM_MEMBER:gql`
		query getUserIds($roomId: String!) {
			getUserIds(roomId: $roomId)
		}
	`,
	GET_ROOMS_CHAT_LIST: gql`
    query GetRooms($page: Int!, $size: Int!) {
      getRooms(page: $page, size: $size) {
        roomDto {
          id
          name
          profile
          memberCount
        }
        newMessageCount
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
		const response = await client.mutate({
			mutation: MessageMutations.CREATE_ROOM,
			variables: {
				input: roomCreateInput,
			},
			refetchQueries: [
				{ query: MessageQueries.GET_ROOMS_CHAT_LIST, variables: { page: 0, size: 10 } }
			],
			awaitRefetchQueries: true,
			fetchPolicy: 'no-cache',
		});
		return response;
	},
	inviteUserInChatRoom: async (client: ApolloClient<any>, roomInviteInput: RoomInviteRequestDto, onSuccess: (num:number) => void) => {
		return client.mutate({
			mutation: MessageMutations.INVITE,
			variables: {
				input: roomInviteInput,
			},
		}).then(()=>{
			onSuccess(roomInviteInput?.users?.length)
		})
	},
	exitChatRoom: async (
		client: ApolloClient<any>,
		roomId: string,
		page: number
	) => {
		// EXIT mutation 실행
		await client.mutate({
			mutation: MessageMutations.EXIT,
			variables: { roomId },
		});

		// GET_ROOMS_CHAT_LIST 쿼리 실행 후 결과 반환
		const result = await client.query({
			query: MessageQueries.GET_ROOMS_CHAT_LIST,
			variables: { page: page ?? 0, size: 10 },
			fetchPolicy: 'network-only', // 최신 데이터 가져오기
		});

		return result;
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