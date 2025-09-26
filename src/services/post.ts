import { gql } from "@apollo/client";

export const PostQueries = {
	GET_POST_LIST: gql`
		 query MyQuery {
		  getPostList(start: 0) {
		    postInfo {
		      ... on SnsPost {
		        postId
		        title
		        contents
		        day
		        commentCount
		        likeCount
		        isGroup
		        files {
		          fileId
		          postId
		          url
		        }
		        author {
		          profile
		          userId
		        }
		      }
		      ... on BoardingPost {
		        room {
		          roomId
		          name
		          description
		          monthlyRent
		          day
		          headCount
		          likeCount
		          isLiked
		          commentCount
		          boardingHouse {
		            host {
		                user {
			                profile
			                userId
		                }
		            }
		          }
		          boardingRoomFile {
		            roomId
		            fileId
		            url
		          }
		          contractPeriod {
		            contractPeriod
		            roomId
		            contractPeriodId
		          }
		        }
		      }
		    }
		    postType
		  }
		}
  `
}