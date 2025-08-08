'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostDetail from '@/components/ui/post/detail';
import * as S from '@/components/layout/modal/style';

export default function PostModal() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const close = () => router.back();

  if (!mounted) return null;

  return (
    <S.Black onClick={close}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <PostDetail id={id} />
      </S.Content>
    </S.Black>
  );
}
