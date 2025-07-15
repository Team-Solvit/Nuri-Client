// src/app/post/[id]/page.tsx
import PostDetail from "@/components/ui/post/detail";

interface Props {
  params: { id: string };
}

export default function FullPostPage({ params: { id } }: Props) {
  return <PostDetail id={id} />;
}
