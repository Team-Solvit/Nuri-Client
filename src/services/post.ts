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
							    houseId
							    host {
							       callNumber
                     user {
                       id
										    userId
										    name
                     }
							    }
							    name
							    location
						    }
						    name
						    description
						    monthlyRent
						    headCount
						    likeCount
						    isLiked
						    commentCount
						    status
						    boardingRoomOption{
						       optionId
								    roomId
								    name
						    }
						    boardingRoomFile{
						      fileId
							    roomId
							    url
						    }
						    contractPeriod{
						      contractPeriodId
							    roomId
							    contractPeriod
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