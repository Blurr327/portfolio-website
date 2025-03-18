import { ArticleWithSlug } from "@/lib/blog";
import { PostComponent } from "@/app/blog/PostComponent";
import React from "react";

export default async function PostsList({
  articles,
}: Readonly<{ articles: ArticleWithSlug[] }>) {
  return (
    <>
      <div className="md:border-l md:border-black md:pl-6">
        <div className="flex w-full flex-col space-y-16">
          {articles.map((article) => (
            <PostComponent key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
