import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const NavigateCon = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`

export const HostCard = styled.div`
  display: flex;
  align-items: center;
	flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: ${radius.md};
  border: 1px solid ${colors.line};
  background: linear-gradient(0deg, rgba(255,91,91,0.08) 0%, rgba(255,91,91,0.02) 100%);
  
  ${mq.mobile} {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 2rem);
    max-width: 400px;
    z-index: ${zIndex.overlay + 1};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
background: linear-gradient(to bottom, rgba(255,91,91,0.00) 0%, rgba(255,91,91,0.15) 100%), ${colors.background};    animation: slideUp 0.3s ease-out;
    
    @keyframes slideUp {
      from {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  }
`;

export const HostCardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${colors.gray};
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  display: none;
  &:hover {
    color: ${colors.text};
  }
  
  ${mq.mobile} {
    display: flex;
  }
`;

export const HostCardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const HostTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & > strong {
    font-size: ${fontSizes.Body};
    color: ${colors.text};
  }
  & > span {
    font-size: ${fontSizes.Caption};
    color: ${colors.gray};
  }
`;

export const HostCTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  background-color: ${colors.primary};
  color: ${colors.background};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Caption};
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

export const NeverShowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  background-color: transparent;
  color: ${colors.gray};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Caption};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${colors.text};
  }
  ${mq.mobile}{
    display: block;
  }
`;

export const NavigateContainer = styled.section`
  display: inline-flex;
  padding: 1rem;
	width: 100%;
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
    z-index: ${zIndex.overlay}
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