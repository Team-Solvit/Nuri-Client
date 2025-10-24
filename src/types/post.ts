// Author (SnsPost)
export type Author = {
	profile: string | null;
	userId: string;
	__typename: "Author";
};

// SnsPost 파일
export type SnsPostFile = {
	fileId: string;
	postId: string;
	url: string;
};

// SnsPost
export type SnsPost = {
	__typename: "SnsPost";
	postId: string;
	title: string;
	commentCount: number;
	likeCount: number;
	author: Author;
	contents: string;
	day: string;
	files: SnsPostFile[];
	isGroup: boolean;
};

// BoardingPost 관련 타입
export type BoardingUser = {
	profile: string | null;
	userId: string;
};

export type BoardingHost = {
	user: BoardingUser;
};

export type BoardingHouse = {
	host: BoardingHost;
};

export type BoardingRoomFile = {
	roomId: string;
	fileId: string;
	url: string;
};

export type ContractPeriod = {
	contractPeriodId: string;
	roomId: string;
	contractPeriod: string;
};

export type BoardingRoom = {
	boardingHouse: BoardingHouse;
	boardingRoomFile: BoardingRoomFile[];
	contractPeriod: ContractPeriod[];
	day?: string;
	headCount?: number;
	description?: string;
	monthlyRent?: number;
	name: string;
	roomId: string;
	likeCount: number;
	commentCount: number;
};

export type BoardingPost = {
	__typename: "BoardingPost";
	room: BoardingRoom;
};

// Post 타입
export type Post = {
	postType: string;
	postInfo: SnsPost | BoardingPost;
};

export type GetPostListVariables = {
	start: number;
};

// 쿼리 응답 타입
export type GetPostListResponse = {
	getPostList: Post[];
};

export enum ShareRange {
    ALL = 'ALL',
    FRIENDS = 'FRIENDS',
    PRIVATE = 'PRIVATE'
  }
  
  export interface PostCreateInput {
    postInfo: PostInfo;
    files: string[];
    hashTags: string[];
  }
  
  export interface CreatePostResponse {
    createPost: boolean;
  }
  
  export interface PostInfo {
    title: string;
    contents: string;
    shareRange: ShareRange;
    isGroup: boolean;
  }

