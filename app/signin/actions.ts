'use server'

import { createSession } from "../_lib/session";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function login(state : any, formData: any) {
    const tEmail = formData.get("email").trim();
    const tPassword = formData.get("password").trim();


    const user = await prisma.user.findUnique({
        where: { email: tEmail },
    });

    // Check if the email exists in the database
    if (!user) {
        return { error: 'Invalid email or password',
            values: {
                email: formData?.get("email") || null,
                password: formData?.get("password") || null,
            }
         };
    }

    const bcrypt = require('bcrypt');
    const passwordMatch = await bcrypt.compare(tPassword, user.password); // user.password is hashed

    // Check if the password is correct
    if (!passwordMatch) {
        return { error: 'Invalid email or password',
            values: {
                email: formData?.get("email") || null,
                password: formData?.get("password") || null,
            }
         };
  }
     // ✅ Login success
    console.log("Login successful for user:", user.email);

    // Create a session for the user, creatSession will 
    // set the cookie then redirect to dashboard
    await createSession(user.id);
    
}

