"use server"
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email.toLowerCase());
    if(!existingUser || !existingUser.password || !existingUser.email){
        return {error: "User does not exist!"}
    }

    try{
        const result = await signIn ("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        // Ensure result is checked and returned
        console.log({result})
        if (result) {
            return { success: "Login successful!" };
        }
    }catch (error) {
        if (error instanceof AuthError) {
            switch (error.name) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Please confirm your email address!"};
            }
        }
    // console.error("Unexpected error during login:", error);
    throw error;
    }
};