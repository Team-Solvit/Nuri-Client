import styled from "@emotion/styled";
import {fontSizes, zIndex} from "@/styles/theme";
import {mq} from '@/styles/media';

export const HeaderContainer = styled.header`
  height: 100vh;
  position: relative;
  background-color: white;
  padding: 2rem 1.3rem 3.5rem 1.3rem;
  min-width: 17%;
  color: #6C757D;
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.modal};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  ${mq.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8vh;
    padding: 0.375rem 0.1875rem;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    & > img {
      display: none;
    }
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.31rem;
  margin-top: 1.19rem;

  ${mq.mobile} {
    flex-direction: row;
    gap: 0;
    margin-top: 0;
    flex: 1;
    justify-content: space-around;
  }
`;
export const MenuItem = styled.div<{ active?: boolean, label?: string }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({active}) => (active ? "#FF4C61" : "")};
  background: ${({active}) => (active ? "#FF4C611A" : "transparent")};
  font-weight: ${({active}) => (active ? 600 : "normal")};

  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  font-size: ${fontSizes.Body};
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  & > img {
    filter: ${({active}) => active ? "invert(56%) sepia(50%) saturate(7496%) hue-rotate(328deg) brightness(107%) contrast(101%)" : "none"};
  }

  &:hover {
    background: ${({active}) => (active ? "rgb(255, 210, 215)" : "rgba(90, 90, 90, 0.03)")};
  }

  ${mq.mobile} {

    ${({label}) => label?.includes("제3자") && `
      display: none;
    `}

    ${({ label }) => {
      switch (label) {
        case "홈":
          return "order: 0;";
        case "탐색":
          return "order: 1;";
        case "만들기":
          return "order: 2;";
        case "모임":
          return "order: 3;";
        case "프로필":
          return "order: 4;";
        default:
          return "";
      }
    }}

    flex-direction: column;
    & > div {
      display: none;
    }
`;

export const HeaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.31rem;
  margin-top: auto;

  ${mq.mobile} {
    display: none;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const Report = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`;