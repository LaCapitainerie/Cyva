import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  token: z.string(),
  role: z.enum(["admin", "user"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
