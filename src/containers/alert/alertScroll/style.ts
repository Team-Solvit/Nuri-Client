import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";
import {mq} from "@/styles/media";

export const AlertScrollContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  ${mq.mobile} {
    padding: 0 1rem;
  }
`
export const Alert = styled.article<{ isRead: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 2rem 1rem;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${colors.line};
  background-color: ${(props) => props.isRead ? colors.line2 : colors.background};
  transition: 0.2s;
  border-radius: ${radius.md};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.isRead ? colors.line : "#f8f8f8"};
  }

  &:first-of-type {
    ${mq.mobile} {
      margin-top: 6rem;
    }
  }

  &:last-of-type {
    ${mq.mobile} {
      margin-bottom: 3rem;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  align-items: center;
  width: 4rem;
  height: 4rem;
	& > img{
		object-fit: cover;
	}
`

export const Title = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 400;
`

export const Info = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0 1rem;
`

export const CreatedDate = styled.time`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #888888;
`;
