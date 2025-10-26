import React, { useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import { useQuery } from '@apollo/client';
import { ProfileGQL } from '@/services/profile';
import { FollowerUserInfo } from '@/types/profile';
import { useRouter } from 'next/navigation';

interface FollowerListProps {
  onClose: () => void;
  userId: string;
}

export default function FollowerList({ onClose, userId }: FollowerListProps) {
  // const [search, setSearch] = useState('');
  const router = useRouter();
  
  const { data: followerData } = useQuery(ProfileGQL.QUERIES.GET_FOLLOWERS, {
    variables: { userId },
  });

  const followers = followerData?.getFollowerInfo ?? [];
  // const filtered = followers.filter((f: FollowerUserInfo) =>
  //   f.userId.includes(search)
  // );
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getProfileImageUrl = (profile: string): string => {
    if (!profile) return '/profile/profile.svg';
    if (isValidUrl(profile)) {
      return profile;
    }
    
    return `https://cdn.solvit-nuri.com/file/${profile}`;
  };

  const handleProfileClick = (targetUserId: string) => {
    onClose();
    router.push(`/profile/${targetUserId}`);
  };

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
              <S.Item key={f.id} onClick={() => handleProfileClick(f.userId)} style={{ cursor: 'pointer' }}>
                <S.ProfileImg>
                  {f.profile && getProfileImageUrl(f.profile) !== '/profile/profile.svg' ? (
                    <Image 
                      src={getProfileImageUrl(f.profile)} 
                      alt="프로필" 
                      width={55} 
                      height={55}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: '50%',
                        background: '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 20,
                        color: '#666',
                      }}
                    >
                      {f.userId && f.userId[0] ? f.userId[0] : '?'}
                    </div>
                  )}
                </S.ProfileImg>
                <S.Info>
                  <S.Username>{f.userId}</S.Username>
                  <S.Name>{f.userId}</S.Name>
                </S.Info>
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