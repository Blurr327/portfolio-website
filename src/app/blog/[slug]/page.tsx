import z from "zod";
import { importArticle, getArticles } from "@/lib/blog";
import ArticlePage from "@/components/ArticlePage";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await importArticle(
    z.coerce.string().parse(params.slug) + ".md"
  );
  return <ArticlePage article={article} />;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
