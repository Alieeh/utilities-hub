"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    try{
        const validatedFields = RegisterSchema.safeParse(values);

        if (!validatedFields.success){
            return { error: "Invalid fields!"}
        }

        const {name, email, password, confirmPassword} = validatedFields.data;

        const toUseEmail = email.toLowerCase().trim();
        const existingUser = await getUserByEmail(toUseEmail);
        if(existingUser){
            return {error: "User already exists!"}
        }

        const hashedPassword = await bcrypt.hash(password,10)


        await db.user.create({
            data: {
                name,
                email: toUseEmail,
                password: hashedPassword
            },
        });

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {success: "Confirmation email has been sent!"}

    }catch (error) {
        console.error("Error in register action", error);
        return {error: "Error in registering, try again later!"}
    }
};