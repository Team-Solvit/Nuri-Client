'use client'

import React, { useState, useEffect } from 'react'
import * as S from './sytle';
import Square from '../button/square'
import { useApollo } from '@/lib/apolloClient'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'

interface PhoneAuthProps {
  onVerifySuccess: (callNumber: string, agency: string) => void
  onClose: () => void
  role?: 'HOST' | 'BOARDER'
}

const BACKEND_EMAIL = 'solvit25@gmail.com'
const AGENCY_DOMAINS: { [key: string]: string } = {
  'SKT': 'vmms.nate.com',
  'KT': 'ktfmms.magicn.com',
  'LG U+': 'mmsmail.uplus.co.kr'
}

const AUTHENTICATE_HOST_MUTATION = gql`
  mutation AuthenticateHost($hostAuthenticationRequestDto: HostAuthenticationRequestDto!) {
    authenticateHost(hostAuthenticationRequestDto: $hostAuthenticationRequestDto)
  }
`

export default function PhoneAuth({ onVerifySuccess, onClose, role = 'HOST' }: PhoneAuthProps) {
  const [authCode, setAuthCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [callNumber, setCallNumber] = useState('')
  const [agency, setAgency] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [smsLink, setSmsLink] = useState('')
  const apolloClient = useApollo()
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 430)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // MMS 보낸 후 웹으로 돌아왔을 때 자동으로 인증코드 입력
  useEffect(() => {
    if (isCodeSent && generatedCode) {
      const handleVisibilityChange = () => {
        if (!document.hidden && generatedCode && authCode !== generatedCode) {
          setAuthCode(generatedCode)
        }
      }
      
      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isCodeSent, generatedCode, authCode])

  // 6자리 랜덤 인증코드 생성
  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // 휴대폰 번호 정규화 (하이픈 제거)
  const normalizePhoneNumber = (phone: string) => {
    return phone.replace(/[^0-9]/g, '')
  }

  // 통신사 감지 (번호 앞자리로 판별)
  const detectAgency = (phone: string): string => {
    const normalizedPhone = normalizePhoneNumber(phone)
    const prefix = normalizedPhone.substring(0, 3)
    
    // 010은 통합 번호이므로 사용자가 직접 선택하도록 유도
    // 또는 백엔드에서 발신자 정보로 자동 감지
    return 'UNKNOWN'
  }

  // SMS/MMS 발송 처리
  const handleSendCode = () => {
    if (!callNumber.trim()) {
      alert('휴대폰 번호를 입력해주세요.')
      return
    }

    if (!agency) {
      alert('통신사를 선택해주세요.')
      return
    }

    const normalizedPhone = normalizePhoneNumber(callNumber)
    if (normalizedPhone.length !== 11 || !normalizedPhone.startsWith('010')) {
      alert('올바른 휴대폰 번호를 입력해주세요. (010-XXXX-XXXX 형식)')
      return
    }

    const code = generateAuthCode()
    
    setGeneratedCode(code)
    setIsCodeSent(true)
    
    // SMS 링크 생성 - 백엔드 이메일 주소로 보냄
    const link = `sms:${BACKEND_EMAIL}?body=${code}`
    setSmsLink(link)
    
    // SMS 앱 열기 시도
    try {
      const linkElement = document.createElement('a')
      linkElement.href = link
      linkElement.click()
    } catch (error) {
      console.error('SMS 앱 열기 실패:', error)
      // 실패 시 사용자에게 수동으로 안내
      alert(`인증코드: ${code}\n\n위 코드를 휴대폰에서 다음 주소로 MMS를 보내주세요:\n${BACKEND_EMAIL}`)
    }
  }

  const handleVerifyCode = async () => {
    if (!authCode.trim()) {
      alert('인증코드를 입력해주세요.')
      return
    }

    if (authCode.length !== 6) {
      alert('인증코드는 6자리입니다.')
      return
    }

    setIsVerifying(true)

    try {
      // 통신사명을 도메인으로 변환
      const agencyDomain = AGENCY_DOMAINS[agency] || agency

      const { data } = await apolloClient.mutate({
        mutation: AUTHENTICATE_HOST_MUTATION,
        variables: {
          hostAuthenticationRequestDto: {
            callNumber: normalizePhoneNumber(callNumber),
            agency: agencyDomain,
            authCode: authCode,
            role: role
          }
        }
      })

      if (data?.authenticateHost) {
        alert('휴대폰 인증이 완료되었습니다!')
        onVerifySuccess(normalizePhoneNumber(callNumber), agencyDomain)
      } else {
        alert('인증코드가 올바르지 않습니다. 다시 확인해주세요.')
      }
    } catch (error: any) {
      console.error('인증 실패:', error)
      const errMsg =
        (error?.graphQLErrors && error.graphQLErrors[0]?.message) ||
        error?.message ||
        ''

      if (typeof errMsg === 'string' && errMsg.includes('존재하지 않습니다')) {
        // 서버가 "존재하지 않습니다" 오류를 반환하면 호스트 설정이 필요함을 안내하고 해당 페이지로 이동
        alert('호스트(하숙집) 정보가 없습니다. 먼저 호스트 설정에서 하숙집 정보를 등록해 주세요. 이동합니다.');
        try {
          router.push(role === 'HOST' ? '/setting/host' : '/setting/boarder');
        } catch (e) {
          console.error('라우팅 실패:', e);
        }
      } else {
        alert(errMsg || '인증 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRetry = () => {
    setIsCodeSent(false)
    setAuthCode('')
    setCallNumber('')
    setAgency('')
    setGeneratedCode('')
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
                  {role === 'HOST' ? '호스트' : '하숙생'} 인증을 위해 휴대폰 번호와 통신사를 선택해주세요.
                </S.Description>
                
                <S.Input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={callNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallNumber(e.target.value)}
                  maxLength={13}
                />
                
                <S.Select value={agency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAgency(e.target.value)}>
                  <option value="">통신사 선택</option>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG U+">LG U+</option>
                </S.Select>
                
                <S.InfoText>
                  * {BACKEND_EMAIL}로 인증코드가 포함된 MMS를 보내게 됩니다.
                </S.InfoText>

                <S.ButtonWrapper>
                  <Square
                    text="인증코드 발송"
                    onClick={handleSendCode}
                    status={!!callNumber.trim() && !!agency}
                    width="100%"
                  />
                </S.ButtonWrapper>
                
                {isCodeSent && (
                  <S.SmsButton 
                    href={smsLink}
                    target="_blank"
                  >
                    📱 MMS 앱에서 직접 보내기
                  </S.SmsButton>
                )}
              </S.Step1>
            ) : (
              <S.Step2>
                <S.Description>
                  MMS로 보낸 인증코드를 아래에 입력해주세요.
                </S.Description>
                
                <S.CodeDisplay>
                  <S.CodeLabel>발송한 인증코드:</S.CodeLabel>
                  <S.CodeValue>{generatedCode}</S.CodeValue>
                </S.CodeDisplay>
                
                <S.PhoneInfo>
                  인증번호: {callNumber}
                </S.PhoneInfo>

                <S.Input
                  type="text"
                  placeholder="인증코드 6자리"
                  value={authCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  maxLength={6}
                />

                <S.ButtonWrapper>
                  <Square
                    text={isVerifying ? "인증 중..." : "인증하기"}
                    onClick={handleVerifyCode}
                    status={authCode.length === 6 && !isVerifying}
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