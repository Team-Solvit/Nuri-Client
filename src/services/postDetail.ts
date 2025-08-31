import { gql } from '@apollo/client';

export const PostDetailQueries = {
  GET_POST_LIST_LIGHT: gql`
    query GetPostListLight($start: Int!) {
      getPostList(start: $start) {
        postType
        postInfo {
          ... on SnsPost {
            __typename
            postId
            title
            contents
            day
            likeCount
            commentCount
            author { userId profile }
            files { fileId url }
          }
          ... on BoardingPost {
            __typename
            likeCount
            commentCount
            room {
              roomId
              name
              description
              monthlyRent
              day
              status
              headCount
              boardingHouse {
                houseId
                name
                location
                nearestStation
                nearestSchool
                gender
                isMealProvided
                host { user { userId profile } callNumber }
              }
              contractPeriod { contractPeriod contractPeriodId }
              boardingRoomFile { fileId url }
              boardingRoomOption { optionId name }
            }
          }
        }
      }
    }
  `
};
