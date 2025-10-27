import styled from "@emotion/styled";
import {colors} from '@/styles/theme';
import { mq } from "@/styles/media";

export const Search = styled.div`
    display: flex;
    width: 73vw;
    height: 8vh;
    border-radius: 30px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    padding: 20px 30px;

    ${mq.mobile} {
        width: 88vw;
}
`

export const Input = styled.input`
    display: flex;
    padding: 10px;
    border: none;
    outline: none;
    font-size: 18px;
    margin-top: 2px;
    margin-left: 10px;
    width: 100%;

    &::placeholder {
        color: ${colors.gray};
        font-family: 'SCoreDream', sans-serif;
    }
`

export const Dropdown = styled.div`
    display: flex;
    gap: 10px;

    ${mq.mobile} {
    flex-direction: column;
    width: 100%;
    gap: 5px;
    margin-top: 20px;

    & > * {
        width: 100%;
    }
}
`

export const FilterToggle = styled.button`
  display: none;
  ${mq.mobile} {
    display: block;
    background-color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    margin: 10px 0;
    font-size: 14px;
    cursor: pointer;
  }
`

export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    height: 68vh;
    min-height: 500px;
    &::-webkit-scrollbar {
        display: none;
    }
` 