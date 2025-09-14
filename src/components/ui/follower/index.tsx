import React, { useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import { useQuery } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { FollowerUserInfo } from '@/types/profile';

interface FollowerListProps {
  onClose: () => void;
  userId: string;
}

export default function FollowerList({ onClose, userId }: FollowerListProps) {
  // const [search, setSearch] = useState('');
  
  const { data: followerData } = useQuery(ProfileGQL.QUERIES.GET_FOLLOWERS, {
    variables: { userId },
  });

  const followers = followerData?.getFollowerInfo ?? [];
  // const filtered = followers.filter((f: FollowerUserInfo) =>
  //   f.userId.includes(search)
  // );

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <S.Container>
          <S.Title>팔로워</S.Title>
          {/* <S.SearchBox>
            <Image
              src='/icons/search.svg'
              alt="search"
              width={22}
              height={22}
            />
            <S.SearchInput
              placeholder="검색어를 입력하세요."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </S.SearchBox> */}
          <S.List>
            {followers.map((f: FollowerUserInfo) => (
              <S.Item key={f.id}>
                <S.ProfileImg>
                  <Image src={f.profile} alt="프로필" width={55} height={55} />
                </S.ProfileImg>
                <S.Info>
                  <S.Username>{f.userId}</S.Username>
                  <S.Name>{f.userId}</S.Name>
                </S.Info>
                <S.DeleteBtn>삭제</S.DeleteBtn>
              </S.Item>
            ))}
          </S.List>
          <S.ConfirmButtonWrap>
            <Square
              text="확인"
              status={true}
              width="100%"
              onClick={onClose}
            />
          </S.ConfirmButtonWrap>
        </S.Container>
      </S.ModalWrapper>
    </S.Overlay>
  );
} 