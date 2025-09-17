'use client'

import * as S from './style';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PostCardProps {
  id: number;
  user: string;
  title: string;
  //region: string;
  price: string;
  thumbnail: string;
  userProfile: string;
  onClick: (id: number) => void;
  hideProfile?: boolean;
}

export default function PostItem({
  id,
  user,
  title,
  //region,
  price,
  thumbnail,
  userProfile,
  onClick,
  hideProfile = false,
}: PostCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <S.PostItem onClick={() => onClick(id)}>
      <S.Post>
        <S.PostThumbnail>
          <Image src={thumbnail} alt={user} fill style={{ objectFit: 'cover' }} />
        </S.PostThumbnail>
        <S.PostMain>
          <S.PostTitle>{title}</S.PostTitle>
          {/* <S.PostRegion>{region}</S.PostRegion> */}
          <S.PostPrice>
            ₩ {Number(price).toLocaleString()}+ / 월
          </S.PostPrice>
        </S.PostMain>
      </S.Post>

      {!hideProfile && (
        <S.Profile>
          <Image
            src={userProfile}
            alt={user}
            width={isMobile ? 40 : 70}
            height={isMobile ? 40 : 70}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <S.PostUser>{user}</S.PostUser>
        </S.Profile>
      )}
    </S.PostItem>
  );
}
