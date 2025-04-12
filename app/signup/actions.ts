'use server'

import { createSession } from "../lib/session";
import { signUpformSchema } from "../lib/validation/signUpformSchema";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function signup(state, formData) {
    // 1. Validate the form data
    const validationResult =  signUpformSchema.safeParse(
        {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validationResult.success) {
            return { 
                errors: validationResult.error.flatten().fieldErrors,
                values:{
                    username: formData?.get("username") || null,
                    email: formData?.get("email") || null,
                    password: formData?.get("password") || null,
                }
                
            };
        }

        // Check if the username already exists in the database
        const existingUsername = await prisma.user.findUnique({
            where: { username: formData.get("username") },
        });
        

        const existingEmail = await prisma.user.findUnique({
            where: { email: formData.get("email") },
        });
        

        if (existingEmail) {
            // If the username or email already exists, return an error
            return {
                errors: {email: ["This email address is existed"] },
                values: {
                    username: formData?.get("username") || null,
                    email: formData?.get("email") || null,
                    password: formData?.get("password") || null,
                },
            };
        }
        if (existingUsername) {
            // If the username or email already exists, return an error
            return {
                errors: {username: ["Username is already taken"] },
                values: {
                    username: formData?.get("username") || null,
                    email: formData?.get("email") || null,
                    password: formData?.get("password") || null,
                },
            };
        }

        const { username, email, password } = validationResult.data;

    // 2. Check if the user already exists
        // todo: check if the user already exists

    // 3.create a new user
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {username,email, password: hashedPassword},
      });

    
    // 4. Create a session
    await createSession(user.id);
    //stateless session, means we only store the session in the cookie (local), not in the database
}