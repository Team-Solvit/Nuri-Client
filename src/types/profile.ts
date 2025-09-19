export interface UserProfileResponseDto {
  postCount: number;
  followerCount: number;
  followingCount: number;
  profile: string;
  userId: string;
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

// 기존 인터페이스들을 새로운 타입으로 alias
export type FollowUserInfo = FollowUserInfoResponseDto;
export type FollowerUserInfo = FollowUserInfoResponseDto;
