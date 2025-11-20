import styled from '@emotion/styled'
import { colors, fontSizes, radius } from '@/styles/theme'
import { mq } from '@/styles/media'

export const Layout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: ${colors.background};

  ${mq.mobile} {
    width: 100%;
    padding-bottom: 67px;
    display: flex;
    flex-direction: column;
  }
`

export const NavArea = styled.div`
  flex: 0 0 20vw;
  min-width: 220px;
  max-width: 300px;
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
  padding: 4rem 6rem;
  gap: 30px;
  max-width: 900px;
  width: 100%;
  box-sizing: border-box;

  ${mq.mobile} {
    padding: 1rem;
    gap: 18px;
    max-width: 100%;
  }
`

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 16px;

  ${mq.mobile} {
    font-size: 20px;
  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  ${mq.mobile} {
    gap: 18px;
  }
`

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
  color: ${colors.text};
  margin-bottom: 0.5rem;

  ${mq.mobile} {
    font-size: 15.5px;
  }
`

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${mq.mobile} {
    gap: 8.86px;
  }
`

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #B9B9B9;
  border-radius: ${radius.sm};
  padding: 0 1rem;
  height: 55px;
  width: 100%;
  background: #fff;

  ${mq.mobile} {
    height: 55px;
    width: 100%;
    border-radius: 4.43px;
  }
`

export const ContactText = styled.span`
  font-size: 1rem;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: 12px;
  }
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${mq.mobile} {
    gap: 8.86px;
  }
`

export const Input = styled.input`
  height: 55px;
  border: 1px solid #B9B9B9;
  border-radius: ${radius.sm};
  padding: 0 1rem;
  font-size: 1rem;
  color: ${colors.text};
  background: #fff;
  &::placeholder {
    color: #8C8C8C;
    font-weight: 200;
  }
`