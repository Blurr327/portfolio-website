import matter from "gray-matter";
import { z } from "zod";

const socialsDataSchema = z.object({
  gmail: z.string(),
  facebook: z.string(),
  linkedIn: z.string(),
  instagram: z.string(),
  address: z.string(),
  phone: z.string(),
});

export type SocialsData = z.infer<typeof socialsDataSchema>;

export async function getSocialsData() {
  const raw = (await import(`@content/config/socials.md`)).default;

  const { data } = matter(raw);
  return socialsDataSchema.parse(data);
}
