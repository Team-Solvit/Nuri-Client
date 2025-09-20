'use client'

import * as S from './style';
import React from "react";

// true(ex 업로드):
//     배경: #FF4C61
//     text: #FFFFFF
// false(ex 취소):
//     배경: #FFFFFF
//     text: #FF4C61

interface SquareProps {
    text: string
    onClick?: (e:React.MouseEvent<HTMLDivElement>) => void
    status: boolean
    width: string
}

export default function Square({ text, onClick, status, width }: SquareProps) {
    return (
        <S.Container onClick={onClick} $status={status} $width={width}>
            <S.Name>{text}</S.Name>
        </S.Container>
    )
}