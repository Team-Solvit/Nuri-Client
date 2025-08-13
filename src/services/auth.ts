import { gql, ApolloClient } from '@apollo/client';
import { LocalLoginInput, LocalSignUpInput, TokenString } from '@/types/auth';

export const LOCAL_LOGIN = gql`
  mutation LocalLogin($input: LocalLoginRequest!) {
    localLogin(request: $input)
  }
`;

export const LOCAL_SIGN_UP = gql`
  mutation LocalSignUp($input: LocalSignUpRequest!) {
    localSignUp(request: $input)
  }
`;

export async function localLogin(client: ApolloClient<any>, input: LocalLoginInput): Promise<TokenString> {
  const { data } = await client.mutate<{ localLogin: TokenString }>({
    mutation: LOCAL_LOGIN,
    variables: { input },
    fetchPolicy: 'no-cache',
  });
  return data?.localLogin ?? '';
}

export async function localSignUp(client: ApolloClient<any>, input: LocalSignUpInput): Promise<TokenString> {
  const { data } = await client.mutate<{ localSignUp: TokenString }>({
    mutation: LOCAL_SIGN_UP,
    variables: { input },
  });
  return data?.localSignUp ?? '';
}
