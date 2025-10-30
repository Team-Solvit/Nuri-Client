import { gql, ApolloClient } from '@apollo/client';
import { SendSmsRequest, SendSmsResponse, VerifyPhoneRequest, VerifyPhoneResponse } from '@/types/phoneAuth';

export const PhoneAuthGQL = {
  MUTATIONS: {
    SEND_SMS: gql`
      mutation SendSms($phoneNumber: String!) {
        sendSms(phoneNumber: $phoneNumber) {
          success
          message
          verificationCode
        }
      }
    `,
    VERIFY_PHONE: gql`
      mutation VerifyPhone($phoneNumber: String!, $verificationCode: String!) {
        verifyPhone(phoneNumber: $phoneNumber, verificationCode: $verificationCode) {
          success
          message
          isVerified
        }
      }
    `,
  },
};

export const sendSms = async (
  client: ApolloClient<any>,
  phoneNumber: string
): Promise<SendSmsResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: PhoneAuthGQL.MUTATIONS.SEND_SMS,
      variables: { phoneNumber },
    });
    return data.sendSms;
  } catch {
    return {
      success: false,
      message: 'SMS 전송에 실패했습니다.',
    };
  }
};

export const verifyPhone = async (
  client: ApolloClient<any>,
  phoneNumber: string,
  verificationCode: string
): Promise<VerifyPhoneResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: PhoneAuthGQL.MUTATIONS.VERIFY_PHONE,
      variables: { phoneNumber, verificationCode },
    });
    return data.verifyPhone;
  } catch {
    return {
      success: false,
      message: '휴대폰 인증에 실패했습니다.',
      isVerified: false,
    };
  }
};

// 실제 SMS 전송 함수 (백엔드 API 사용)
export const sendSmsReal = async (
  client: ApolloClient<any>,
  phoneNumber: string
): Promise<SendSmsResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: PhoneAuthGQL.MUTATIONS.SEND_SMS,
      variables: { phoneNumber },
    });
    return data.sendSms;
  } catch {
    return {
      success: false,
      message: 'SMS 전송에 실패했습니다.',
    };
  }
};

// Mock 함수 (개발용)
export const sendSmsMock = async (phoneNumber: string): Promise<SendSmsResponse> => {
  // Mock: solvit25@gmail.com으로 SMS 전송 시뮬레이션

  // Mock 인증코드 생성 (실제로는 백엔드에서 생성)
  const mockCode = Math.floor(100000 + Math.random() * 900000).toString();

  return {
    success: true,
    message: `인증코드가 ${phoneNumber}로 전송되었습니다.`,
    verificationCode: mockCode, // 개발용으로만 반환
  };
};

export const verifyPhoneMock = async (
  phoneNumber: string,
  verificationCode: string
): Promise<VerifyPhoneResponse> => {
  // Mock: 간단한 검증 로직

  // 6자리 숫자 검증
  const isValidCode = /^\d{6}$/.test(verificationCode);

  return {
    success: isValidCode,
    message: isValidCode ? '휴대폰 인증이 완료되었습니다.' : '인증코드가 올바르지 않습니다.',
    isVerified: isValidCode,
  };
};
