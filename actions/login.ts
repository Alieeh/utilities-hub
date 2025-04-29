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


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password, code} = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Invalid credentials! > inside login action"}
    }

    if (existingUser.isTwoFactorEnabled && code){
        // Verify code
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
                    console.log(error.cause);
                    const verificationToken = await generateVerificationToken(existingUser.email);
                    console.log("Sending again email verification to user: " + verificationToken.email)
                    await sendVerificationEmail(
                        verificationToken.email,
                        verificationToken.token
                    );
                    console.log("Email has been sent!")
                    return {
                        error: "You have not confirmed your email yet!",
                        success: "Confirmation email has been sent again!"
                    }
                case "2FA" :
                    console.log(error.cause);
                    if (existingUser.isTwoFactorEnabled && existingUser.email) {
                        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
                        console.log("Sending 2FA email to user: " + existingUser.email)
                        await sendTwoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token);
                        return { 
                            twoFactor: true,
                            success: "Code has been sent to your email!"
                        }
                    }
                    return {
                        error: "Something went wrong with 2FA !",
                    }
                default:
                    return {error: "Something went wrong!"}
            } 
        }
        // redirecting doesnt work properly without line below
        throw error;
    }
};