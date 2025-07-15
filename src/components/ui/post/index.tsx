'use client'

import * as S from './style';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

interface PostProps {
    post: {
        id: number;
        thumbnail: string;
    };
}

export default function Post({ post }: PostProps) {
    const router = useRouter();

    const postClick = (path: string) => {
        router.push(path);
    };

    return (
        <S.Post onClick={() => postClick(`/post/${post.id}`)}>
            <S.PostImg>
                <Image
                    src={post.thumbnail}
                    alt="thumbnail"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                />
            </S.PostImg>
        </S.Post>
    );
}