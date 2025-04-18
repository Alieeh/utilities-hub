import { z } from "zod";

export const signUpformSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export type UserData = z.infer<typeof signUpformSchema>;