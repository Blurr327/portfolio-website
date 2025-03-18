import matter from "gray-matter";
import { z } from "zod";

const homePageDataSchema = z.object({
  title: z.string(),
  intro: z.string(),
  description: z.string(),
  stats: z.object({
    member_count: z.number(),
    project_count: z.number(),
    partner_count: z.number(),
    years: z.number(),
  }),
  images: z.array(z.string()),
  first_text: z.string(),
  second_text: z.string(),
});

export type HomePageData = z.infer<typeof homePageDataSchema>;

export async function getHomePageData() {
  const raw = (await import(`@content/pages/home.md`)).default;
  const { data } = matter(raw);
  return homePageDataSchema.parse(data);
}
