// style.ts
import styled from '@emotion/styled'
import { colors, fontSizes } from '@/styles/theme'

export const Container = styled.div`
  display: flex;
  width: 70%;
  min-height: 100vh;
  background: #fff;
`

export const Sidebar = styled.div`
  flex: 0 0 20vw;
  min-width: 220px;
  max-width: 300px;
  border-right: 1px solid #eaeaea;
  background: #fff;
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 6rem;
  margin: 0 auto;
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 1.5rem;
`

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: #fbe9eb;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  width: 50vw;
`

export const Button = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const ProfileImageWrap = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #d9d9d9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProfileInfo = styled.div`
  gap: 10rem;
  display: flex;
`

export const Intro = styled.span`
  display: flex;
  font-size: ${fontSizes.H3};
  margin-top: 3rem;
`

export const NameInput = styled.input`
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  color: ${colors.text};
  background: #fff;
  width: 220px;
  margin-top: 5px;
`

export const NickInput = styled.input`
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  color: ${colors.text};
  background: #fff;
  width: 220px;
`

export const ChangePhotoBtn = styled.label`
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  max-height: 4.5vh;
  margin-top: 0.5rem;
`

export const BioSection = styled.div`
  background: #fff;
  border-radius: 15px;
  border: 1px solid #8c8c8c;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
`

export const Change = styled.div`
    display: flex;
    margin-top: 1rem;
`

export const BioInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: none;
  font-size: 1.1rem;
  color: #8c8c8c;
  background: transparent;
  resize: none;
  outline: none;
`

export const SaveButton = styled.button`
  width: 100%;
  height: 44px;
  background: ${colors.primary};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
`
