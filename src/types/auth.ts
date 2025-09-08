// 필수(!) 필드 주석 처리
export interface UserAgreement {
  agreedTermsOfService: boolean;          // !
  agreedPrivacyCollection: boolean;       // !
  agreedPrivacyThirdParty: boolean;       // !
  agreedIdentityAgencyTerms: boolean;     // !
  agreedIdentityPrivacyDelegate: boolean; // !
  agreedIdentityUniqueInfo: boolean;      // !
  agreedIdentityProviderTerms: boolean;   // !
}

export interface LocalLoginInput {
  id: string;        // !
  password: string;  // !
}

export interface LocalSignUpInput {
  name: string;      // !
  id: string;        // !
  email: string;     // !
  password: string;  // !
  country: string;   // !
  language: string;  // !
  userAgreement: UserAgreement; // !
  emailVerifyTicket?: string;
}

export interface LoginOAuthCodeInput {
  code: string;      // !
  provider: string;  // !
}

export interface OAuthLoginResponse {
  oauthId?: string | null;
  isNewUser: boolean;
}

export interface OAuthSignUpInput {
  oauthId: string;   // !
  id: string;        // !
  email: string;     // !
  country: string;   // !
  language: string;  // !
  emailVerifyTicket?: string;
  userAgreement: UserAgreement; // !
}

// 단순 String 반환 토큰/메시지들
export type TokenString = string;      // localLogin, reissue 등
export type GenericResultString = string; // logout, saveOAuthUserInfo 등

export interface LocalLoginRequest extends LocalLoginInput {}
export interface LocalSignUpRequest extends LocalSignUpInput {}

// 팔로워/팔로우 관련 타입들
export interface FollowUserInfo {
  id: string;
  userId: string;
  profile?: string;
}

export interface UserProfile {
  postCount: number;
  followerCount: number;
  followingCount: number;
  profile: string;
  userId: string;
}

export interface FollowStatus {
  isFollowing: boolean;
}

export interface FollowResponse {
  success: boolean;
}