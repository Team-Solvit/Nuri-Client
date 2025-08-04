import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MessageContainer = styled.section<{ id: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${colors.background};
  padding: 3rem 0;
  overflow-y: scroll;

  ${mq.mobile} {
    ${({id}) => id && 'display: none;'}
  }
`

export const Search = styled.div`
  width: 90%;
  gap: 1rem;
  border-radius: ${radius.md};
  border: 1px solid #DDDDDD;
  padding: 0.5rem 2rem;
  display: flex;

  & > input {
    width: 100%;
    outline: none;
    border: none;
    font-size: ${fontSizes.Body};
  }

  & > input::placeholder {
    color: #DDDDDD;
  }
`

export const Category = styled.article`
  display: flex;
  padding: 0 2rem;
  margin: 3rem 0 0.5rem 0;
  width: 100%;

  & > h3 {
    font-weight: 500;
  }

  & > img {
    cursor: pointer;
  }

  font-size: ${fontSizes.Body};
  justify-content: space-between;
  align-items: center;

`
export const ChatBox = styled.div<{ isRead: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${colors.line};
  display: flex;
  padding: 1.5rem 2rem;
  align-items: center;
  background-color: ${(props) => props.isRead ? "#f8f8f8" : colors.background};
  transition: 0.2s;
  cursor: pointer;
  gap: 1rem;

  &:hover {
    background-color: ${(props) => props.isRead ? "#ededed" : "#f8f8f8"};
  }
`
export const Profile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > h4 {
    font-size: ${fontSizes.Body};
    font-weight: 500;
  }

  & > p {
    font-size: ${fontSizes.Caption};
    color: ${colors.gray};
  }
`

export const CategoryBox = styled.article<{ isDrop: boolean }>`
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.isDrop ? "5rem" : "1000px;")};
  transition: all 0.4s ease-in-out;
`
export const CategoryList = styled.div`
  width: 100%;
  height: 100%;
`