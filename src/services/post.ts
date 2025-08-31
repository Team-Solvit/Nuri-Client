import {gql} from "@apollo/client";

export const PostQueries = {
	GET_POST_LIST: gql`
		 query MyQuery {
		  getPostList(start: 0) {
		    postInfo {
		      ... on SnsPost {
		        postId
		        title
		        commentCount
		        author {
		          profile
		          userId
		        }
		        contents
		        day
		        files {
		          fileId
		          postId
		          url
		        }
		        isGroup
		        likeCount
		      }
		      ... on BoardingPost {
			        likeCount
			        commentCount
			        room {
			          boardingHouse {
			            host {
			                user {
				                profile
				                userId
			                }
			            },
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
			          day
			          headCount
			          description
			          monthlyRent
			          name
			          roomId
			        }
			      }
		    }
		    postType
		  }
		}
  `
}