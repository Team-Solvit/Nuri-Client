'use client'

import React, { useState, useEffect } from 'react'
import * as S from './style';
import Square from '../button/square'
import { useApollo } from '@/lib/apolloClient'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'
import { useAlertStore } from '@/store/alert';

interface PhoneAuthProps {
  onVerifySuccess: (callNumber: string) => void
  onClose: () => void
  role?: 'HOST' | 'BOARDER'
}

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($callNumberRequestDto: CallNumberRequestDto!) {
    sendMessage(callNumberRequestDto: $callNumberRequestDto)
  }
`

const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($callNumberAuthenticateRequestDto: CallNumberAuthenticateRequestDto!) {
    authenticate(callNumberAuthenticateRequestDto: $callNumberAuthenticateRequestDto)
  }
`

const PHONE_AUTH_EXPIRY = 5 * 60 * 1000; // 5분

export default function PhoneAuth({ onVerifySuccess, onClose, role = 'HOST' }: PhoneAuthProps) {
  const [authCode, setAuthCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [callNumber, setCallNumber] = useState('')
  const apolloClient = useApollo()
  const router = useRouter()
  const { success, error } = useAlertStore()

  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneAuthNumber')
    const savedTime = localStorage.getItem('phoneAuthTime')
    const savedRole = localStorage.getItem('phoneAuthRole')

    if (savedPhone && savedTime && savedRole === role) {
      const timeDiff = Date.now() - parseInt(savedTime, 10)
      if (timeDiff < PHONE_AUTH_EXPIRY) {
        setCallNumber(savedPhone)
        setIsCodeSent(true)
      } else {
        localStorage.removeItem('phoneAuthNumber')
        localStorage.removeItem('phoneAuthTime')
        localStorage.removeItem('phoneAuthRole')
      }
    }
  }, [role])

  const normalizePhoneNumber = (phone: string) => {
    return phone.replace(/[^0-9]/g, '')
  }

  const handleSendCode = async () => {
    if (!callNumber.trim()) {
      error('휴대폰 번호를 입력해주세요.')
      return
    }

    const normalizedPhone = normalizePhoneNumber(callNumber)
    if (normalizedPhone.length !== 11 || !normalizedPhone.startsWith('010')) {
      error('올바른 휴대폰 번호를 입력해주세요. (010-XXXX-XXXX 형식)')
      return
    }

    setIsSending(true)

    try {
      const { data } = await apolloClient.mutate({
        mutation: SEND_MESSAGE_MUTATION,
        variables: {
          callNumberRequestDto: {
            callNumber: normalizedPhone
          }
        }
      })

      if (data?.sendMessage) {
        success('인증코드가 문자로 발송되었습니다.')
        setIsCodeSent(true)
        
        localStorage.setItem('phoneAuthNumber', normalizedPhone)
        localStorage.setItem('phoneAuthTime', Date.now().toString())
        localStorage.setItem('phoneAuthRole', role)
      } else {
        error('인증코드 발송에 실패했습니다.')
      }
    } catch (e: any) {
      console.error('인증코드 발송 실패:', e)
      const errMsg =
        (e?.graphQLErrors && e.graphQLErrors[0]?.message) ||
        e?.message ||
        ''
      error(errMsg || '인증코드 발송 중 오류가 발생했습니다.')
    } finally {
      setIsSending(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!authCode.trim()) {
      error('인증코드를 입력해주세요.')
      return
    }

    setIsVerifying(true)

    try {
      const { data } = await apolloClient.mutate({
        mutation: AUTHENTICATE_MUTATION,
        variables: {
          callNumberAuthenticateRequestDto: {
            authCode: authCode,
            callNumber: normalizePhoneNumber(callNumber),
            role: role
          }
        }
      })

      if (data?.authenticate) {
        success('휴대폰 인증이 완료되었습니다!')
        
        localStorage.removeItem('phoneAuthNumber')
        localStorage.removeItem('phoneAuthTime')
        localStorage.removeItem('phoneAuthRole')
        
        onVerifySuccess(normalizePhoneNumber(callNumber))
        onClose()
      } else {
        error('인증코드가 올바르지 않습니다. 다시 확인해주세요.')
      }
    } catch (e: any) {
      console.error('인증 실패:', e)
      const errMsg =
        (e?.graphQLErrors && e.graphQLErrors[0]?.message) ||
        e?.message ||
        ''

      if (typeof errMsg === 'string' && errMsg.includes('존재하지 않습니다')) {
        error('호스트(하숙집) 정보가 없습니다. 먼저 호스트 설정에서 하숙집 정보를 등록해 주세요.')
        try {
          router.push(role === 'HOST' ? '/setting/host' : '/setting/boarder');
        } catch (e: unknown) {
          console.error('라우팅 실패:', e);
        }
      } else {
        error(errMsg || '인증 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRetry = () => {
    setIsCodeSent(false)
    setAuthCode('')
    setCallNumber('')
    
    localStorage.removeItem('phoneAuthNumber')
    localStorage.removeItem('phoneAuthTime')
    localStorage.removeItem('phoneAuthRole')
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <S.Container>
          <S.Header>
            <S.Title>휴대폰 인증</S.Title>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
          </S.Header>

          <S.Content>
            {!isCodeSent ? (
              <S.Step1>
                <S.Description>
                  {role === 'HOST' ? '호스트' : '하숙생'} 인증을 위해 휴대폰 번호를 입력해주세요.
                </S.Description>
                
                <S.Input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={callNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallNumber(e.target.value)}
                  maxLength={13}
                />
                
                <S.InfoText>
                  * 입력하신 번호로 인증코드가 문자로 발송됩니다.
                </S.InfoText>

                <S.ButtonWrapper>
                  <Square
                    text={isSending ? "발송 중..." : "인증코드 발송"}
                    onClick={handleSendCode}
                    status={!!callNumber.trim() && !isSending}
                    width="100%"
                  />
                </S.ButtonWrapper>
              </S.Step1>
            ) : (
              <S.Step2>
                <S.Description>
                  문자로 받은 인증코드를 입력해주세요.
                </S.Description>
                
                <S.PhoneInfo>
                  인증번호: {callNumber}
                </S.PhoneInfo>

                <S.Input
                  type="text"
                  placeholder="인증코드"
                  value={authCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthCode(e.target.value)}
                />

                <S.ButtonWrapper>
                  <Square
                    text={isVerifying ? "인증 중..." : "인증하기"}
                    onClick={handleVerifyCode}
                    status={!!authCode.trim() && !isVerifying}
                    width="100%"
                  />
                </S.ButtonWrapper>

                <S.RetryButton onClick={handleRetry}>
                  번호 다시 입력
                </S.RetryButton>
              </S.Step2>
            )}
          </S.Content>
        </S.Container>
      </S.ModalWrapper>
    </S.Overlay>
  )
}