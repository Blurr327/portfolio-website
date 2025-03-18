import glob from "fast-glob";
import matter from "gray-matter";
import { z } from "zod";

interface ArticleAttributes {
  layout?: string;
  title: string;
  date: string;
  thumbnail: string;
  video: string;
  description: string;
  tags: string[];
}

interface Article extends ArticleAttributes {
  content: string;
}

const blogConfigSchema = z.object({
  tags: z
    .array(
      z.object({
        tag_name: z.string(),
      })
    )
    .transform((tags) => tags.map((tag) => tag.tag_name)),
});

export type BlogConfig = z.infer<typeof blogConfigSchema>;

export async function getBlogConfig() {
  const raw = (await import("@content/blog/config.md")).default;
  const { data } = matter(raw);

  return blogConfigSchema.parse(data);
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

export async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  const raw = (await import(`@content/blog/posts/${articleFilename}`)).default;
  const { data, content } = matter(raw);
  return {
    slug: articleFilename.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    thumbnail: data.thumbnail,
    description: data.description,
    tags: data.tags,
    video: data.video,
    content,
  };
}

export async function getArticleCount(
  filter: (article: ArticleWithSlug) => boolean = () => true
) {
  return (await getArticles(filter)).length;
}

export async function getArticles(
  filter: (article: ArticleWithSlug) => boolean = () => true,
  slice?: [number, number]
) {
  const articleFilenames = await glob("*.md", {
    cwd: "./content/blog/posts",
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  articles = articles.filter((article) => {
    return filter(article);
  });

  articles = articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));

  if (slice !== undefined) {
    articles = articles.slice(slice[0], slice[1]);
  }
  return articles;
}

export const POSTS_PER_PAGE = 10;

export async function getBlogPagesCount(
  filter: (article: ArticleWithSlug) => boolean = () => true
) {
  return Math.ceil((await getArticleCount(filter)) / POSTS_PER_PAGE);
}
