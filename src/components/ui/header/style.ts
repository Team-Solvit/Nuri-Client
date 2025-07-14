import styled from "@emotion/styled";
import {fontSizes, zIndex} from "@/styles/theme";

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
`;

export const Logo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-bottom: 1.19rem;
  cursor: pointer;
`;
export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.31rem;
  margin-top: 1.19rem;
`;
export const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ active }) => (active ? "#FF4C61" : "")};
  background: ${({ active }) => (active ? "#FF4C611A" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  font-size: ${fontSizes.Body};
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  & > img {
    filter: ${({ active }) => active ? "invert(56%) sepia(50%) saturate(7496%) hue-rotate(328deg) brightness(107%) contrast(101%)" : "none"};
  }

  &:hover {
    background: ${({ active }) => (active ? "rgb(255, 210, 215)" : "rgba(90, 90, 90, 0.03)")};
  }
`;

export const HeaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.31rem;
  margin-top: auto;
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