import styled from '@emotion/styled'
import { colors, fontSizes, radius } from '@/styles/theme'

export const Layout = styled.div`
  display: flex;
  width: 70%;
  min-height: 100vh;
  background: ${colors.background};
`

export const NavArea = styled.div`
  flex: 0 0 20vw;
  min-width: 220px;
  max-width: 300px;
  background: ${colors.background};
  border-right: 1px solid ${colors.line};
`

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem 6rem;
  margin: 0 auto;
  gap: 30px;
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
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`

export const LogoutButton = styled.button`
  flex: 1;
  background: #FBE9EB;
  color: ${colors.text};
  border: none;
  padding: 0.8rem 0;
  border-radius: 10px;
  cursor: pointer;
`

export const WithdrawButton = styled.button`
  flex: 1;
  background: #FFEAEA;
  color: red;
  border: none;
  padding: 0.8rem 0;
  border-radius: 10px;
  cursor: pointer;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #B9B9B9;
  border-radius: ${radius.sm};
  padding: 0 1rem;
  height: 55px;
  width: 44vw;
  background: #fff;
`

export const ContactText = styled.span`
  font-size: 1rem;
  color: ${colors.text};
`

export const Delete = styled.button`
  color: ${colors.primary};
  font-size: 0.95rem;
  background: none;
  border: none;
  cursor: pointer;
`

export const AddContact = styled.button`
  color: #0064E0;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 32.5rem;
  text-align: left;
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  background: ${colors.primary};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
`