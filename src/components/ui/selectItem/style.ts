import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
    position: relative;
`

export const Select = styled.button<{ selected: boolean }>`
    display: flex;
    padding: 10px 30px;
    color: ${({ selected }) => (selected ? colors.background : colors.gray)};
    border-radius: ${radius.xl};
    border: 1px solid ${colors.line};
    background-color: ${({ selected }) => (selected ? colors.primary : colors.background)};
    font-size: ${fontSizes.H4};
    align-items: center;
    gap: 7px;
    cursor: pointer;

    ${mq.mobile} {
        white-space: nowrap;
  }
`

export const Main = styled.div`
    position: absolute;
    top: 100%; 
    width: 24vw;
    height: 28vh;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.line};
    border-radius: ${radius.xl};
    padding: 14px;
    margin-top: 10px;
    overflow-y: auto;
    z-index: 100;
    background-color: ${colors.background};
    gap: 20px;

    ${mq.mobile} {
        width: 75vw;
  }
`

export const Title = styled.span`
    font-size: ${fontSizes.H4};
`

export const Input = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

    span{
        color: ${colors.gray};
        font-size: 12px;
    }
`

export const Input1 = styled.input`
    border: 1px solid ${colors.line};
    border-radius: ${radius.md};
    padding: 8px;
    width: 9vw;
    outline: none;

    ${mq.mobile} {
        width: 25vw;
  }
`

export const Input2 = styled.input`
    border: 1px solid ${colors.line};
    border-radius: ${radius.md};
    padding: 8px;
    width: 9vw;
    outline: none;

    ${mq.mobile} {
        width: 25vw;
  }
`

export const Slider = styled.div`
    display: flex;

`

export const SingleSliderContainer = styled.div`
    display: flex;
`

export const Button = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 2rem;
    margin-left: 6.5rem;

    ${mq.mobile} {
        margin-left: 3rem;
  }
`