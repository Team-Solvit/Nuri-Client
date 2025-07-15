import React from 'react'
import * as S from './style'
import Image from 'next/image'

const dummyList = [
  { id: 1, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 2, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 3, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 4, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 5, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 6, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 7, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
  { id: 8, profile: '/profile/profile.svg', nickname: 'xx._un8', name: '오주현' },
]

export default function Follower() {
  return (
    <S.Wrapper>
      <S.Title>팔로워</S.Title>
      <S.SearchBox>
        <S.SearchIconWrap>
          <Image src="/icons/search.svg" alt="검색" width={20} height={20} />
        </S.SearchIconWrap>
        <S.SearchInput placeholder="검색어를 입력하세요." />
      </S.SearchBox>
      <S.ListArea>
        {dummyList.map((item) => (
          <S.ListItem key={item.id}>
            <S.ProfileWrap>
              <Image src={item.profile} alt="프로필" width={55} height={55} style={{ borderRadius: '50%' }} />
              <S.Info>
                <S.Nickname>{item.nickname}</S.Nickname>
                <S.Name>{item.name}</S.Name>
              </S.Info>
            </S.ProfileWrap>
            <S.DeleteBtn>삭제</S.DeleteBtn>
          </S.ListItem>
        ))}
      </S.ListArea>
      <S.ConfirmBtn>확인</S.ConfirmBtn>
    </S.Wrapper>
  )
} 