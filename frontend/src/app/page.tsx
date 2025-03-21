"use client";
import { useCallback, useEffect, useState } from "react";
import { Meta, Post } from "@/types";
import { Article } from "@/app/components/Article";
import { URL } from "@/lib";
import { useRouter, useSearchParams } from "next/navigation";

async function getBlogData(start: number, limit: number) {
  const res = await fetch(
    `${URL}/api/blogs?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get pagination parameters from URL
  const getParamsFromUrl = useCallback(() => {
    const start = parseInt(searchParams.get("start") || "0");
    const limit = parseInt(searchParams.get("limit") || "5");
    return { start, limit };
  }, [searchParams]);

  // Update URL with current pagination state
  const updateUrlParams = useCallback(
    (start: number, limit: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("start", start.toString());
      params.set("limit", limit.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const fetchPostsData = useCallback(async (start: number, limit: number) => {
    const response = await getBlogData(start, limit);

    setPosts((prevPosts) =>
      start !== 0 && Array.isArray(prevPosts)
        ? [...prevPosts, ...response.data]
        : response.data,
    );
    setMeta(response.meta);
    updateUrlParams(start, limit);
  }, []);

  useEffect(() => {
    const { start, limit } = getParamsFromUrl();
    fetchPostsData(start, limit);
  }, [searchParams]);

  const loadMorePosts = (): void => {
    if (!meta) return;
    fetchPostsData(0, meta.pagination.total);
  };

  const checkItemsLimit = (meta: Meta): boolean =>
    meta.pagination.start + meta.pagination.limit < meta.pagination.total;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-12 lg:p-24 p-7">
      {posts?.map((post) => <Article key={post.id} post={post} />)}
      {meta && checkItemsLimit(meta) && (
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-xl rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
            onClick={loadMorePosts}
          >
            Load more posts...
          </button>
        </div>
      )}
    </main>
  );
}
