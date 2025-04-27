"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error: "Token does not exist"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: "Token has expired, try to login again!" }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser){
        return { error: "Email does not exist!"}
    }

    await db.user.update({
        where: { id: existingUser.id},
        data: {
            emailVerified: new Date(),

            // for when a user changes its email, it will not stored to the database immediately
            // the new emails needs to get verified then stored into the database  
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return { success: "Email has been verified!" }
}