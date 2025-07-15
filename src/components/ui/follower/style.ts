import styled from '@emotion/styled'
import { colors } from '@/styles/theme'

export const Wrapper = styled.div`
  width: 430px;
  min-height: 600px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.25);
  padding: 2.5rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #000;
  margin-bottom: 1.5rem;
`

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #8C8C8C;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.2rem;
`

export const SearchIconWrap = styled.div`
  margin-right: 0.5rem;
`

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  flex: 1;
  background: transparent;
  color: #8C8C8C;
`

export const ListArea = styled.div`
  flex: 1;
  min-height: 200px;
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #EAEAEA;
  padding: 0.7rem 1rem;
  gap: 1rem;
`

export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

export const Nickname = styled.div`
  font-size: 20px;
  font-weight: 200;
  color: #000;
`

export const Name = styled.div`
  font-size: 15px;
  color: #909090;
  font-weight: 200;
`

export const DeleteBtn = styled.button`
  background: #909090;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  padding: 0.3rem 1.2rem;
  cursor: pointer;
`

export const ConfirmBtn = styled.button`
  width: 100%;
  height: 47px;
  background: #FF4C61;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  margin-top: 1.2rem;
  cursor: pointer;
` 