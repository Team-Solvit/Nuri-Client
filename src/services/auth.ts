import { gql, ApolloClient } from '@apollo/client';
import { LocalLoginInput, LocalSignUpInput, LoginOAuthCodeInput, OAuthLoginResponse, TokenString } from '@/types/auth';
import { headersToObject } from '@/utils/headers';

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
    GET_SOCIAL_URL: gql`
      query GetOAuth2Link($provider: String!) {
        getOAuth2Link(provider: $provider)
      }
    `,
  },
  MUTATIONS: {
    LOCAL_LOGIN: gql`
      mutation LocalLogin($input: LocalLoginInput!) {
        localLogin(localLoginInput: $input)
      }
    `,
    LOCAL_SIGN_UP: gql`
      mutation LocalSignUp($input: LocalSignUpInput!) {
        localSignUp(localSignUpInput: $input)
      }
    `,
    REISSUE: gql`
      mutation Reissue { reissue }
    `,
    LOGOUT: gql`
      mutation Logout { logout }
    `,
    OAUTH_LOGIN: gql`
      mutation OAuth2Login($input: OAuth2LoginInput!) {
        oauth2Login(oauth2LoginInput: $input) {
          oauthId
          isNewUser
        }
      }
    `,
  }
};

export const AuthService = {
  localLogin: async (client: ApolloClient<any>, input: LocalLoginInput) => {
    const res = await client.mutate<{ localLogin: TokenString }>({
      mutation: AuthGQL.MUTATIONS.LOCAL_LOGIN,
      variables: { input },
      fetchPolicy: 'no-cache',
    });

    const headers = headersToObject((res as any).__headers);
    const status = (res as any).__status as number | undefined;

    return {
      tokenFromBody: res.data?.localLogin ?? '',
      headers,
      status,
    };
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
  oauthLogin: async (client: ApolloClient<any>, input: LoginOAuthCodeInput) => {
    const res = await client.mutate<{ oauth2Login: OAuthLoginResponse }>({
      mutation: AuthGQL.MUTATIONS.OAUTH_LOGIN,
      variables: { input },
      fetchPolicy: 'no-cache',
    });

    const headers = headersToObject((res as any).__headers);
    const status = (res as any).__status as number | undefined;

    return {
      response: res.data?.oauth2Login,
      headers,
      status,
    };
  },
};