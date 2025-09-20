'use client'

import React from 'react'
import * as S from './style'
import Square from '../button/square'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface LeaveModalProps {
    onLeave: () => void
    onClose: () => void
}

export default function Leave({ onLeave, onClose }: LeaveModalProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                <S.Input placeholder="비밀번호를 입력해주세요" />
                <S.ButtonContainer>
                    <S.CancelBtn onClick={onClose} width="7vw">
                        취소
                    </S.CancelBtn>
                    <Square
                        text="회원탈퇴"
                        onClick={onLeave}
                        status={true}
                        width={isMobile ? '25vw' : '7vw'}
                    />
                </S.ButtonContainer>
            </S.ModalBox>
        </S.FullScreenOverlay>
    )
}
