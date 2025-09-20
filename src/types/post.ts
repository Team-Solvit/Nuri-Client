
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