import { gql, ApolloClient } from '@apollo/client';
import { UserProfileResponseDto, ChangeProfileRequest, FollowUserInfoResponseDto, FollowUserInfo, FollowerUserInfo } from '@/types/profile';

export const ProfileGQL = {
  QUERIES: {
    GET_USER_PROFILE: gql`
      query GetUserProfile($userId: String!) {
        getUserProfile(userId: $userId) {
          postCount
          followerCount
          followingCount
          profile
          userId
        }
      }
    `,
    GET_FOLLOWERS: gql`
      query GetFollowerInfo($userId: String!) {
        getFollowerInfo(userId: $userId) {
          id
          userId
          profile
        }
      }
    `,
    GET_FOLLOWING: gql`
      query GetFollowingInfo($userId: String!) {
        getFollowingInfo(userId: $userId) {
          id
          userId
          profile
        }
      }
    `,

  },
  MUTATIONS: {
    CHANGE_PROFILE: gql`
      mutation ChangeProfile($profile: String!) {
        changeProfile(profile: $profile)
      }
    `,
    FOLLOW: gql`
      mutation Follow($userId: String!) {
        follow(userId: $userId)
      }
    `,
    UNFOLLOW: gql`
      mutation Unfollow($userId: String!) {
        unfollow(userId: $userId)
      }
    `,
  },
};

export const getUserProfile = async (client: ApolloClient<any>, userId: string): Promise<UserProfileResponseDto> => {
  const { data } = await client.query({
    query: ProfileGQL.QUERIES.GET_USER_PROFILE,
    variables: { userId },
    fetchPolicy: 'network-only',
  });
  return data.getUserProfile;
};

export const changeProfile = async (client: ApolloClient<any>, profile: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: ProfileGQL.MUTATIONS.CHANGE_PROFILE,
    variables: { profile },
  });
  return data.changeProfile;
};

export const getFollowers = async (client: ApolloClient<any>, userId: string): Promise<FollowUserInfoResponseDto[]> => {
  const { data } = await client.query({
    query: ProfileGQL.QUERIES.GET_FOLLOWERS,
    variables: { userId },
    fetchPolicy: 'network-only',
  });
  return data.getFollowerInfo;
};

export const getFollowing = async (client: ApolloClient<any>, userId: string): Promise<FollowUserInfoResponseDto[]> => {
  const { data } = await client.query({
    query: ProfileGQL.QUERIES.GET_FOLLOWING,
    variables: { userId },
    fetchPolicy: 'network-only',
  });
  return data.getFollowingInfo;
};



export const followUser = async (client: ApolloClient<any>, userId: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: ProfileGQL.MUTATIONS.FOLLOW,
    variables: { userId },
  });
  return data.follow;
};

export const unfollowUser = async (client: ApolloClient<any>, userId: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: ProfileGQL.MUTATIONS.UNFOLLOW,
    variables: { userId },
  });
  return data.unfollow;
};
