'use server'

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
            console.log(formData);
            return { 
                errors: validationResult.error.flatten().fieldErrors,
                values:{
                    username: formData?.get("username") || null,
                    email: formData?.get("email") || null,
                    password: formData?.get("password") || null,
                }
                
            };
        }

        console.log(formData);
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
}