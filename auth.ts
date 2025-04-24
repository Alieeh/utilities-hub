import NextAuth, { User, type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"


declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
    callbacks : {
      // async signIn({ user }) {
      //   const existingUser = await getUserById(user.id);
      //   if (!existingUser || !existingUser.emailVerified) {
      //     return false;
      //   }
      //   return true
      // },
      async session({ session, user, token }) {
        console.log({sessionToken: token})
        // Add the user +id and +role into the session object to access to it in our app
        // to have access to users id in both server and client components
        if(token.sub && session.user){
          session.user.id = token.sub;
        }
        if(token.role && session.user){
          session.user.role = token.role as UserRole;
        }
        return session
      },
      async jwt({ token }) {
        // Add the user role to the token to access it from middleware
        if (!token.sub) return token;
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;
        token.role = existingUser.role;
        console.log({token: token})
        return token
      }
    },
  
    session: { strategy: "jwt" },
  ...authConfig,
})