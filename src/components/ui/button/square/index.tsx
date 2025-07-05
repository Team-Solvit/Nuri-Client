'use client'

import * as S from './style';

// true(ex 업로드):
//     배경: #FF4C61
//     text: #FFFFFF
// false(ex 취소):
//     배경: #FFFFFF
//     text: #FF4C61

export default function Square({text, On, status, width}: {text: string, On: () => void, status: boolean, width: string}){
    return(
        <S.Container onClick={On} $status = {status} $width = {width}>
            <S.Name>{text}</S.Name>
        </S.Container>
    )
}