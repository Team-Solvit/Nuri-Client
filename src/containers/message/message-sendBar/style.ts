import styled from "@emotion/styled";
import {colors, fontSizes} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MessageSendBarContainer = styled.section`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #DDDDDD;
  background-color: ${colors.background};

  ${mq.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
  }
`

export const ContentBox = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  align-items: center;
  gap: 1rem;
`
export const SendButton = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`
export const InputText = styled.textarea`
  width: 100%;
  height: 24px;
  border: none;
  outline: none;
  display: flex;
  scrollbar-width: none;
  align-items: center;
  flex-direction: column;
  line-height: 1.5;
  font-size: ${fontSizes.Body};
  resize: none;
`
export const AddFile = styled.div`
  width: 0.8rem;
  background-color: ${colors.line};
  padding: 1rem;
  cursor: pointer;
  border-radius: 100%;
  overflow: hidden;
  height: 0.8rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`