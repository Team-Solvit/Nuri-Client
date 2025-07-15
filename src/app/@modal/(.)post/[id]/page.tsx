// src/app/@modal/(post)/[id]/page.tsx
'use client';

import { useRouter, useParams } from "next/navigation";
import { createPortal } from "react-dom";
import PostDetail from "@/components/ui/post/detail";
import * as S from "@/components/layout/modal/style";

export default function PostModal() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const close = () => router.back();

  return createPortal(
    <S.Black onClick={close}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <PostDetail id={id} />
      </S.Content>
    </S.Black>,
    document.body
  );
}
