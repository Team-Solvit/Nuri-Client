import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const NavigateContainer = styled.section`
  display: inline-flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};

  ${mq.mobile} {
    justify-content: space-between;
    flex-direction: row;
    background: rgba(255, 255, 255, 0.90);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 4.57px 7.312px 0 rgba(0, 0, 0, 0.03), 0 10.967px 36.558px 0 rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(2px);
    z-index: ${zIndex.dropdown}
  }
`
export const NavigateBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.2s ease-in-out;
  border: none;
  font-size: ${fontSizes.Body};
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: ${radius.md};
  background-color: ${({isActive}) => isActive ? '#efefef' : 'transparent'};

  ${mq.mobile} {
    width: max-content;
  }

  &:hover {
    background-color: #F8F8F8;
  }

  & > p {
    ${mq.mobile} {
      display: none;
    }
  }
`
export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
export const Count = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(20%, -50%);
  z-index: ${zIndex.dropdown};
  font-size: ${fontSizes.Caption};
  font-weight: 400;
  border-radius: ${radius.full};
  background-color: ${colors.primary};
  color: ${colors.background};
`
export const Logo = styled.div`
  display: none;

  ${mq.mobile} {
    position: relative;
    width: 3.4rem;
    height: 3.4rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
  }
`
export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;

  ${mq.mobile} {
    flex-direction: row;
    gap: 0.2rem;
  }
`