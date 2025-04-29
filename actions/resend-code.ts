"use server"

import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";

export const resendCode = async (email : string) => {
    const existingUser = await getUserByEmail(email);
    if(!existingUser){
        return {
            error: "User does not exist!"
        }
    }
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        console.log("Resending 2FA email to user: " + existingUser.email)
        await sendTwoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token);
        return { 
            success: "Code has been resent!"
        }
    }
    else{
        return {
            error: "Resend error!"
        }
    }
} 