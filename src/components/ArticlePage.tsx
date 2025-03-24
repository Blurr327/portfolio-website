"use client";
import { ArticleWithSlug } from "@/lib/blog";
import Markdown from "react-markdown";
import Container from "@/components/Container";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import ShareButtons from "@/components/ShareButtons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import getVideoId from "get-video-id";

export default function ArticlePage({ article }: { article: ArticleWithSlug }) {
  return (
    <Container className="relative prose flex flex-col max-w-[100%] md:grid md:grid-cols-6 md:gap-12">
      <div className="md:sticky md:top-0 md:col-span-1 h-[max-content] md:flex md:flex-col">
        <p className="text-base text-zinc-500">{formatDate(article.date)}</p>
        <h1 className="font-bold tracking-tight text-zinc-900 text-4xl">
          {article.title}
        </h1>
        {/* Mobile Image */}
        <Image
          src={"/portfolio-website/" + article.thumbnail}
          alt="Thumbnail"
          className="mt-1 md:hidden object-cover w-full rounded-3xl border border-black flex items-center justify-center relative z-10 text-sm text-zinc-400"
          width="200"
          height="200"
        />
        {/* Desktop Sharing */}
        <ShareButtons className="hidden md:flex flex-col" />
        <p className="text-zinc-400 text-1xl md:mt-12">Catégories</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags
            ? article.tags.map(
                (tag, index) =>
                  index < 5 && (
                    <p
                      key={index}
                      className="p-2 bg-[#CCC7BF] text-white text-sm rounded-3xl m-0"
                    >
                      {tag}
                    </p>
                  )
              )
            : "Non catégorisé"}
        </div>
        <Link href="/blog" className="mt-12 hidden md:block">
          <ChevronLeftIcon className="stroke-current inline" /> go back
        </Link>
      </div>
      <div className="col-span-4">
        {article.video && (
          <iframe
            src={
              "https://www.youtube.com/embed/" + getVideoId(article.video).id
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-[50vh] mt-8 rounded-3xl"
          />
        )}
        <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
      </div>
      {/* Mobile Sharing */}
      <div className="md:hidden flex flex-col gap-12">
        <ShareButtons className="flex-wrap" />
        <Link href="/blog">
          <ChevronLeftIcon className="stroke-current inline" /> go back
        </Link>
      </div>
    </Container>
  );
}
