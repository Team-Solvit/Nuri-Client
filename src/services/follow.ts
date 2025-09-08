import { gql, ApolloClient } from '@apollo/client';
import { FollowUserInfo, FollowResponse } from '@/types/auth';

export const FollowGQL = {
  QUERIES: {
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


export const getFollowers = async (client: ApolloClient<any>, userId: string): Promise<FollowUserInfo[]> => {
  const { data } = await client.query({
    query: FollowGQL.QUERIES.GET_FOLLOWERS,
    variables: { userId },
    fetchPolicy: 'network-only',
  });
  return data.getFollowerInfo;
};


export const getFollowing = async (client: ApolloClient<any>, userId: string): Promise<FollowUserInfo[]> => {
  const { data } = await client.query({
    query: FollowGQL.QUERIES.GET_FOLLOWING,
    variables: { userId },
    fetchPolicy: 'network-only',
  });
  return data.getFollowingInfo;
};

export const followUser = async (client: ApolloClient<any>, userId: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: FollowGQL.MUTATIONS.FOLLOW,
    variables: { userId },
  });
  return data.follow;
};

export const unfollowUser = async (client: ApolloClient<any>, userId: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: FollowGQL.MUTATIONS.UNFOLLOW,
    variables: { userId },
  });
  return data.unfollow;
};