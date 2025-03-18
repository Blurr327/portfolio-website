import FilteredPostsPage from "@/app/blog/FilteredPostsPage";
import { getArticleCount, getBlogConfig } from "@/lib/blog";
import { z } from "zod";

export default async function TagFilteredBlog({
  params,
}: {
  params: { tag: string; pageNum: string };
}) {
  const pageNum = z.coerce.number().parse(params.pageNum);
  return <FilteredPostsPage pageNum={pageNum} tag={params.tag} />;
}

export async function generateStaticParams() {
  const blogConfig = await getBlogConfig();
  const nestedResult = await Promise.all(
    blogConfig.tags.map(async (tag) => {
      const pageCount = await getArticleCount((article) =>
        article.tags.includes(tag),
      );
      return Array.from({ length: pageCount }, (_, i) => ({
        pageNum: (i + 1).toString(),
        tag,
      }));
    }),
  );
  return nestedResult.flat();
}
