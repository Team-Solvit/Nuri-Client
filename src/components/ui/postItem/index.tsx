'use client'

import * as S from './style';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

interface PostCardProps {
  id: string;
  user: string;
  userId: string;
  title: string;
  price: string;
  thumbnail: string;
  userProfile: string;
  onClick: (id: string) => void;
  hideProfile?: boolean;
}

export default function PostItem({
  id,
  user,
  userId,
  title,
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
  const imageSrc = thumbnail && isValidUrl(thumbnail) ? thumbnail : '/post/post-example.png';

  return (
    <S.PostItem onClick={() => onClick(id)}>
      <S.Post>
        <S.PostThumbnail>
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </S.PostThumbnail>
        <S.PostMain>
          <S.PostTitle>{title}</S.PostTitle>
          {/* <S.PostRegion>{region}</S.PostRegion> */}
          <S.PostPrice>
            ₩ {Number(price?.replace(/,/g, '') || 0).toLocaleString()} / 월
          </S.PostPrice>
        </S.PostMain>
      </S.Post>

      {!hideProfile && (
        <S.Profile>
          {userProfile && isValidUrl(userProfile) ? (
            <Image
              src={userProfile}
              alt="프로필"
              width={isMobile ? 36 : 50}
              height={isMobile ? 36 : 50}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: isMobile ? 36 : 50,
                height: isMobile ? 36 : 50,
                borderRadius: '50%',
                background: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: isMobile ? 14 : 20,
                color: '#666',
              }}
            >
              {(userId && userId[0]) || '?'}
            </div>
          )}
          <S.PostUser>{user}</S.PostUser>
        </S.Profile>
      )}
    </S.PostItem>
  );
}
