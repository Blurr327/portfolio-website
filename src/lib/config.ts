import { z } from "zod";
import matter from "gray-matter";

const tabLabelsSchema = z.object({
  home: z.string(),
  join: z.string(),
  blog: z.string(),
  contact: z.string(),
});

const configSchema = z.object({
  tab_labels: tabLabelsSchema,
});

export type TabLabels = z.infer<typeof tabLabelsSchema>;

export type GeneralConfig = z.infer<typeof configSchema>;

export async function getGeneralConfig() {
  const raw = (await import(`@content/config/config.md`)).default;

  const { data } = matter(raw);
  return configSchema.parse(data);
}
