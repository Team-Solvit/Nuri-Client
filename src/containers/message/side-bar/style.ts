import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MessageContainer = styled.section<{ id: string }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 12fr;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${colors.background};
  padding: 1rem 0;
  z-index: ${zIndex.overlay};
  place-items: center;
  overflow: hidden;

  ${mq.mobile} {
    ${({id}) => id && 'display: none;'}
  }
`
export const AddRoom = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  position: relative;

  & > img {
    cursor: pointer;
    border-radius: 100%;
    background: white;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 0.2rem;
  }
`
export const Search = styled.div`
  width: 90%;
  gap: 1rem;
  border-radius: ${radius.md};
  border: 1px solid #DDDDDD;
  padding: 0.5rem 2rem;
  display: flex;
  margin-bottom: 1rem;

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
  width: 180px;
  overflow: hidden;

  h4, p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    font-size: ${fontSizes.Body};
    font-weight: 500;
  }

  p {
    font-size: ${fontSizes.Caption};
    color: ${colors.gray};
  }
`;

export const CategoryList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`
