import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

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
  max-height: 100vh;
`


export const ProfileImage = styled.div`
  position: relative;
  width: 10vw;
  height: 18vh;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.gray};
  
  img {
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`

export const PlusIcon = styled.div`
  position: absolute;
  right: 2.5rem;
  bottom: 2.5rem;
  z-index: 2;
`


export const Nickname = styled.div`
  font-size: ${fontSizes.H3};
  margin-bottom: 1rem;
`

export const Profile = styled.div`
  display: flex;
  width: 100%;
  height: 28vh;
  padding: 0rem 8rem;
`

export const ProfileMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 8rem;
`

export const introduction = styled.span`
    color: ${colors.gray};
`

export const List1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
` 

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 73vw;
`

export const List2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
  width: 100%;
  margin-top: 1rem;
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
`



export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.5rem;
`

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${fontSizes.H4};
`

export const StatLabel = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;
`

export const StatLabelF = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;
  cursor: pointer;
`
export const StatLabelF2 = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  font-weight: 200;
  cursor: pointer;
`

export const StatValue = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
`

export const StatValue1 = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  cursor: pointer;
`
export const StatValue2 = styled.div`
  font-size: ${fontSizes.H3};
  font-weight: 500;
  cursor: pointer;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 3rem;
`

export const Button = styled.div`
  display: flex;
  gap: 1rem;
`

export const Side = styled.div<{ isSelected: number }>`
  display: flex;
  width: 73vw;
  align-items: center;
  font-size: ${fontSizes.Body};
  justify-content: center;
  gap: 6rem;
  color: ${colors.gray};
  border-top: 2px solid ${colors.line};
  font-weight: 500;
  margin-top: 5rem;
  position: relative;

  & > div:nth-of-type(1) {
    left: 0;
  }

  & > div:nth-of-type(${(props) => props.isSelected}) {
    border-top: 2px solid ${colors.primary};
    color: ${colors.primary};
    margin-top: -1px;
  }

  & > div:nth-of-type(3) {
    right: 0;
  }
`

export const Tab = styled.div`
  background-color: ${colors.background};
  padding: 1rem 3rem;
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  cursor: pointer;
  text-align: center;
`

export const EditButton = styled.button`
  background: ${colors.primary};
  color: ${colors.background};
  border: none;
  border-radius: ${radius.md};
  padding: 0.5rem 1.5rem;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  cursor: pointer;
`

export const SettingButton = styled.button`
  background: ${colors.background};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: ${radius.md};
  padding: 0.5rem 1.5rem;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  cursor: pointer;
`
