import Image from "next/image";
import { Post } from "@/types";
import { URL } from "@/lib";
import Link from "next/link";

type Props = {
  post: Post;
};

export function Article({ post }: Props) {
  const imageAttributes = post.attributes.img.data.attributes;
  return (
    <article key={post.id} className="sm:w-fit lg:w-1/2 mb-10">
      <Image
        className="mb-5"
        alt={"blog-picture"}
        src={`${URL}${imageAttributes.formats.thumbnail.url}`}
        width={imageAttributes.formats.thumbnail.width}
        height={imageAttributes.formats.thumbnail.height}
      />
      <h1 className="font-bold text-3xl mb-3">{post.attributes.title}</h1>
      <p className="text-xl">{post.attributes.description}</p>
      <Link className="text-blue-600 text-xl" href={`/post/${post.id}`}>
        Go to post
      </Link>
    </article>
  );
}
