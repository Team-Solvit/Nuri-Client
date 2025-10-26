export interface UserProfileResponseDto {
  postCount: number;
  followerCount: number;
  followingCount: number;
  profile: string;
  userId: string;
  userUUID: string;
  introduce: string;
  isFollowing: boolean;
}

export interface ChangeProfileRequest {
  profile: string;
}

export interface FollowUserInfoResponseDto {
  id: string;
  userId: string;
  profile: string;
}

export interface PasswordChangeInput {
  password: string;
  newPassword: string;
}

export type ChangePasswordResponse = boolean;

export interface UserPostListReadInput {
  userId: string;
  start: number;
}

export interface UserPost {
  postId: string;
  thumbnail: string;
}

export interface UserPostListResponse {
  getUserPostList: UserPost[] | null;
}

// 기존 인터페이스들을 새로운 타입으로 alias
export type FollowUserInfo = FollowUserInfoResponseDto;
export type FollowerUserInfo = FollowUserInfoResponseDto;
