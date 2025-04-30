"use server"
import { AuthError, CredentialsSignin } from "next-auth";
import * as z from "zod"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateVerificationToken,  generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { EmailVerificationError, NotExistError, PasswordError, TwoFactorError } from "@/types/auth-error-types";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password, code} = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Invalid credentials!"}
    }

    if (existingUser.isTwoFactorEnabled && code){
        // Sending verification code
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        if (!twoFactorToken){
            return { error: "First Login!"}
        }
        if (twoFactorToken.token !== code){
            return { error: "Invalid code!"}
        }
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired){
            return {error: "Code expired!"}
        }
        
        await db.twoFactorToken.delete({
            where: { id: twoFactorToken.id }
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (existingConfirmation) {
            await db.twoFactorConfirmation.delete({
                where: {id: existingConfirmation.id}
            });
        }

        await db.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })
    }
    

    try{
        const result = await signIn ("credentials", {
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    }catch (error) {
        if (error instanceof PasswordError){
            console.log(error.message);
            return {error: "Invalid credentials!"};
        }

        if (error instanceof NotExistError){
            console.log(error.message);
            return {error: "Invalid credentials!"};
        }

        if (error instanceof EmailVerificationError){
            console.log(error.message);
            const verificationToken = await generateVerificationToken(existingUser.email);
            if (!verificationToken) {
                console.log("ERROR: generateVerificationToken")
                return { error: "Something went wrong!"}
            }
            console.log("Resending email verification to user: " + verificationToken.email)
            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            ).catch((error) => {
                console.log(error);
                return { error: "Something went wrong!" }
            });
            console.log("Email has been sent!")
            return {
                error: "You have not confirmed your email yet!",
                success: "Confirmation email has been sent again!"
            }   
        }

        if (error instanceof TwoFactorError){
            console.log(error.message);
            if (existingUser.isTwoFactorEnabled && existingUser.email) {
                const twoFactorToken = await generateTwoFactorToken(existingUser.email);
                if(!twoFactorToken){
                    console.log("ERROR: generateTwoFactorToken");
                    return {error: "Something went wrong!"}
                }
                console.log("Sending 2FA email to user: " + existingUser.email)
                await sendTwoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token)
                .catch((error) => {
                    console.log(error);
                    return {error: "Something went wrong!"}
                });
                return { 
                    twoFactor: true,
                    success: "Code has been sent to your email!"
                }
            }else{
                console.log("ERROR: existingUser 2FA functions missed")
                return {
                    error: "Something went wrong with 2FA !",
                }
            }
        }
        console.log("ERROR: Unspecified type of auth error")

        // redirecting doesnt work properly without line below
        throw error;
    }
};