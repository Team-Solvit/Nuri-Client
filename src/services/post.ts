
import { gql, ApolloClient } from '@apollo/client';
import { PostCreateInput, CreatePostResponse } from '@/types/post';

export const PostGQL = {
  MUTATIONS: {
    CREATE_POST: gql`
      mutation CreatePost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput)
      }
    `,
  },
};

export const createPost = async (
  client: ApolloClient<any>, 
  createPostInput: PostCreateInput
): Promise<boolean> => {
  const { data } = await client.mutate<CreatePostResponse>({
    mutation: PostGQL.MUTATIONS.CREATE_POST,
    variables: { createPostInput },
  });
  
  return data?.createPost ?? false;
};