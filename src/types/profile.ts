export interface UserProfileResponseDto {
  postCount: number;
  followerCount: number;
  followingCount: number;
  profile: string;
  userId: string;
}

export interface ChangeProfileRequest {
  profile: string;
}

export interface FollowUserInfoResponseDto {
  id: string;
  userId: string;
  profile: string;
}

// 기존 인터페이스들을 새로운 타입으로 alias
export type FollowUserInfo = FollowUserInfoResponseDto;
export type FollowerUserInfo = FollowUserInfoResponseDto;
