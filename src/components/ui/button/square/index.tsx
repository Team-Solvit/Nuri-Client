'use client'

import * as S from './style';

export default function Square({text, On, status, width}: {text: string, On: () => void, status: boolean, width: string}){
    return(
        <S.Container onClick={On} $status = {status} $width = {width}>
            <S.Name>{text}</S.Name>
        </S.Container>
    )
}