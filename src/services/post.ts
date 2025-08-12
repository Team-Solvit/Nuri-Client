import {gql} from "@apollo/client";

export const PostQueries = {
	GET_POST_LIST: gql`
    query GetPostList($start: Int!) {
      getPostList(start: $start) {
        postType
        postInfo {
          ... on SnsPostInfo {
            postId
            title
            likeCount
            commentCount
            author {
              id
              name
            }
          }
          ... on BoardingPostInfo {
            room {
              roomId
              name
            }
            likeCount
            commentCount
          }
        }
      }
    }
  `
}