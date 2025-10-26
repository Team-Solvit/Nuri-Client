import {gql} from 'apollo-server';

export const typeDefs = gql`
  # --- Post 관련 타입 ---
  enum ShareRange {
    ALL
    FRIENDS
    PRIVATE
  }

  input CreatePostInput {
    postInfo: PostInfoInput!
    files: [String!]!
    hashTags: [String!]!
  }

  input PostInfoInput {
    title: String!
    contents: String!
    shareRange: ShareRange!
    isGroup: Boolean!
  }

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

  # --- Boarding 관련 타입 ---
  type BoardingUser {
    profile: String
    userId: Int!
    name: String
    email: String
    id: ID
  }

  type BoardingHost {
    id: ID
    name: String
    email: String
    user: BoardingUser
  }

  type BoardingHouse {
    houseId: ID!
    host: BoardingHost
    name: String
    location: String
    houseCallNumber: String
    description: String
    nearestStation: String
    nearestSchool: String
    gender: String
    isMealProvided: Boolean
  }

  type BoardingRoomFile {
    roomId: Int!
    fileId: Int!
    url: String!
  }

  type ContractPeriod {
    contractPeriodId: Int!
    contractPeriod: String!
  }

  type BoardingRoomOption {
    optionId: Int!
    name: String!
  }

  type BoardingRoom {
    roomId: Int!
    name: String!
    description: String
    monthlyRent: Float
    headCount: Int
    status: String
    day: String
    boardingHouse: BoardingHouse
    boardingRoomFile: [BoardingRoomFile!]!
    contractPeriod: [ContractPeriod!]!
    boardingRoomOption: [BoardingRoomOption!]!
  }

  type Boarder {
    id: ID!
    name: String!
    profile : String!
  }

  type BoardingRoomAndBoarders {
    room: BoardingRoom!
    boarders: [Boarder!]!
  contractInfo: [ContractInfo!]!
 }

type ContractInfo {
  boarder: Boarder!
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

  # --- 하숙집 검색 관련 타입 ---
  type Location {
    lat: Float!
    lon: Float!
    radiusMeters: String!
  }

  type ContractPeriod {
    min: Int!
    max: Int!
  }

  type Price {
    min: Int!
    max: Int!
  }

  type BoardingRoomSearchFilter {
    school: Location
    station: Location
    contractPeriod: ContractPeriod
    price: Price
    region: String
    start: Int
    name: String
  }

  type BoardingRoom {
    roomId: ID!
    name: String!
    description: String
    monthlyRent: Int!
    headCount: Int!
    likeCount: Int!
    isLiked: Boolean!
    commentCount: Int!
    status: String!
    day: String!
  }

  # --- Query ---
  type Query {
    getPostList(start: Int!): [Post!]!
    getAlertList: [Alert!]!
    getAlertCount: Int!

    # BoardingHouse 관련 쿼리 추가
    getMyBoardingHouse: BoardingHouse
    getBoardingRoomAndBoardersInfoList(userId: String): [BoardingRoomAndBoarders!]!
    getBoardingRoom(roomId: String!): BoardingRoom
  }

  # --- Mutation ---
  type Mutation {
    createPost(createPostInput: CreatePostInput!): Boolean!
  }
`;