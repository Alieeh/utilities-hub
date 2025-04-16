'user-server'

import { type NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";
import { decrypt } from "@/app/_lib/session";

const protectedRoutes = ["/dashboard", "/settings", "/profile"];
const authPages = ["/signin", "/signup"];
// Routes that should be inaccessible **if user IS logged in**

export default async function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;

    let isAuthenticated = false;

    const cookieStore = await cookies();
    const cookie = cookieStore.get("session_token")?.value;

    // ✅ Validate token
    if (cookie) {
        const session = await decrypt(cookie);
        // isAuthenticated = !!session;
        if (!session?.userId) {
            isAuthenticated = false;
        }else{
        isAuthenticated = true;
        }
    }

      // 🚫 Redirect authenticated users away from auth pages
    if (isAuthenticated && authPages.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    
      // 🔐 Redirect unauthenticated users away from protected routes
      if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }

    // ✅ Allow request through
    return NextResponse.next();
}




// Routes midleware should NOT run on.
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    //matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*"]
};

// export const config = {
//     matcher: [
//       "/dashboard/:path*",
//       "/profile/:path*",
//       "/settings/:path*",
//       "/signin",
//       "/signup",
//     ],
//   };