import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";

export const NavigateContainer = styled.section`
  display: inline-flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
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

  &:hover {
    background-color: #F8F8F8;
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