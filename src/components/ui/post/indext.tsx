'use client'

import * as S from './style';
import Image from 'next/image'

interface PostProps {
    post: {
        thumbnail: string;
    };
}

export default function Post({ post }: PostProps) {
    return (
        <S.Post>
            <S.PostImg>
                <Image
                    src={post.thumbnail}
                    alt="thumbnail"
                    width={400}
                    height={400}
                    style={{ objectFit: "cover" }}
                />

            </S.PostImg>
        </S.Post>
    );
}