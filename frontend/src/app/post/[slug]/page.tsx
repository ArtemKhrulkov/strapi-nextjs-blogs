import { URL } from "@/lib";
import { Post as PostType } from "@/types";
import { Post } from "@/app/components/Post";

const getPostData = async (slug: string) => {
  return await fetch(`${URL}/api/blogs/${slug}?populate=*`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: PostType = await getPostData(slug);

  return <Post post={post} />;
}
