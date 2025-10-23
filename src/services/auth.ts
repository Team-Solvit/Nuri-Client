import { gql, ApolloClient } from '@apollo/client';
import type { LoginUserResponse } from '@/types/auth';
import { LocalLoginInput, LocalSignUpInput, LoginOAuthCodeInput, OAuthLoginResponse, TokenString, OAuthSignUpInput } from '@/types/auth';
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
		VALIDATE_USER_ID: gql`
      query ValidateUserId($userId: String!) {
        validateUserId(userId: $userId)
      }
    `,

	},
	MUTATIONS: {
		LOCAL_LOGIN: gql`
      mutation LocalLogin($input: LocalLoginInput!) {
        localLogin(localLoginInput: $input) {
          id
          userId
          country
          language
          name
          email
          role
          profile
        }
      }
    `,
		LOCAL_SIGN_UP: gql`
      mutation LocalSignUp($input: LocalSignUpInput!) {
        localSignUp(localSignUpInput: $input)
      }
    `,
		REISSUE: gql`
      mutation Reissue {
        reissue {
          id
          userId
          country
          language
          name
          email
          role
          profile
        }
      }
    `,
		LOGOUT: gql`
      mutation Logout { logout }
    `,
		OAUTH_LOGIN: gql`
      mutation OAuth2Login($input: OAuth2LoginInput!) {
        oauth2Login(oauth2LoginInput: $input) {
          user {
            id
            userId
            country
            language
            name
            email
            role
            profile
          }
          oauthId
          isNewUser
        }
      }
    `,
		SEND_MAIL_CODE: gql`
      mutation SendMailCode($email: String!) {
        sendMailCode(email: $email)
      }
    `,
		VERIFY_MAIL_CODE: gql`
      mutation VerifyMailCode($input: MailCodeVerifyInput!) {
        verifyMailCode(mailCodeVerifyInput: $input)
      }
    `,
		OAUTH_SIGN_UP: gql`
      mutation OAuth2SignUp($input: OAuth2SignUpInput!) {
        oauth2SignUp(oauth2SignUpInput: $input)
      }
    `,
		UPDATE_PASSWORD: gql`
      mutation UpdatePasswordWithEmail($input: PasswordUpdateInput!) {
        updatePasswordWithEmail(passwordUpdateInput: $input)
      }
    `,
		WITHDRAW_USER: gql`
      mutation WithdrawUser($emailVerifyTicket: String!) {
        withdrawUser(emailVerifyTicket: $emailVerifyTicket)
      }
    `,
	}
};

export const AuthService = {
	localLogin: async (client: ApolloClient<any>, input: LocalLoginInput) => {
		const res = await client.mutate<{ localLogin: LoginUserResponse }>({
			mutation: AuthGQL.MUTATIONS.LOCAL_LOGIN,
			variables: { input },
			fetchPolicy: 'no-cache',
		});

		const headers = headersToObject((res as any).__headers);
		const status = (res as any).__status as number | undefined;

		return {
			user: res.data?.localLogin,
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
	reissue: async (client: ApolloClient<any>) => {
		const res = await client.mutate<{ reissue: LoginUserResponse }>({
			mutation: AuthGQL.MUTATIONS.REISSUE,
			fetchPolicy: 'no-cache'
		});
		const headers = headersToObject((res as any).__headers);
		const status = (res as any).__status as number | undefined;
		return {
			user: res.data?.reissue,
			headers,
			status,
		};
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
	validateUserId: async (client: ApolloClient<any>, userId: string): Promise<boolean> => {
		const { data } = await client.query<{ validateUserId: boolean }>({
			query: AuthGQL.QUERIES.VALIDATE_USER_ID,
			variables: { userId },
			fetchPolicy: 'no-cache'
		});
		return !!data?.validateUserId;
	},
	sendMailCode: async (client: ApolloClient<any>, email: string): Promise<string> => {
		const { data } = await client.mutate<{ sendMailCode: string }>({
			mutation: AuthGQL.MUTATIONS.SEND_MAIL_CODE,
			variables: { email },
			fetchPolicy: 'no-cache'
		});
		return data?.sendMailCode ?? '';
	},
	verifyMailCode: async (client: ApolloClient<any>, email: string, code: string): Promise<string> => {
		const { data } = await client.mutate<{ verifyMailCode: string }>({
			mutation: AuthGQL.MUTATIONS.VERIFY_MAIL_CODE,
			variables: { input: { email, code } },
			fetchPolicy: 'no-cache'
		});
		return data?.verifyMailCode ?? '';
	},
	oauthSignUp: async (client: ApolloClient<any>, input: OAuthSignUpInput): Promise<TokenString> => {
		const { data } = await client.mutate<{ oauthSignUp: TokenString }>({
			mutation: AuthGQL.MUTATIONS.OAUTH_SIGN_UP,
			variables: { input },
		});
		return data?.oauthSignUp ?? '';
	},
	updatePasswordWithEmail: async (client: ApolloClient<any>, email: string, emailVerifyTicket: string, password: string): Promise<string> => {
		const { data } = await client.mutate<{ updatePasswordWithEmail: string }>({
			mutation: AuthGQL.MUTATIONS.UPDATE_PASSWORD,
			variables: {
				input: {
					email,
					emailVerifyTicket,
					password,
				},
			},
			fetchPolicy: 'no-cache',
		});
		return data?.updatePasswordWithEmail ?? '';
	},
	withdrawUser: async (client: ApolloClient<any>, emailVerifyTicket: string): Promise<boolean> => {
		const { data } = await client.mutate<{ withdrawUser: boolean }>({
			mutation: AuthGQL.MUTATIONS.WITHDRAW_USER,
			variables: { emailVerifyTicket },
			fetchPolicy: 'no-cache',
		});
		return data?.withdrawUser ?? false;
	},
};