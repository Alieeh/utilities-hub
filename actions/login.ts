"use server"
import { AuthError, CredentialsSignin } from "next-auth";
import * as z from "zod"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { error } from "console";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password} = validatedFields.data;


    const existingUser = await getUserByEmail(email.toLowerCase());
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Invalid credentials! > inside login action"}
    }

    try{
        const result = await signIn ("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

    }catch (error) {
        console.log("auth.config error triggered :")
        if (error instanceof CredentialsSignin) {
            console.log(error.name)

            switch (error.code) {
                case "user-not-exist":
                    // the error for second checking of user existing in database triggered
                    console.log(`code: ${error.code}`)
                    return {error: "Invalid credentials!"};
                
                case "wrong-password":
                    console.log(`code: ${error.code}`)
                    return {error: "Invalid credentials!"};
                
                default:
                    return {error: "Something went wrong!"};
                }

        }else if(error instanceof AuthError){
            console.log(error.name)

            switch (error.cause){
                case "email-not-verified" :
                    const verificationToken = await generateVerificationToken(existingUser.email);
                    console.log("sending again email verification to user:")
                    console.log(verificationToken.email)
                    await sendVerificationEmail(
                        verificationToken.email,
                        verificationToken.token
                    );
                    console.log("Email has been sent!")
                    return {
                        error: "You have not confirmed your email yet!",
                        success: "Confirmation email has been sent again!"
                    }
                default:
                    return {error: "Something went wrong!"}
            } 
        }
        // redirecting doesnt work properly without line below
        throw error;
    }
};