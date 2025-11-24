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
export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
  padding: 0 1.5rem;
`
export const BackButton = styled.button`
  display: none; // 기본적으로 숨김
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 0.5rem;

  ${mq.mobile} {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
  }
`;

export const AddRoom = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  gap: 1rem;
  justify-content: flex-end;
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
  padding: 0.5rem 1rem;
  display: flex;
  margin-bottom: 1rem;

  & > input {
    width: 100%;
    outline: none;
    border: none;
    font-size: ${fontSizes.Body};
  }
	& > img{
		cursor: pointer;
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
  position: relative; /* 변경: 뱃지 위치용 컨테이너 */

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
	& > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Info = styled.div<{ hasUnread?: boolean }>`
  width: 180px;
  overflow: hidden;
  
  h4, p {
    white-space: nowrap;
    margin-bottom: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    font-size: ${fontSizes.Body};
    font-weight: 500;
  }

  p {
    font-size: ${fontSizes.Caption};
    color: ${({ hasUnread }) => hasUnread ? colors.text : colors.gray};
    font-weight: 400;
  }
`;

export const CategoryList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`

export const NoText = styled.p`
padding: 0 1rem;
`

export const UnreadBadge = styled.span`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  background-color: ${colors.primary};
  color: ${colors.background};
  font-size: ${fontSizes.Caption};
  font-weight: 600;
  border-radius: ${radius.full};
  width: 0.5rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`