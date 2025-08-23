import {gql} from 'apollo-server';

export const typeDefs = gql`
  # --- Author 타입 ---
  type Author {
    profile: String
    userId: Int!
  }

  # --- SnsPost 파일 타입 ---
  type SnsPostFile {
    fileId: Int!
    postId: Int!
    url: String!
  }

  # --- SnsPost 타입 ---
  type SnsPost {
    postId: Int!
    title: String!
    commentCount: Int
    likeCount: Int
    author: Author
    contents: String
    day: String
    files: [SnsPostFile!]!
    isGroup: Boolean
  }

  # --- BoardingPost 관련 타입 ---
  type BoardingUser {
    profile: String
    userId: Int!
  }

  type BoardingHost {
    user: BoardingUser!
  }

  type BoardingHouse {
    host: BoardingHost!
  }

  type BoardingRoomFile {
    roomId: Int!
    fileId: Int!
    url: String!
  }

  type ContractPeriod {
    contractPeriodId: Int!
    roomId: Int!
    contractPeriod: String!
  }

  type BoardingRoom {
    boardingHouse: BoardingHouse!
    boardingRoomFile: [BoardingRoomFile!]!
    contractPeriod: [ContractPeriod!]!
    day: String
    headCount: Int
    description: String
    monthlyRent: Float
    name: String!
    roomId: Int!
  }

  type BoardingPost {
    likeCount: Int
    commentCount: Int
    room: BoardingRoom!
  }

  # --- Union 타입 ---
  union PostInfo = SnsPost | BoardingPost

  # --- Post 타입 ---
  type Post {
    postType: String!
    postInfo: PostInfo!
  }

  # --- Alert 관련 타입 ---
  type Alert {
    alertId: ID!
    alertContent: String!
    alertNavigate: String
  }

  # --- Query ---
  type Query {
    getPostList(start: Int!): [Post!]!
    getAlertList: [Alert!]!
    getAlertCount: Int!
  }
`;