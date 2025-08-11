import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 30vw;
  height: 65vh;
  background: ${colors.background};
  border-radius: ${radius.lg2};
  box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.25);
  padding: 2rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  position: relative;

  ${mq.mobile} {
    width: 80vw;
    height: 55vh;
    gap: 1rem;
  } 
`


export const Title = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: ${colors.text};
  margin: 0 0 0.5rem 0;
`;

export const SearchBox = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.gray};
  border-radius: ${radius.md};
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  background: transparent;
  display: flex;
  align-items: center;

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: calc(55vh - 12rem);
  overflow-y: auto;
  width: 100%;
  &::-webkit-scrollbar {
        display: none;
    }

  ${mq.mobile} {
    margin-bottom: 5rem;
  }
`


export const ConfirmButtonWrap = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
`;


export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.background};
  gap: 1rem;
  width: 25.5vw;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;


export const ProfileImg = styled.div`
  width: 55px;
  height: 55px;
  border-radius: ${radius.full};
  overflow: hidden;
  flex-shrink: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  flex: 1;
`;

export const Username = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 300;
  color: ${colors.text};
`;

export const Name = styled.div`
  font-size: ${fontSizes.Small};
  font-weight: 200;
  color: #909090;
`;

export const DeleteBtn = styled.button`
  background: ${colors.gray};
  color: ${colors.background};
  border: none;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 1rem;
  transition: background 0.2s;
  &:hover {
    background: #fbe9eb;
  }

  ${mq.mobile} {
    margin-left: 2.5rem;
    white-space: nowrap;
  }
`; 