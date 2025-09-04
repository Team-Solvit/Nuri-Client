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
    align-items: center;
    background: rgba(255, 255, 255, 0.90);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.6rem 1rem;
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
export const TextBtn = styled.p`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:nth-of-type(2) {
    color: ${colors.primary};
  }

  margin: 0.5rem 0;

  ${mq.mobile} {
    cursor: pointer;
    margin: 0 1rem 0 0;

    &:active {
      text-decoration: underline;
    }
  }
`
export const Or = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  color: ${colors.gray};
  font-size: ${fontSizes.Caption};

  & > p {
    width: 80%;
    white-space: nowrap;
    text-align: center;
  }

  ${mq.mobile} {
    display: none;
  }
`
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.line};
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
    width: 4rem;
    height: 4rem;
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
  width: 100%;

  ${mq.mobile} {
    flex-direction: row;
    gap: 0.2rem;
    justify-content: flex-end;
  }
`