import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { UserSearchResult } from '@/types/user';

export const UserGQL = {
  QUERIES: {
    QUERY_USERS: gql`
      query QueryUsers($userId: String!) {
        queryUsers(userId: $userId) {
          profile
          name
          userId
        }
      }
    `,
    QUERY_USER: gql`
      query QueryUser($userId: String!) {
        queryUser(userId: $userId) {
          profile
          introduce
          name
          userId
        }
      }
    `,
    GET_USER_PROFILE: gql`
      query GetUserProfile($userId: String!) {
        getUserProfile(userId: $userId) {
          postCount
          followerCount
          followingCount
          profile
          userId
          introduce
          isFollowing
        }
      }
    `,
  },
  MUTATIONS: {
    UPDATE_PROFILE: gql`
      mutation UpdateProfile($input: ProfileUpdateInput!) {
        updateProfile(profileUpdateRequest: $input)
      }
    `,
    CHANGE_PASSWORD: gql`
      mutation ChangePassword($input: PasswordChangeInput!) {
        changePassword(passwordRequestDto: $input)
      }
    `,
  },
};

export const UserService = {
  async searchUsers(
    client: ApolloClient<NormalizedCacheObject>,
    userId: string
  ): Promise<UserSearchResult[]> {
    const { data } = await client.query({
      query: UserGQL.QUERIES.QUERY_USERS,
      variables: { userId },
      fetchPolicy: 'network-only',
    });
    return data?.queryUsers || [];
  },
};
