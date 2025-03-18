import { getBlogPagesCount } from "@/lib/blog";
import { z } from "zod";

import React from "react";
import FilteredPostsPage from "@/app/blog/FilteredPostsPage";

export default function PostsListPage({
  params,
}: {
  params: { pageNum: string };
}) {
  const pageNum = z.coerce.number().parse(params.pageNum);

  return <FilteredPostsPage pageNum={pageNum} />;
}

export async function generateStaticParams() {
  return Array.from({ length: await getBlogPagesCount() }, (_, i) => ({
    pageNum: (i + 1).toString(),
  }));
}
