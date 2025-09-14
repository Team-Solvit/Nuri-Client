'use client'

import React, { useState, useEffect } from 'react';
import * as S from './style';
import QRCode from 'qrcode';
import { sendSmsReal, verifyPhone } from '@/services/phoneAuth';
import { useApollo } from '@/lib/apolloClient';

interface DesktopPhoneAuthProps {
  onVerifySuccess: (phoneNumber: string) => void;
  onClose: () => void;
}

export default function DesktopPhoneAuth({ onVerifySuccess, onClose }: DesktopPhoneAuthProps) {
  const apolloClient = useApollo();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'qr' | 'verify'>('qr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPolling, setIsPolling] = useState(false);

  // QR 코드 생성
  useEffect(() => {
    if (step === 'qr') {
      generateQRCode();
    }
  }, [step]);

  const generateQRCode = async () => {
    try {
      // QR 코드에 포함될 데이터: 휴대폰에서 호스트 설정 페이지로 이동
      const qrData = `${window.location.origin}/setting/host`;
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(qrCodeUrl);
    } catch (error) {
      console.error('QR 코드 생성 실패:', error);
      setError('QR 코드 생성에 실패했습니다.');
    }
  };

  const handleManualInput = () => {
    setStep('verify');
  };

  const handleVerifyCode = async () => {
    if (!phoneNumber.trim()) {
      setError('휴대폰 번호를 입력해주세요.');
      return;
    }

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
    if (!phoneNumber.trim()) {
      setError('휴대폰 번호를 입력해주세요.');
      return;
    }

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
          
          {step === 'qr' ? (
            <>
              <S.Description>
                휴대폰으로 QR 코드를 스캔하여 인증을 완료하세요.
              </S.Description>
              
              <S.QRCodeWrapper>
                {qrCodeDataUrl ? (
                  <S.QRCodeImage src={qrCodeDataUrl} alt="QR Code" />
                ) : (
                  <S.QRCodePlaceholder>QR 코드 생성 중...</S.QRCodePlaceholder>
                )}
              </S.QRCodeWrapper>

              <S.Instructions>
                <S.InstructionItem>1. 휴대폰 카메라로 QR 코드를 스캔하세요</S.InstructionItem>
                <S.InstructionItem>2. 휴대폰에서 호스트 설정 페이지로 이동됩니다</S.InstructionItem>
                <S.InstructionItem>3. 휴대폰에서 "휴대폰 인증하기" 버튼을 눌러 인증을 완료하세요</S.InstructionItem>
                <S.InstructionItem>4. 인증 완료 후 이 페이지를 새로고침하세요</S.InstructionItem>
              </S.Instructions>

              <S.ButtonWrapper>
                <S.SecondaryButton onClick={handleManualInput}>
                  수동으로 입력하기
                </S.SecondaryButton>
              </S.ButtonWrapper>
            </>
          ) : (
            <>
              <S.Description>
                휴대폰 번호와 인증코드를 입력해주세요.
              </S.Description>
              
              <S.InputWrapper>
                <S.Input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해주세요 (예: 010-1234-5678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
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
                <S.PrimaryButton
                  onClick={handleVerifyCode}
                  disabled={isLoading || !phoneNumber.trim() || verificationCode.trim().length !== 6}
                >
                  {isLoading ? "인증 중..." : "인증하기"}
                </S.PrimaryButton>
              </S.ButtonWrapper>

              <S.ResendWrapper>
                <S.ResendButton onClick={handleResendCode} disabled={isLoading || !phoneNumber.trim()}>
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
