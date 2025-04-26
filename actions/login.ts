"use server"
import { AuthError } from "next-auth";
import * as z from "zod"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password} = validatedFields.data;


    const existingUser = await getUserByEmail(email.toLowerCase());
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "User does not exist!"}
    }


    // if (!existingUser.emailVerified){
    //     const verificationToken = await generateVerificationToken(existingUser.email);

    //     await sendVerificationEmail(
    //         verificationToken.email,
    //         verificationToken.token
    //     );
    //     return {
    //         error: "You have not confirmed your email yet!",
    //         success: "Confirmation email has been sent again!"
    //     }
        
    // }


    try{
        const result = await signIn ("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        // 
        
    }catch (error) {
        if (error instanceof AuthError) {
            switch (error.name) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"};
                case "AccessDenied":
                    const verificationToken = await generateVerificationToken(existingUser.email);
                    await sendVerificationEmail(
                        verificationToken.email,
                        verificationToken.token
                    );
                    return {
                        error: "You have not confirmed your email yet!",
                        success: "Confirmation email has been sent again!"
                    }
                default:
                    return {error: "Something went wrong!"};
            }
        }
    // console.error("Unexpected error during login:", error);
    throw error;
    }
};