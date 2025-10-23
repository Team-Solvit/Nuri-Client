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

  # --- Query ---
  type Query {
    getPostList(start: Int!): [Post]!
    getAlertList: [Alert]!
    getAlertCount: Int!
  }

  # --- Mutation ---
  type Mutation {
    createPost(createPostInput: CreatePostInput!): Boolean!
  }
`;