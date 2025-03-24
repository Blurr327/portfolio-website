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
    .map((article) => "/" + article.thumbnail);

  const blogConfig = await getBlogConfig();

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <Carousel className="md:hidden md:col-span-3" images={images} />
        <div className="flex flex-col justify-center">
          <h1 className=" text-2xl font-bold tracking-tight md:text-center text-zinc-900 sm:text-5xl md:mb-10">
            Restez informé de tout ce que nous faisons !
          </h1>
          <p className="mt-6 text-base md:text-center text-zinc-900">
            Découvrez les derniers articles de notre blog et restez à jour sur
            nos événements récents et actualités.
          </p>
        </div>
      </div>

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
