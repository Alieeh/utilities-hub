import {verifySession} from "@/app/_lib/session";
import { PrismaClient } from "@/generated/prisma";
import { cache } from "react";

export const getUser = cache(async () => {
    // 1. Verify user's session
    const session = await verifySession() as { userId: number | null };
    if (!session?.userId){
        throw new Error("Session is not valid or expired");
    }
    // 2. Fetch user data from the database
    else{ 
        const prisma = new PrismaClient();
        const userData = await prisma.user.findUnique({
            where: { id: session.userId },
            // columns: { id: true, username: true, email: true },
            select: { id: true, username: true, email: true },
        })
        return userData;;
    }

    
});