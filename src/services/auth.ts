import { gql, ApolloClient } from '@apollo/client';
import { LocalLoginInput, LocalSignUpInput, TokenString } from '@/types/auth';

export const AuthGQL = {
  QUERIES: {
    ME: gql`
      query Me {
        me {
          id
          role
        }
      }
    `,
  },
  MUTATIONS: {
    LOCAL_LOGIN: gql`
      mutation LocalLogin($input: localLoginRequest!) {
        localLogin(localLoginInput: $input)
      }
    `,
    LOCAL_SIGN_UP: gql`
      mutation LocalSignUp($input: localSignUpRequest!) {
        localSignUp(localSignUpInput: $input)
      }
    `,
    REISSUE: gql`
      mutation Reissue { reissue }
    `,
    LOGOUT: gql`
      mutation Logout { logout }
    `,
  }
};

export const AuthService = {
  localLogin: async (client: ApolloClient<any>, input: LocalLoginInput): Promise<TokenString> => {
    const { data } = await client.mutate<{ localLogin: TokenString }>({
      mutation: AuthGQL.MUTATIONS.LOCAL_LOGIN,
      variables: { input },
      fetchPolicy: 'no-cache',
    });
    return data?.localLogin ?? '';
  },
  localSignUp: async (client: ApolloClient<any>, input: LocalSignUpInput): Promise<TokenString> => {
    const { data } = await client.mutate<{ localSignUp: TokenString }>({
      mutation: AuthGQL.MUTATIONS.LOCAL_SIGN_UP,
      variables: { input },
    });
    return data?.localSignUp ?? '';
  },
  reissue: async (client: ApolloClient<any>): Promise<TokenString> => {
    const { data } = await client.mutate<{ reissue: TokenString }>({
      mutation: AuthGQL.MUTATIONS.REISSUE,
      fetchPolicy: 'no-cache'
    });
    return data?.reissue ?? '';
  },
  logout: async (client: ApolloClient<any>): Promise<TokenString> => {
    const { data } = await client.mutate<{ logout: TokenString }>({
      mutation: AuthGQL.MUTATIONS.LOGOUT,
      fetchPolicy: 'no-cache'
    });
    return data?.logout ?? '';
  },
};

// (기존 export 함수 사용처가 있으면 아래 alias 유지 가능)
export const localLogin = AuthService.localLogin;
export const localSignUp = AuthService.localSignUp;
