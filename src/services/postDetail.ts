import { gql, ApolloClient } from '@apollo/client';
import type { GetPostListLightResponse, GetPostListLightVars, PostDetailUnion, BoardingPostDetail, SnsPostDetail } from '@/types/postDetail';

export const PostDetailGQL = {
  QUERIES: {
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
            isLiked
            commentCount
            author { userId profile }
            files { fileId url }
          }
          ... on BoardingPost {
            __typename
            room {
              roomId
              name
              description
              monthlyRent
              day
              status
              headCount
              likeCount
              isLiked
              commentCount
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
  `,
  },
  MUTATIONS: {
    LIKE_POST: gql`
      mutation LikePost($postId: String!) {
        likePost(postId: $postId)
      }
    `,
    UNLIKE_POST: gql`
      mutation UnlikePost($postId: String!) {
        unlikePost(postId: $postId)
      }
    `,
    CREATE_POST_COMMENT: gql`
      mutation CreatePostComment($postId: String!, $contents: String!) {
        createPostComment(
          postCommentCreateInput: {
            postId: $postId
            contents: $contents
          }
        )
      }
    `,
    UPDATE_POST_COMMENT: gql`
      mutation UpdatePostComment($commentId: String!, $content: String!) {
        updatePostComment(
          postCommentUpdateInput: {
            commentId: $commentId
            content: $content
          }
        )
      }
    `,
    DELETE_POST_COMMENT: gql`
      mutation DeletePostComment($commentId: String!) {
        deletePostComment(commentId: $commentId)
      }
    `,
    UPDATE_POST: gql`
      mutation UpdatePost($postUpdateInput: PostUpdateInput!) {
        updatePost(postUpdateInput: $postUpdateInput)
      }
    `,
    DELETE_POST: gql`
      mutation DeletePost($postId: String!) {
        deletePost(postId: $postId)
      }
    `,
    GET_POST_COMMENT_LIST: gql`
      query GetPostCommentList($start: Int!, $postId: String!) {
        getPostCommentList(
          postCommentListReadInput: {
            start: $start
            postId: $postId
          }
        ) {
          commentId
          commenter {
            id
            name
            userId
          }
          content
          postId
        }
      }
    `
  }
};

export const PostDetailService = {
  getPostList: async (client: ApolloClient<any>, start: number = 0) => {
    try {
      const { data } = await client.query<GetPostListLightResponse, GetPostListLightVars>({
        query: PostDetailGQL.QUERIES.GET_POST_LIST_LIGHT,
        variables: { start },
        fetchPolicy: 'no-cache'
      });
      return data?.getPostList ?? [];
    } catch (error) {
      console.error('게시물 목록 조회 오류:', error);
      throw error;
    }
  },

  getPostById: async (client: ApolloClient<any>, id: string): Promise<PostDetailUnion | null> => {
    const posts = await PostDetailService.getPostList(client, 0);
    const found = posts.find(p => {
      if (p.postInfo.__typename === 'SnsPost') return (p.postInfo as SnsPostDetail).postId === id;
      if (p.postInfo.__typename === 'BoardingPost') return (p.postInfo as BoardingPostDetail).room.roomId === id;
      return false;
    });
    return found?.postInfo as PostDetailUnion || null;
  },

  likePost: async (client: ApolloClient<any>, postId: string): Promise<boolean> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.LIKE_POST,
        variables: { postId }
      });
      return !!data?.likePost;
    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      throw error;
    }
  },

  unlikePost: async (client: ApolloClient<any>, postId: string): Promise<boolean> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.UNLIKE_POST,
        variables: { postId }
      });
      return !!data?.unlikePost;
    } catch (error) {
      console.error('좋아요 취소 처리 오류:', error);
      throw error;
    }
  },

  getComments: async (client: ApolloClient<any>, postId: string, start: number = 0) => {
    try {
      const { data } = await client.query({
        query: PostDetailGQL.MUTATIONS.GET_POST_COMMENT_LIST,
        variables: { start, postId },
        fetchPolicy: 'no-cache'
      });
      return data?.getPostCommentList || [];
    } catch (error) {
      console.error('댓글 조회 오류:', error);
      throw error;
    }
  },

  createComment: async (client: ApolloClient<any>, postId: string, contents: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.CREATE_POST_COMMENT,
        variables: { postId, contents }
      });
      return data?.createPostComment || '';
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      throw error;
    }
  },

  updateComment: async (client: ApolloClient<any>, commentId: string, content: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.UPDATE_POST_COMMENT,
        variables: { commentId, content }
      });
      return data?.updatePostComment || '';
    } catch (error) {
      console.error('댓글 수정 오류:', error);
      throw error;
    }
  },

  deleteComment: async (client: ApolloClient<any>, commentId: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.DELETE_POST_COMMENT,
        variables: { commentId }
      });
      return data?.deletePostComment || '';
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
      throw error;
    }
  },

  updatePost: async (client: ApolloClient<any>, postUpdateInput: any): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.UPDATE_POST,
        variables: { postUpdateInput }
      });
      return data?.updatePost || '';
    } catch (error) {
      console.error('게시물 수정 오류:', error);
      throw error;
    }
  },

  deletePost: async (client: ApolloClient<any>, postId: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.DELETE_POST,
        variables: { postId }
      });
      return data?.deletePost || '';
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
      throw error;
    }
  }
};;