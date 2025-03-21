import Image from "next/image";
import { Post as PostType } from "@/types";
import { URL } from "@/lib";

type Props = {
  post: PostType;
};

export function Post({ post }: Props) {
  const imageAttributes = post.attributes.img.data.attributes;
  return (
    <div key={post.id} className="flex flex-col justify-center content-center">
      <Image
        className="flex self-center justify-self-center mb-5"
        alt={"blog-picture"}
        src={`${URL}${imageAttributes.url}`}
        width={imageAttributes.width}
        height={imageAttributes.height}
      />
      <h1 className="font-bold text-3xl mb-3">{post.attributes.title}</h1>
      <p className="text-xl text-wrap">{post.attributes.content}</p>
    </div>
  );
}
