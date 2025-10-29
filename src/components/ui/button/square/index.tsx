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
    isLoading?: boolean
}

export default function Square({ text, onClick, status, width, isLoading = false }: SquareProps) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLoading) return;
        onClick?.(e);
    };

    return (
        <S.Container onClick={handleClick} $status={status} $width={width} $disabled={ isLoading}>
            <S.Name>{isLoading ? '로딩 중...' : text}</S.Name>
        </S.Container>
    )
}