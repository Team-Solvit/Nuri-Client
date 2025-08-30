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
  border-right: 1px solid #eaeaea;
  background: #fff;

  ${mq.mobile} {
    display: none;
  }
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 6rem 0rem 5rem;
  margin: 0 auto;

  ${mq.mobile} {
    //padding: 1rem;
    margin: 0;
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
    width: 93vw;
    height: 15vh;
    padding: 20px 17px;
    border-radius: 5px;
    gap: 0;
    flex-direction: row;
    align-items: flex-start;
  }
`

export const Button = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${mq.mobile} {
      gap: 0.3rem;
      margin-left: 1rem;
      margin-top: -0.3rem;
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
  width: 20vw;
  aspect-ratio: 1 / 1;
  height: auto;
  margin-top: 0.3rem;
}
`

export const ProfileInfo = styled.div`
  gap: 10rem;
  display: flex;

  ${mq.mobile} {
    gap: 2rem;
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
    width: 25vw;
    height: 5vh;
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
    width: 25vw;
    height: 5vh;
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
    width: 30vw;
    align-items: center;
    justify-content: center;
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
    width: 93vw;
    height: 20vh;
    border-radius: 3px;
    padding: 10px;
    margin-top: 1rem;
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