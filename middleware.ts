'user-server'

import { type NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";
import { decrypt } from "@/app/lib/session";

export default async function middleware(req: NextRequest) {
    // 1.Check if route is protected
    const protectedRoutes = ["/dashboard", "/settings", "/profile"];
    const currentPath = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);
    //console.log("middleware isProtectedRoute: ", isProtectedRoute, currentPath);

    if (isProtectedRoute){
        // 2. Check for valid session
        console.log("middleware session Checking...");
        const cookieStore = await cookies();
        const cookie = cookieStore.get("session_token")?.value;
        const session = await decrypt(cookie);

        // 3. If session is invalid, redirect to login page
        if (!session?.userId) {
            return NextResponse.redirect(new URL("/signin", req.nextUrl));
        }
    }
    // 4. Render route
    return NextResponse.next();
}




// Routes midleware should NOT run on.
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    //matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*"]
};