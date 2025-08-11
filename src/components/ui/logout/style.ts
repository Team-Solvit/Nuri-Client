import styled from '@emotion/styled'
import { mq } from '@/styles/media'

export const FullScreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  align-items: center;
  justify-content: center;
`

export const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 25vw;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    width: 70vw;
    height: 30vh;
  }
`

export const Title = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  span {
    color: #f66;
  }
`

export const Text = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

export const CancelBtn = styled.button<{ width?: string }>`
  flex: 1;
  background: #eee;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  width: ${({ width }) => width || 'auto'};

  ${mq.mobile} {
    width: 25vw;
    white-space: nowrap;
  }
`
