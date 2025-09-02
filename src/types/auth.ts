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

export interface LocalLoginRequest extends LocalLoginInput { }
export interface LocalSignUpRequest extends LocalSignUpInput { }