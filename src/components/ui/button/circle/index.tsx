'use client'

import * as S from './style';

// 1(ex 해시테그):
//     배경: #FFFFFF
//     text: #FF4C61
// 2(ex 선택 x):
//     배경: #FF4C61 + 불투명
//     text: #FF4C61
// 3(ex 선택 o):
//     배경: #FF4C61
//     text: #FFFFFF

type Status = 1 | 2 | 3

interface CircleProps {
  text: string
  onClick: () => void
  status: Status
}

export default function Circle({ text, onClick, status }: CircleProps) {
  return (
    <S.Container onClick={onClick} $status={status}>
      <S.Name>{text}</S.Name>
    </S.Container>
  )
}