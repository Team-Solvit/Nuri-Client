export interface SendSmsRequest {
  phoneNumber: string;
}

export interface SendSmsResponse {
  success: boolean;
  message: string;
  verificationCode?: string;
}

export interface VerifyPhoneRequest {
  phoneNumber: string;
  verificationCode: string;
}

export interface VerifyPhoneResponse {
  success: boolean;
  message: string;
  isVerified: boolean;
}

export interface PhoneAuthState {
  isVerified: boolean;
  phoneNumber?: string;
  isLoading: boolean;
  error?: string;
}
