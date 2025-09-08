import styled from '@emotion/styled'
import { colors } from '@/styles/theme'
import { mq } from '@/styles/media'

export const Layout = styled.div`
  display: flex;
  width: 100%;
  background: ${colors.background};
`

export const NavArea = styled.div`
  flex: 0 0 20vw;
  background: ${colors.background};
  border-right: 1px solid ${colors.line};

  ${mq.mobile} {
    display: none;
  }
`

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4.1rem 4.95rem;
  margin: 0 auto;

  ${mq.mobile} {
    padding: 1rem;
    width: 100%;
  }
`

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  margin-bottom: 32.5rem;

  ${mq.mobile} {
    gap: 1rem;
    //width: 100%;
  }
`

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;

  ${mq.mobile} {
    width: 100%;
    padding: 0 1rem;
  }
`

export const Radio = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #b9b9b9;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  cursor: pointer;

  &:checked {
    background-image: url("/icons/radio.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }
`;


export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 2rem;

  ${mq.mobile} {
    font-size: 20px;
    margin-bottom: 1rem;
  }
`

export const SearchBox = styled.div`
  width: 100%;
  background: #FBE9EB;
  border-radius: 10px;
  padding: 1.2rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
`

export const SearchText = styled.input`
  font-size: 1.2rem;
  outline: none;
  font-weight: 200;
  border: none;
  background-color: #FBE9EB;
  
  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }
`

export const LangName = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
`