import PostDetailContainer from "@/containers/post/PostDetailPage";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function FullPostPage({ params }: Props) {
  const { id } = await params;
  return <PostDetailContainer postId={id} />;
}