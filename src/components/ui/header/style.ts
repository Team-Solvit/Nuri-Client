import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  height: 100vh;
  padding: 2rem;
  color: #6C757D;
  display: flex;
  flex-direction: column;
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
  font-size: 1.125rem;
  cursor: pointer;

  & > img {
    filter: ${({ active }) => active ? "invert(56%) sepia(50%) saturate(7496%) hue-rotate(328deg) brightness(107%) contrast(101%)" : "none"};
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
  margin-top: auto;
  color: #6C757D;
  cursor: pointer;
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6C757D;
  cursor: pointer;
`;