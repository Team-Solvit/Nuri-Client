'use client'

import * as S from './style';
import Image from 'next/image';

interface PostCardProps {
  id: number;
  user: string;
  title: string;
  region: string;
  price: string;
  thumbnail: string;
  userProfile: string;
  onClick: (id: number) => void;
}

export default function PostItem({
  id,
  user,
  title,
  region,
  price,
  thumbnail,
  userProfile,
  onClick,
}: PostCardProps) {
  return (
    <S.PostItem onClick={() => onClick(id)}>
      <S.Post>
        <S.PostThumbnail>
          <Image
            src={thumbnail}
            alt={user}
            fill
            style={{ objectFit: 'cover' }}
          />
        </S.PostThumbnail>
        <S.PostMain>
          <S.PostTitle>{title}</S.PostTitle>
          <S.PostRegion>{region}</S.PostRegion>
          <S.PostPrice>₩ {price}0,000+ / 월</S.PostPrice>
        </S.PostMain>
      </S.Post>
      <S.Profile>
        <Image
          src={userProfile}
          alt={user}
          width={70}
          height={70}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <S.PostUser>{user}</S.PostUser>
      </S.Profile>
    </S.PostItem>
  );
}
