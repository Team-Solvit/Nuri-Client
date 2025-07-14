import styled from "@emotion/styled";
import {colors, radius, fontSizes} from '@/styles/theme';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3;
    padding: 5% 6.5% 0% 6.5%;
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
` 

export const PostItem = styled.div`
    display: flex;
    padding: 12px;
    gap: 35rem;
    width: 66vw;
    border: 1px solid ${colors.line};
    border-radius: ${radius.md};
    background-color: ${colors.background};
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex-shrink: 0;
`


export const PostMain = styled.div`
    display: flex;
    flex-direction: column;
    color: ${colors.gray};
    gap: 2px;
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const PostUser = styled.span`
    font-size: ${fontSizes.Body};
`

export const PostRegion = styled.span`
    font-size: 12px;
    color: ${colors.gray};
`

export const Post = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const PostThumbnail = styled.div`
    flex-shrink: 0;
    width: 6vw;
    height: 9vh;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`

export const PostTitle = styled.p`
    font-size: ${fontSizes.Body};
    font-weight: 500;
    color: ${colors.text};
    margin-bottom: 6px;
`

export const PostPrice = styled.div`
    color: ${colors.text};
    font-weight: 300;
`
