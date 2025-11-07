import { gql } from '@apollo/client';

export const PhoneAuthGQL = {
  MUTATIONS: {
    SEND_MESSAGE: gql`
      mutation SendMessage($callNumberRequestDto: CallNumberRequestDto!) {
        sendMessage(callNumberRequestDto: $callNumberRequestDto)
      }
    `,
    AUTHENTICATE: gql`
      mutation Authenticate($callNumberAuthenticateRequestDto: CallNumberAuthenticateRequestDto!) {
        authenticate(callNumberAuthenticateRequestDto: $callNumberAuthenticateRequestDto)
      }
    `,
  },
};
