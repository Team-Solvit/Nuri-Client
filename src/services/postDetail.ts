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
            likeCount
            isLiked
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
  `,
    // 백엔드 isLiked 미구현 환경을 위한 fallback 쿼리
    GET_POST_LIST_LIGHT_LEGACY: gql`
      query GetPostListLightLegacy($start: Int!) {
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
    } catch (err: any) {
      const needsFallback = Array.isArray(err?.graphQLErrors) && err.graphQLErrors.some((e: any) => typeof e?.message === 'string' && e.message.includes('isLiked'));
      if (!needsFallback) throw err;
      // fallback 재시도
      const { data } = await client.query<GetPostListLightResponse, GetPostListLightVars>({
        query: PostDetailGQL.QUERIES.GET_POST_LIST_LIGHT_LEGACY,
        variables: { start },
        fetchPolicy: 'no-cache'
      });
      const list = data?.getPostList ?? [];
      // isLiked 필드 주입 (기본 false)
      return list.map(item => {
        const p: any = item.postInfo;
        if (!('isLiked' in p)) p.isLiked = false;
        return { ...item, postInfo: p };
      });
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
  }
};;