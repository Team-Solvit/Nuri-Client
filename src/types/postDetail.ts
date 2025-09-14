export type SnsPostDetail = {
  __typename: 'SnsPost';
  postId: string;
  title: string;
  contents: string;
  day: string;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  hashTags: string[];
  author: { userId: string; profile: string | null };
  files: { fileId: string; url: string }[];
};

export type BoardingRoomOption = { optionId: string; name: string };
export type BoardingContractPeriod = { contractPeriodId: string; contractPeriod: number };
export type BoardingRoomFile = { fileId: string; url: string };

export type BoardingPostDetail = {
  __typename: 'BoardingPost';
  room: {
    roomId: string;
    name: string;
    description: string;
    monthlyRent: number;
    day: string;
    status: string;
    headCount: number;
    likeCount: number;
    isLiked: boolean;
    commentCount: number;
    boardingHouse: {
      houseId: string;
      name: string;
      location: string;
      nearestStation?: string;
      nearestSchool?: string;
      gender?: string;
      isMealProvided?: boolean;
      host: { callNumber?: string; user: { userId: string; profile: string | null } };
    };
    contractPeriod: BoardingContractPeriod[];
    boardingRoomFile: BoardingRoomFile[];
    boardingRoomOption: BoardingRoomOption[];
  };
};

export type PostDetailUnion = SnsPostDetail | BoardingPostDetail;

export type GetPostListLightResponse = { getPostList: { postType: string; postInfo: PostDetailUnion }[] };
export type GetPostListLightVars = { start: number };

export type PostComment = {
  commentId: string;
  commenter: {
    id: string;
    name: string;
    userId: string;
    profile: string | null;
  };
  content: string;
  postId: string;
};

export type PostCommentListResponse = { getPostCommentList: PostComment[] };
export type PostCommentListVars = { start: number; postId: string };
