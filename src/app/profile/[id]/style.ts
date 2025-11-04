import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.background};
  border-radius: ${radius.lg};
  width: 100%;
  padding: 4rem;
  overflow-y: auto;
  outline: none;
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 4px;
  }

  max-height: 100vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
       display: none;
  }

  ${mq.mobile} {
    padding: 0;
    max-height: 100vh;
    width: 100%;
    background: ${colors.background};
    overflow-y: auto;
  }
`

export const ProfileImage = styled.div`
  position: relative;
  width: 10vw;
  aspect-ratio: 1 / 1;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${mq.mobile} {
    width: 31vw;
    margin-left: 1.5rem;
    margin-top: 6rem;
    aspect-ratio: 1 / 1;
    height: auto;
  }
`

export const ProfileImage2 = styled.div`
  position: relative;
  width: 10vw;
  height: 18vh;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.mobile} {
    width: 31vw;
    margin-left: 1.5rem;
    margin-top: 6rem;
    aspect-ratio: 1 / 1;
    height: auto;
  }
`

export const PlusIcon = styled.div`
  position: absolute;
  z-index: 2;
`

export const Nickname = styled.div`
  font-size: ${fontSizes.H3};
  margin-top: 0.3rem;

  ${mq.mobile} {
    font-size: 20px;
    margin-bottom: 0;
    margin-left: -9rem;
  }
`

export const Profile = styled.div`
  display: flex;
  width: 100%;
  height: 28vh;
  padding: 0rem 8rem;

  ${mq.mobile} {
    flex-direction: row;
    width: 100%;
    height: auto;
    padding: 0;
    position: relative;
  }
`

export const ProfileMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 8rem;

  ${mq.mobile} {
    margin-left: 0;
    gap: 0;
    flex: 1;
  }
`

export const introduction = styled.span`
    color: ${colors.gray};

    ${mq.mobile} {
      font-size: ${fontSizes.Caption};
      font-weight: 200;
      margin-top: 10px;
      margin-left: 1rem;
      display: block;
    }
`

export const List1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;

  ${mq.mobile} {
    gap: 18px;
    margin-top: 0;
    padding: 0 16px;
    width: 100%;
  }
`

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 73vw;
  margin-top: 3rem;

  ${mq.mobile} {
    margin-top: 3.5rem;
    padding: 0 16px;
    margin-bottom: 5rem;
  }
`

export const List2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
  width: 100%;
  margin-top: 1rem;

  ${mq.mobile} {
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  margin-top: 0;
}
`

export const PostItem = styled.div`
  display: flex;
  padding: 12px;
  gap: 35rem;
  width: 66vw;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  background-color: ${colors.background};
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 100%;
    gap: 0;
    padding: 12.62px;
    height: 81px;
    border: 0.37px solid #8C8C8C;
    border-radius: 11.13px;
    background: ${colors.background};
  }
`

export const Side = styled.div<{ isSelected: number }>`
  display: flex;
  width: 73vw;
  margin-top: 5rem;
  align-items: center;
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  gap: 5rem;
  border-top: 2px solid ${colors.line};
  font-weight: 550;
  justify-content: space-around;
  position: relative;

  & > div:nth-of-type(1) {
    left: 0;
  }

  & > div:nth-of-type(${(props) => props.isSelected}) {
    border-top: 2px solid ${colors.primary};
    transition: all 0.1s ease-in-out;
    color: ${colors.primary};
  }

  & > div:nth-of-type(3) {
    right: 0;
  }

  ${mq.mobile} {
    width: 100%;
    margin-top: 3rem;
    border-top: 2px solid #B9B9B9;
    position: relative;
    height: 40px;
  }
`

export const Tab = styled.div`
  position: absolute;
  top: -1px;
  padding: 1rem 3rem;
  width: 20%;
  text-align: center;
  margin-left: 17.2rem;

  & > p {
    cursor: pointer;
  }

  ${mq.mobile} {
    width: 3rem;
    margin-top: -1px;
    text-align: center;
    margin-left: 5rem;
    font-size: 16px;
    font-weight: 500;

    & > p {
      cursor: pointer;
      width: 3rem;
      margin-left: -1.3rem;
    }
  }
`

export const Tab2 = styled.div`
  position: absolute;
  top: -1px;
  padding: 1rem 3rem;
  width: 20%;
  text-align: center;
  margin-left: 18rem;

  & > p {
    cursor: pointer;
  }

  ${mq.mobile} {
    width: 3rem;
    margin-top: -1px;
    text-align: center;
    margin-left: 11rem;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.gray};

    & > p {
      cursor: pointer;
      width: 3rem;
      margin-left: -1.3rem;
    }
  }
`

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    justify-content: flex-start;
    gap: 2rem;
    margin-bottom: 0;
    margin-left: 1rem;
    margin-top: 3.5rem;
  }
`

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${fontSizes.H4};

  ${mq.mobile} {
    gap: 0.2rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

export const StatLabel = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 200;
    color: #8C8C8C;
  }
`

export const StatLabelF = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;
  cursor: pointer;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 200;
    color: #8C8C8C;
  }
`

export const StatLabelF2 = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;
  cursor: pointer;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 200;
    color: #8C8C8C;
  }
`

export const StatValue = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 500;
    margin-left: 10px;
    color: ${colors.text};
  }
`

export const StatValue1 = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  cursor: pointer;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 500;
    margin-left: 7px;
    color: ${colors.text};
  }
`

export const StatValue2 = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  cursor: pointer;

  ${mq.mobile} {
    font-size: 14px;
    font-weight: 500;
    margin-left: 7px;
    color: ${colors.text};
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 3rem;

  ${mq.mobile} {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    align-items: center;
    justify-content: center;
  }
`

export const Button = styled.div`
  display: flex;
  gap: 1rem;

  ${mq.mobile} {
    gap: 9.14px;
  }
`
