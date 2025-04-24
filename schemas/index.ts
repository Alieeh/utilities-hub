import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required"), //also .min(1, "message")
});

export const RegisterSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().min(6,"Minimum 6 characters required!"),
    confirmPassword: z.string().min(6,"Minimum 6 characters required!"),
    
});