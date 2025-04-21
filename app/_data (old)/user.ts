import {verifySession} from "@/app/_lib (old)/session";
import { PrismaClient } from "@/generated/prisma";
import { cache } from "react";

export const getUser = cache(async () => {
    // 1. Verify user's session
    const session = await verifySession() as { userId: number | null };
    // 2. Fetch user data from the database
    if(session?.userId){ 
        const prisma = new PrismaClient();
        const userData = await prisma.user.findUnique({
            where: { id: session.userId },
            // columns: { id: true, username: true, email: true },
            select: { id: true, username: true, email: true },
        })
        return userData;;
    }

    
});