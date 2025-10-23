export interface UserAgreement {
  agreedTermsOfService: boolean;
  agreedPrivacyCollection: boolean;
  agreedPrivacyThirdParty: boolean;
}

export interface LocalLoginInput {
  id: string;
  password: string;
}

export interface LocalSignUpInput {
  name: string;
  id: string;
  email: string;
  password: string;
  country: string;
  language: string;
  userAgreement: UserAgreement;
  emailVerifyTicket?: string;
}

export interface LoginOAuthCodeInput {
  code: string;
  provider: string;
}

export interface OAuthLoginResponse {
  user: LoginUserResponse;
  oauthId?: string | null;
  isNewUser: boolean;
}

export interface OAuthSignUpInput {
  oauthId: string;
  id: string;
  email: string;
  country: string;
  language: string;
  emailVerifyTicket?: string;
  userAgreement: UserAgreement;
}

export type TokenString = string;

export interface LoginUserResponse {
  id: string;
  userId: string;
  country: string;
  language: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profile: string;
  role: string;
}