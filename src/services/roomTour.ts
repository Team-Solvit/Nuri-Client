
import { gql, ApolloClient } from '@apollo/client';

export const RoomTourGQL = {
  CREATE_ROOM_TOUR: gql`
    mutation CreateRoomTour($roomTourCreateRequestDto: RoomTourCreateRequestDto!) {
      createRoomTour(roomTourCreateRequestDto: $roomTourCreateRequestDto)
    }
  `,
};

export const RoomTourService = {
  createRoomTour: async (
    client: ApolloClient<any>,
    input: {
      boardingRoomId: string;
      time: string; // ISO string
    }
  ): Promise<string> => {
    const { data } = await client.mutate({
      mutation: RoomTourGQL.CREATE_ROOM_TOUR,
      variables: { roomTourCreateRequestDto: input },
    });
    return data?.createRoomTour ?? '';
  },
};
