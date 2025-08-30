import { gql } from 'apollo-server';

export const typeDefs = gql`
  # --- User 관련 타입 ---
  type User {
    id: ID!
    name: String!
    profileImage: String
    bio: String
    followerCount: Int!
    followingCount: Int!
  }

  # --- Post 관련 타입 ---
  type Author {
    id: ID!
    name: String!
  }

  type SnsPostInfo {
    postId: ID!
    title: String!
    likeCount: Int
    commentCount: Int
    author: Author
  }

  type BoardingPostInfo {
    room: Room
    likeCount: Int
    commentCount: Int
  }

  type Room {
    roomId: ID!
    name: String!
  }

  union PostInfo = SnsPostInfo | BoardingPostInfo

  type Post {
    postType: String!
    postInfo: PostInfo!
  }

  # --- Alert 관련 타입 ---
  type Alert {
    alertId: ID!
    alertContent: String!
    alertDate: String!
    alertNavigate: String
  }

  type FollowUserInfoResponseDto {
    id: ID!
    userId: String!
    profile: String
  }

  type UserProfileResponseDto {
    postCount: Int!
    followerCount: Int!
    followingCount: Int!
    profile: String!
    userId: String!
  }

  # --- Query ---
  type Query {
    getPostList(start: Int!): [Post]!
    getAlertList: [Alert]!
    getAlertCount: Int!
    getUser(id: ID!): User
    getFollowStatus(followerId: ID!, followingId: ID!): Boolean!
    getFollowerInfo(userId: String!): [FollowUserInfoResponseDto!]!
    getFollowingInfo(userId: String!): [FollowUserInfoResponseDto!]!
    getUserProfile(userId: String!): UserProfileResponseDto!
  }

  # --- Mutation ---
  type Mutation {
    follow(userId: String!): Boolean
    unfollow(userId: String!): Boolean
    changeProfile(profile: String!): Boolean!
  }
`;