import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PostCreateInput, CreatePostResponse } from '@/types/post';

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

export const PostGQL = {
  MUTATIONS: {
    CREATE_POST: gql`
      mutation CreatePost($postCreateInput: PostCreateInput!) {
        createPost(postCreateInput: $postCreateInput)
      }
    `,
  },
};

export const createPost = async (
  client: ApolloClient<NormalizedCacheObject>, 
  postCreateInput: PostCreateInput
): Promise<boolean> => {
  const { data } = await client.mutate<CreatePostResponse>({
    mutation: PostGQL.MUTATIONS.CREATE_POST,
    variables: { postCreateInput: postCreateInput },
  });
  
  return data?.createPost ?? false;
};
