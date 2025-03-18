import matter from "gray-matter";
import { z } from "zod";

const contactPageDataSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export type ContactPageData = z.infer<typeof contactPageDataSchema>;

export async function getContactPageData() {
  const raw = (await import(`@content/pages/contact.md`)).default;

  const { data } = matter(raw);
  return contactPageDataSchema.parse(data);
}
