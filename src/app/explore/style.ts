import styled from "@emotion/styled";
import {colors, radius, fontSizes} from '@/styles/theme';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3;
    padding: 5% 6% 0% 6%;
    flex-direction: column;
    gap: 40px;
`

export const Search = styled.div`
    display: flex;
    width: 73vw;
    height: 8vh;
    border-radius: 30px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    padding: 20px 30px;
`

export const Input = styled.input`
    display: flex;
    padding: 10px;
    border: none;
    outline: none;
    font-size: 18px;
    margin-top: 2px;
    margin-left: 10px;

    &::placeholder {
        color: ${colors.gray};
        font-family: 'SCoreDream', sans-serif;
    }
`

export const Dropdown = styled.div`
    display: flex;
    gap: 15px;
`

export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    max-height: 70vh;
    &::-webkit-scrollbar {
        display: none;
    }
` 