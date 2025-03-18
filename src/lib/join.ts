import matter from "gray-matter";
import { z } from "zod";

const joinPageDataSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
  enable_form: z.boolean(),
});

export type JoinPageData = z.infer<typeof joinPageDataSchema>;

export async function getJoinPageData() {
  const raw = (await import(`@content/pages/join.md`)).default;

  const { data } = matter(raw);
  return joinPageDataSchema.parse(data);
}
