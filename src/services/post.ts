import {gql} from "@apollo/client";

export const PostQueries = {
	GET_POST_LIST: gql`
		 query MyQuery($start: Int!){
		  getPostList(start: $start) {
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
			        room {
			          roomId
						    boardingHouse{
							    host {
                     user {
                        profile
										    userId
										    name
                     }
							    }
						    }
						    name
						    description
						    monthlyRent
						    likeCount
						    commentCount
						    boardingRoomFile{
						      fileId
							    roomId
							    url
						    }
						    day
			        }
			      }
		    }
		    postType
		  }
		}
  `
}