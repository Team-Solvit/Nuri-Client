'use client';
import { use } from "react";
import PostDetailPage from "@/containers/post/PostDetailPage";

type Props = {
  params: Promise<{ id: string }>;
}

export default function FullPostPage({ params }: Props) {
  const { id } = use(params);
  return <PostDetailPage postId={id} />;
}
