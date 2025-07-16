import PostDetail from "@/components/ui/post/detail";

interface Props {
  params: { id: string };
}

export default async function FullPostPage({ params }: Props) {
  const { id } = params;
  return <PostDetail id={id} />;
}