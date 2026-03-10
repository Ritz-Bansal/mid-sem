import { password } from "bun";
import { z } from "zod";

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageURL: z.string().optional(),
});
