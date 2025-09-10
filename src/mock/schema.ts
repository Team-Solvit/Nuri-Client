import {gql} from 'apollo-server';

export const typeDefs = gql`
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
    getPostList(start: Int!): [Post]!
    getAlertList: [Alert]!
    getAlertCount: Int!
    searchBoardingRoom(boardingRoomSearchFilter: BoardingRoomSearchFilter!): [BoardingRoom]!
  }
`;