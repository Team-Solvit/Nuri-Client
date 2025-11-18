import styled from '@emotion/styled'
import { colors, fontSizes } from '@/styles/theme'
import { mq } from '@/styles/media'

export const Container = styled.div`
  display: flex;
  width: 70%;
  min-height: 100vh;
  background: #fff;

  ${mq.mobile} {
    width: 100%;
    flex-direction: column;
    padding-bottom: 67px;
  }
`

export const Sidebar = styled.div`
  flex: 0 0 20vw;
  min-width: 220px;
  max-width: 300px;
  background: ${colors.background};
  border-right: 1px solid ${colors.line};

  ${mq.mobile} {
    display: none;
  }
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 6rem 0rem 6.8rem;
  margin: 0 auto;

  ${mq.mobile} {
    padding: 1rem;
    margin: 0;
    width: 100%;
  }
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    font-size: 20px;
    margin-bottom: 1rem;
  }
`

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: #fbe9eb;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  width: 50vw;

  ${mq.mobile} {
    width: 100%;
    height: auto;
    padding: 1rem;
    border-radius: 8px;
    gap: 1rem;
    flex-direction: row;
    align-items: center;
  }
`

export const Button = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${mq.mobile} {
      gap: 0.5rem;
      margin-left: 0.5rem;
      flex: 1;
    }
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

  ${mq.mobile} {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
`

export const ProfileInfo = styled.div`
  gap: 10rem;
  display: flex;

  ${mq.mobile} {
    gap: 0.5rem;
    flex-direction: column;
    flex: 1;
  }
`

export const Intro = styled.span`
  display: flex;
  font-size: ${fontSizes.H3};
  margin-top: 3rem;

  ${mq.mobile} {
    font-size: 15px;
    font-weight: 500;
    margin-top: 2rem;
  }
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

  ${mq.mobile} {
    width: 100%;
    height: 40px;
    font-size: 14px;
    padding: 0.5rem;
  }
`

export const NickInput = styled.input`
  border: 1px solid #b9b9b9;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  color: ${colors.text};
  background: #fff;
  width: 220px;

  ${mq.mobile} {
    width: 100%;
    height: 40px;
    font-size: 14px;
    padding: 0.5rem;
  }
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

  ${mq.mobile} {
    display: flex;
    font-weight: 500;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
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
  margin-bottom: 10.1rem;

  ${mq.mobile} {
    width: 100%;
    height: auto;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
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