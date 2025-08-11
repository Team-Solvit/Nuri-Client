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
export const MenuItem = styled.div<{ active?: boolean, label?: string, order?: number }>`
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
    ${({ order }) => order !== undefined && `order: ${order};`}
    flex-direction: column;
    & > div {
      display: none;
    }
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

export const MoreWrap = styled.div`
  position: relative;
`;

export const MoreDropdown = styled.div<{ open?: boolean }>`
  position: absolute;
  right: 0;
  bottom: calc(100% + 10px);
  padding: 8px;
  min-width: 200px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
  z-index: 2;
  opacity: ${({open}) => (open ? 1 : 0)};
  transform: translateY(${({open}) => (open ? '0' : '6px')});
  pointer-events: ${({open}) => (open ? 'auto' : 'none')};
  transition: opacity .18s ease, transform .18s ease;
`;

export const MoreCaret = styled.div`
  position: absolute;
  right: 16px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-left: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transform: rotate(45deg);
`;

export const MoreItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background .15s ease;

  &:hover { background: rgba(0,0,0,0.04); }
  &:active { background: rgba(0,0,0,0.06); }

  & > span { font-size: 14px; color: #111; }
`;

export const MoreBar = styled.div<{ open?: boolean }>`
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 12px 36px rgba(0,0,0,0.16);
  backdrop-filter: blur(8px);
  width: calc(100% - 24px);
  margin: 0 auto;
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(8vh + 12px);
  z-index: ${zIndex.modal + 1};
  opacity: ${({open}) => (open ? 1 : 0)};
  transform: translateY(${({open}) => (open ? '0' : '8px')});
  pointer-events: ${({open}) => (open ? 'auto' : 'none')};
  transition: opacity .2s ease, transform .2s ease;

  ${mq.mobile} {
    display: grid;
  }
`;

export const MoreAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  min-height: 48px;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background .15s ease;

  &:hover { background: rgba(0,0,0,0.04); }
  &:active { background: rgba(0,0,0,0.06); }

  & > span { font-size: 14px; color: #111; }
`;