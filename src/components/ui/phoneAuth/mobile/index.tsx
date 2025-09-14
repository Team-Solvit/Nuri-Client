'use client'

import React, { useState } from 'react';
import * as S from './style';
import Square from '../../button/square';
import { sendSmsReal, verifyPhone } from '@/services/phoneAuth';
import { useApollo } from '@/lib/apolloClient';

interface MobilePhoneAuthProps {
  onVerifySuccess: (phoneNumber: string) => void;
  onClose: () => void;
}

export default function MobilePhoneAuth({ onVerifySuccess, onClose }: MobilePhoneAuthProps) {
  const apolloClient = useApollo();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendSms = async () => {
    if (!phoneNumber.trim()) {
      setError('휴대폰 번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await sendSmsReal(apolloClient, phoneNumber);
      if (result.success) {
        setStep('verify');
        // 개발용: 인증코드를 alert로 표시 (실제 백엔드에서는 verificationCode가 null일 수 있음)
        if (result.verificationCode) {
          alert(`개발용 인증코드: ${result.verificationCode}\n\n실제 서비스에서는 SMS로 전송됩니다.`);
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('SMS 전송 오류:', error);
      setError('SMS 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError('인증코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await verifyPhone(apolloClient, phoneNumber, verificationCode);
      if (result.success && result.isVerified) {
        onVerifySuccess(phoneNumber);
        onClose();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('인증 오류:', error);
      setError('인증에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await sendSmsReal(apolloClient, phoneNumber);
      if (result.success) {
        setVerificationCode('');
        // 개발용: 인증코드를 alert로 표시
        if (result.verificationCode) {
          alert(`개발용 인증코드: ${result.verificationCode}\n\n실제 서비스에서는 SMS로 전송됩니다.`);
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('SMS 재전송 오류:', error);
      setError('SMS 재전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <S.Container>
          <S.Title>휴대폰 인증</S.Title>
          
          {step === 'input' ? (
            <>
              <S.Description>
                호스트 인증을 위해 휴대폰 번호를 입력해주세요.
              </S.Description>
              
              <S.InputWrapper>
                <S.Input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해주세요 (예: 010-1234-5678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
              </S.InputWrapper>

              {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

              <S.ButtonWrapper>
                <Square
                  text={isLoading ? "전송 중..." : "인증코드 전송"}
                  status={!isLoading && phoneNumber.trim().length > 0}
                  width="100%"
                  onClick={handleSendSms}
                />
              </S.ButtonWrapper>
            </>
          ) : (
            <>
              <S.Description>
                {phoneNumber}로 전송된 인증코드를 입력해주세요.
              </S.Description>
              
              <S.InputWrapper>
                <S.Input
                  type="text"
                  placeholder="인증코드 6자리"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  disabled={isLoading}
                />
              </S.InputWrapper>

              {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

              <S.ButtonWrapper>
                <Square
                  text={isLoading ? "인증 중..." : "인증하기"}
                  status={!isLoading && verificationCode.trim().length === 6}
                  width="100%"
                  onClick={handleVerifyCode}
                />
              </S.ButtonWrapper>

              <S.ResendWrapper>
                <S.ResendButton onClick={handleResendCode} disabled={isLoading}>
                  인증코드 재전송
                </S.ResendButton>
              </S.ResendWrapper>
            </>
          )}

          <S.CancelButton onClick={onClose}>
            취소
          </S.CancelButton>
        </S.Container>
      </S.ModalWrapper>
    </S.Overlay>
  );
}
