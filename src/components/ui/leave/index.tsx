'use client'

import React from 'react'
import * as S from './style'
import Square from '../button/square'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/user'
import { useEmailVerification } from '@/hooks/useEmailVerification'
import { useApollo } from '@/lib/apolloClient'
import { AuthService } from '@/services/auth'
import { useAlertStore } from '@/store/alert'
import { useRouter } from 'next/navigation'
import { clearAccessToken } from '@/utils/token'

interface LeaveModalProps {
    onLeave: () => void
    onClose: () => void
}

export default function Leave({ onLeave, onClose }: LeaveModalProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [isWithdrawing, setIsWithdrawing] = useState(false)
    const apolloClient = useApollo()
    const router = useRouter()
    const { email: userEmail, clear } = useUserStore()
    const alertStore = useAlertStore()
    const { emailState, sendMailCode, verifyMailCode, resetEmail } = useEmailVerification(apolloClient)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        return () => resetEmail()
    }, [resetEmail])

    const handleSendCode = async () => {
        if (!userEmail) {
            alertStore.error('이메일 정보를 찾을 수 없습니다.')
            return
        }
        await sendMailCode(userEmail)
    }

    const handleVerifyCode = async () => {
        if (!userEmail) {
            alertStore.error('이메일 정보를 찾을 수 없습니다.')
            return
        }
        await verifyMailCode(userEmail, verificationCode)
    }

    const handleWithdraw = async () => {
        if (!emailState.ticket) {
            alertStore.error('먼저 이메일 인증을 완료해주세요.')
            return
        }

        setIsWithdrawing(true)
        try {
            const success = await AuthService.withdrawUser(apolloClient, emailState.ticket)
            if (success) {
                alertStore.success('회원탈퇴가 완료되었습니다.')
                // clear Apollo cache and all localStorage
                try {
                    await apolloClient.clearStore()
                    localStorage.clear() // 전체 localStorage 삭제
                } catch (e) {
                    console.error('Error clearing client state after withdraw:', e)
                }
                clear()
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else {
                alertStore.error('회원탈퇴에 실패했습니다.')
            }
        } catch (error: any) {
            console.error('회원탈퇴 실패:', error)
            alertStore.error(error?.message || '회원탈퇴 중 오류가 발생했습니다.')
        } finally {
            setIsWithdrawing(false)
        }
    }

    return (
        <S.FullScreenOverlay
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-modal-title"
        >
            <S.ModalBox onClick={e => e.stopPropagation()}>
                <Image
                    src="/logo.svg"
                    alt="로고"
                    width={77}
                    height={60.5}
                    priority
                />
                <S.Text>계정을 탈퇴하시겠습니까?</S.Text>
                <S.AlertContainer>
                    <S.Alert>* 모든 데이터는 복구할 수 없으며,</S.Alert>
                    <S.Alert>해당 계정은 영구적으로 삭제됩니다.</S.Alert>
                </S.AlertContainer>
                
                <S.EmailSection>
                    <S.EmailText>이메일: {userEmail}</S.EmailText>
                    
                    {emailState.phase === 'idle' && (
                        <Square
                            text="인증코드 발송"
                            onClick={handleSendCode}
                            status={true}
                            width={isMobile ? '100%' : '100%'}
                        />
                    )}
                    
                    {emailState.phase === 'sending' && (
                        <Square
                            text="전송 중..."
                            onClick={() => {}}
                            status={false}
                            width={isMobile ? '100%' : '100%'}
                        />
                    )}
                    
                    {(emailState.phase === 'sent' || emailState.phase === 'verifying') && (
                        <S.VerificationSection>
                            <S.Input 
                                placeholder="인증코드를 입력해주세요" 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Square
                                text={emailState.phase === 'verifying' ? "인증 중..." : "인증하기"}
                                onClick={handleVerifyCode}
                                status={emailState.phase !== 'verifying'}
                                width={isMobile ? '100%' : '100%'}
                            />
                        </S.VerificationSection>
                    )}
                    
                    {emailState.phase === 'verified' && (
                        <S.SuccessText>✓ 이메일 인증이 완료되었습니다.</S.SuccessText>
                    )}
                </S.EmailSection>

                <S.ButtonContainer>
                    <S.CancelBtn onClick={onClose} width="7vw">
                        취소
                    </S.CancelBtn>
                    <Square
                        text={isWithdrawing ? "탈퇴 중..." : "회원탈퇴"}
                        onClick={handleWithdraw}
                        status={emailState.phase === 'verified' && !isWithdrawing}
                        width={isMobile ? '25vw' : '7vw'}
                    />
                </S.ButtonContainer>
            </S.ModalBox>
        </S.FullScreenOverlay>
    )
}
