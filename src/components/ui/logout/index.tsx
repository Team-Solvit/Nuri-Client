'use client'

import React from 'react'
import * as S from './style'
import Square from '../button/square'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface LogoutModalProps {
  onLogout: () => void
  onClose: () => void
}

export default function Logout({ onLogout, onClose }: LogoutModalProps) {
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
      aria-labelledby="logout-modal-title"
    >
      <S.ModalBox onClick={e => e.stopPropagation()}>
        <Image
          src="/logo.svg"
          alt="로고"
          width={77}
          height={60.5}
          priority
        />
        <S.Text>정말 로그아웃 하시겠습니까?</S.Text>
        <S.ButtonContainer>
          <S.CancelBtn onClick={onClose} width='7vw'>
            취소
          </S.CancelBtn>
          <Square
            text="로그아웃"
            onClick={onLogout}
            status={true}
            width={isMobile ? '25vw' : '7vw'}
          />
        </S.ButtonContainer>
      </S.ModalBox>
    </S.FullScreenOverlay>
  )
}
