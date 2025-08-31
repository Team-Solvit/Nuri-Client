
import { gql, ApolloClient } from '@apollo/client';
import { PostCreateInput, CreatePostResponse } from '@/types/post';

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
  client: ApolloClient<any>, 
  postCreateInput: PostCreateInput
): Promise<boolean> => {
  const { data } = await client.mutate<CreatePostResponse>({
    mutation: PostGQL.MUTATIONS.CREATE_POST,
    variables: { postCreateInput },
  });
  
  return data?.createPost ?? false;
};