import FilteredPostsPage from "@/app/blog/FilteredPostsPage";
import { getBlogConfig } from "@/lib/blog";

export default async function TagFilteredBlog({
  params,
}: {
  params: { tag: string };
}) {
  return <FilteredPostsPage pageNum={1} tag={params.tag} />;
}

export async function generateStaticParams() {
  const blogConfig = await getBlogConfig();
  return blogConfig.tags.map((tag) => ({ tag }));
}
