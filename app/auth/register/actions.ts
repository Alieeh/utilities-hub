'use server'

import { redirect } from "next/navigation";
import { createSession } from "../../_lib/session";
import { signUpformSchema } from "../../_lib/validation/signUpformSchema";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function signup(state: any, formData: any) {

    // 1. Validate the form data using Zod
    const validationResult =  signUpformSchema.safeParse(Object.fromEntries(formData));

        if (!validationResult.success) {
            
            return { 
                errors: validationResult.error.flatten().fieldErrors,
                values: {
                    username: formData?.get("username") || null,
                    email: formData?.get("email") || null,
                    password: formData?.get("password") || null,
                }
                // ^ the current values of the form sent again to the client to be used in the form
                // | to avoid losing the values when the validation fails
            };
        }

        const { username, email, password } = validationResult.data;

        // 2. Check if the user already exists in the database
        const existingUsername = await prisma.user.findUnique({
            where: { username: username },
        });
        
        const existingEmail = await prisma.user.findUnique({
            where: { email: email },
        });
        
        
        if (existingEmail) {
            // If the username or email already exists, return an error
            return {
                errors: {email: ["This email address is existed"] },
                values: validationResult.data,
            };
        }
        if (existingUsername) {
            // If the username or email already exists, return an error
            return {
                errors: {username: ["Username is already taken"] },
                values: validationResult.data,
            };
        }

        
    // 3.create a new user
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {username,email, password: hashedPassword},
      });

    
    // 4. Create a session
    await createSession(user.id);
    //stateless session, means we only store the session in the cookie (local), not in the database
    redirect('/');
}