import Container from "@/components/Container";
import Carousel from "@/components/Carousel";
import PostsList from "@/app/blog/PostsList";
import Pagination from "@/components/Pagination";
import TagPicker from "@/components/TagPicker";
import {
  ArticleWithSlug,
  getArticles,
  getBlogPagesCount,
  getBlogConfig,
  POSTS_PER_PAGE,
} from "@/lib/blog";

export default async function FilteredPostsPage({
  tag,
  pageNum = 1,
}: {
  tag?: string;
  pageNum: number;
}) {
  const filter = tag
    ? (article: ArticleWithSlug) => article.tags.includes(tag)
    : () => true;

  const selectedArticles = await getArticles(filter, [
    POSTS_PER_PAGE * (pageNum - 1),
    POSTS_PER_PAGE * pageNum,
  ]);

  const pageCount = await getBlogPagesCount(filter);

  const images: string[] = (
    await getArticles(
      (article) => filter(article) && article.thumbnail !== undefined
    )
  )
    .slice(0, 4)
    .map((article) => "/portfolio-website/" + article.thumbnail);

  const blogConfig = await getBlogConfig();

  return (
    <Container>
      <TagPicker tags={blogConfig.tags} selectedTag={tag} />

      <PostsList articles={selectedArticles} />

      <Pagination
        id="blogPagination"
        count={pageCount}
        current={pageNum}
        getPageLink={(i) =>
          tag !== undefined
            ? `/blog/tag/${tag}/page/${i}#blogPagination`
            : `/blog/page/${i}#blogPagination`
        }
      />
    </Container>
  );
}
