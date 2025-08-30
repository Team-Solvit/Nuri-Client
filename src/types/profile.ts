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

export interface FollowUserInfo {
  id: string;
  userId: string;
  profile?: string;
}

export interface FollowerUserInfo {
  id: string;
  userId: string;
  profile?: string;
}
