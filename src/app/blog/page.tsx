import FilteredPostsPage from "@/app/blog/FilteredPostsPage";

export default async function BlogIndex() {
  return <FilteredPostsPage pageNum={1} />;
}
