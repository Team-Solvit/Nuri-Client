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
            hashtags { hashtagId name postId }
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
    // 댓글 조회 쿼리들을 QUERIES로 이동
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
            profile
          }
          content
          postId
        }
      }
    `,
    GET_BOARDING_ROOM_COMMENT_LIST: gql`
      query GetBoardingRoomCommentList($start: Int!, $roomId: String!) {
        getBoardingRoomCommentList(
          boardingRoomCommentListReadInput: {
            start: $start
            roomId: $roomId
          }
        ) {
          commentId
          content
          roomId
          commenter {
            userId
            id
            name
            profile
          }
        }
      }
    `,
    GET_POST: gql`
      query GetPost($postId: String!) {
        getPost(postId: $postId) {
          __typename
          postId
          title
          contents
          day
          likeCount
          isLiked
          commentCount
          hashtags { hashtagId name postId }
          author { userId profile name }
          files { fileId url }
        }
      }
    `,
    GET_BOARDING_ROOM: gql`
      query GetBoardingRoom($roomId: String!) {
        getBoardingRoom(roomId: $roomId) {
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
            host { user { userId profile name } callNumber }
          }
          contractPeriod { contractPeriod contractPeriodId }
          boardingRoomFile { fileId url }
          boardingRoomOption { optionId name }
        }
      }
    `
  },
  MUTATIONS: {
    // 일반 게시물용
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
    // 하숙방용
    LIKE_ROOM: gql`
      mutation LikeRoom($roomId: String!) {
        likeRoom(roomId: $roomId)
      }
    `,
    UNLIKE_ROOM: gql`
      mutation UnlikeRoom($roomId: String!) {
        unlikeRoom(roomId: $roomId)
      }
    `,
    // 일반 게시물 댓글
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
    // 하숙방 댓글
    CREATE_BOARDING_ROOM_COMMENT: gql`
      mutation CreateBoardingRoomComment($roomId: String!, $contents: String!) {
        createBoardingRoomComment(
          boardingRoomCommentCreateInput: {
            roomId: $roomId
            contents: $contents
          }
        )
      }
    `,
    UPDATE_BOARDING_ROOM_COMMENT: gql`
      mutation UpdateBoardingRoomComment($commentId: String!, $content: String!) {
        updateBoardingRoomComment(
          boardingRoomCommentUpdateInput: {
            commentId: $commentId
            content: $content
          }
        )
      }
    `,
    DELETE_BOARDING_ROOM_COMMENT: gql`
      mutation DeleteBoardingRoomComment($commentId: String!) {
        deleteBoardingRoomComment(commentId: $commentId)
      }
    `,
    // 일반 게시물 수정/삭제 (하숙방은 수정 불가)
    UPDATE_POST: gql`
      mutation UpdatePost($postUpdateInput: PostUpdateInput!) {
        updatePost(postUpdateInput: $postUpdateInput)
      }
    `,
    DELETE_POST: gql`
      mutation DeletePost($postId: String!) {
        deletePost(postId: $postId)
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
    try {
      // 먼저 SNS 게시물로 조회 시도
      try {
        const { data } = await client.query({
          query: PostDetailGQL.QUERIES.GET_POST,
          variables: { postId: id },
          fetchPolicy: 'no-cache'
        });
        
        if (data?.getPost) {
          return data.getPost as SnsPostDetail;
        }
      } catch (snsError) {
        // SNS 게시물이 아니면 하숙방으로 조회
        console.log('Not an SNS post, trying boarding room...');
      }
      
      // 하숙방 게시물로 조회 시도
      try {
        const { data } = await client.query({
          query: PostDetailGQL.QUERIES.GET_BOARDING_ROOM,
          variables: { roomId: id },
          fetchPolicy: 'no-cache'
        });
        
        if (data?.getBoardingRoom) {
          return {
            __typename: 'BoardingPost' as const,
            room: data.getBoardingRoom
          } as BoardingPostDetail;
        }
      } catch (roomError) {
        console.log('Not a boarding room either');
      }
      
      return null;
    } catch (error) {
      console.error('게시물 조회 오류:', error);
      return null;
    }
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

  // 하숙방 좋아요 관련
  likeRoom: async (client: ApolloClient<any>, roomId: string): Promise<boolean> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.LIKE_ROOM,
        variables: { roomId }
      });
      return !!data?.likeRoom;
    } catch (error) {
      console.error('하숙방 좋아요 처리 오류:', error);
      throw error;
    }
  },

  unlikeRoom: async (client: ApolloClient<any>, roomId: string): Promise<boolean> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.UNLIKE_ROOM,
        variables: { roomId }
      });
      return !!data?.unlikeRoom;
    } catch (error) {
      console.error('하숙방 좋아요 취소 처리 오류:', error);
      throw error;
    }
  },

  getComments: async (client: ApolloClient<any>, postId: string, start: number = 0) => {
    try {
      const { data } = await client.query({
        query: PostDetailGQL.QUERIES.GET_POST_COMMENT_LIST,
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

  // 하숙방 댓글 관련
  getRoomComments: async (client: ApolloClient<any>, roomId: string, start: number = 0) => {
    try {
      const { data } = await client.query({
        query: PostDetailGQL.QUERIES.GET_BOARDING_ROOM_COMMENT_LIST,
        variables: { start, roomId },
        fetchPolicy: 'no-cache'
      });
      return data?.getBoardingRoomCommentList || [];
    } catch (error) {
      console.error('하숙방 댓글 조회 오류:', error);
      throw error;
    }
  },

  createRoomComment: async (client: ApolloClient<any>, roomId: string, contents: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.CREATE_BOARDING_ROOM_COMMENT,
        variables: { roomId, contents }
      });
      return data?.createBoardingRoomComment || '';
    } catch (error) {
      console.error('하숙방 댓글 작성 오류:', error);
      throw error;
    }
  },

  updateRoomComment: async (client: ApolloClient<any>, commentId: string, content: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.UPDATE_BOARDING_ROOM_COMMENT,
        variables: { commentId, content }
      });
      return data?.updateBoardingRoomComment || '';
    } catch (error) {
      console.error('하숙방 댓글 수정 오류:', error);
      throw error;
    }
  },

  deleteRoomComment: async (client: ApolloClient<any>, commentId: string): Promise<string> => {
    try {
      const { data } = await client.mutate({
        mutation: PostDetailGQL.MUTATIONS.DELETE_BOARDING_ROOM_COMMENT,
        variables: { commentId }
      });
      return data?.deleteBoardingRoomComment || '';
    } catch (error) {
      console.error('하숙방 댓글 삭제 오류:', error);
      throw error;
    }
  },

  // 일반 게시물 수정/삭제 (하숙방은 수정 불가)
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
  },

  // 통합 함수들 - 게시물 타입에 따라 자동으로 적절한 함수 호출
  toggleLike: async (client: ApolloClient<any>, post: PostDetailUnion, isLiked: boolean): Promise<boolean> => {
    if (post.__typename === 'SnsPost') {
      const snsPost = post as SnsPostDetail;
      return isLiked
        ? await PostDetailService.unlikePost(client, snsPost.postId)
        : await PostDetailService.likePost(client, snsPost.postId);
    } else if (post.__typename === 'BoardingPost') {
      const boardingPost = post as BoardingPostDetail;
      return isLiked
        ? await PostDetailService.unlikeRoom(client, boardingPost.room.roomId)
        : await PostDetailService.likeRoom(client, boardingPost.room.roomId);
    }
    throw new Error('지원하지 않는 게시물 타입입니다.');
  },

  getPostComments: async (client: ApolloClient<any>, post: PostDetailUnion, start: number = 0) => {
    if (post.__typename === 'SnsPost') {
      const snsPost = post as SnsPostDetail;
      return await PostDetailService.getComments(client, snsPost.postId, start);
    } else if (post.__typename === 'BoardingPost') {
      const boardingPost = post as BoardingPostDetail;
      return await PostDetailService.getRoomComments(client, boardingPost.room.roomId, start);
    }
    throw new Error('지원하지 않는 게시물 타입입니다.');
  },

  createPostComment: async (client: ApolloClient<any>, post: PostDetailUnion, contents: string): Promise<string> => {
    if (post.__typename === 'SnsPost') {
      const snsPost = post as SnsPostDetail;
      return await PostDetailService.createComment(client, snsPost.postId, contents);
    } else if (post.__typename === 'BoardingPost') {
      const boardingPost = post as BoardingPostDetail;
      return await PostDetailService.createRoomComment(client, boardingPost.room.roomId, contents);
    }
    throw new Error('지원하지 않는 게시물 타입입니다.');
  },

  updatePostComment: async (client: ApolloClient<any>, post: PostDetailUnion, commentId: string, content: string): Promise<string> => {
    if (post.__typename === 'SnsPost') {
      return await PostDetailService.updateComment(client, commentId, content);
    } else if (post.__typename === 'BoardingPost') {
      return await PostDetailService.updateRoomComment(client, commentId, content);
    }
    throw new Error('지원하지 않는 게시물 타입입니다.');
  },

  deletePostComment: async (client: ApolloClient<any>, post: PostDetailUnion, commentId: string): Promise<string> => {
    if (post.__typename === 'SnsPost') {
      return await PostDetailService.deleteComment(client, commentId);
    } else if (post.__typename === 'BoardingPost') {
      return await PostDetailService.deleteRoomComment(client, commentId);
    }
    throw new Error('지원하지 않는 게시물 타입입니다.');
  }
};