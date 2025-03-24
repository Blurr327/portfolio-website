import { ArticleWithSlug } from "@/lib/blog";
import { Card } from "@/components/Card";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import markdownToTxt from "markdown-to-txt";
import React from "react";

export const PostComponent = async ({
  article,
}: {
  article: ArticleWithSlug;
}) => {
  const description = markdownToTxt(article.content.substring(0, 1000));
  return (
    <article className="md:grid md:grid-cols-4">
      <Card className="md:col-span-3 md:ml-12 self-center">
        <Image
          src={"/portfolio-website/" + article.thumbnail}
          alt="Thumbnail"
          className="mt-1 md:hidden flex justify-center w-full h-full object-cover rounded-3xl p-4 relative z-10 order-first items-center text-sm text-zinc-400 pl-3.5 mb-4"
          width="50"
          height="50"
        />
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <div className="hidden md:block max-w-[100%]">
          <Card.Description>{description + "..."}</Card.Description>
        </div>
        <div className="md:hidden">
          <Card.Description>
            {description.substring(0, 400) + "..."}
          </Card.Description>
        </div>
        <Card.Cta>Lire</Card.Cta>
        <Card.Eyebrow>{formatDate(article.date)}</Card.Eyebrow>
      </Card>
      <div className="relative w-full h-full order-first">
        <Image
          src={"/portfolio-website/" + article.thumbnail}
          alt="Thumbnail"
          className="mt-1 h-full w-full hidden object-cover md:flex md:items-center md:justify-center relative z-10 mb-auto text-sm text-zinc-400 rounded-3xl"
          height="200"
          width="300"
        />
      </div>
    </article>
  );
};
