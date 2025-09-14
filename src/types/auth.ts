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

export type TokenString = string;