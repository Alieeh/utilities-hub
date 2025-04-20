import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required"), //also .min(1, "message")
});