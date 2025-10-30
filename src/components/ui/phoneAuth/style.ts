import styled from '@emotion/styled'
import { colors, fontSizes, zIndex } from '@/styles/theme'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.modal};
  padding: 1rem;
`

export const ModalWrapper = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
`

export const Container = styled.div`
  padding: 2rem;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${colors.gray};
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.text};
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Step1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Step2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Description = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  margin: 0;
  line-height: 1.5;
`

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${colors.line2};
  border-radius: 0.5rem;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: ${colors.gray};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${colors.line2};
  border-radius: 0.5rem;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  background-color: ${colors.background};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  option {
    padding: 0.5rem;
  }
`

export const PhoneInfo = styled.div`
  background: ${colors.background};
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  font-weight: 500;
`

export const CodeDisplay = styled.div`
  background: ${colors.primary};
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const CodeLabel = styled.div`
  font-size: ${fontSizes.Body};
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`

export const CodeValue = styled.div`
  font-size: 2rem;
  color: ${colors.background};
  font-weight: 700;
  letter-spacing: 0.5rem;
  font-family: monospace;
`

export const InfoText = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  margin: 0;
  text-align: center;
`

export const ButtonWrapper = styled.div`
  width: 100%;
`

export const RetryButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.Body};
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
  padding: 0.5rem;
  
  &:hover {
    color: ${colors.primary};
  }
`

export const SmsButton = styled.a`
  display: block;
  background: ${colors.primary};
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  margin-top: 1rem;
  
  &:hover {
    background: ${colors.primary};
  }
`
