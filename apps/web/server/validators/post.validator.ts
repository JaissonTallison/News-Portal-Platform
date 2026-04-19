import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().optional(),
  content: z.string().min(20),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPremium: z.boolean().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;