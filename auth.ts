import NextAuth, { AuthError, type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { EmailVerificationError, NotExistError, TwoFactorError } from "./types/auth-error-types"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    // Automaically set emailVerified for OAuth users
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }
  },
  callbacks : {
    async signIn({ user, account }) {
      
      if (!user.id) return false;

      // Allow OAuth users without email verification
      if (account?.provider !== "credentials"){
         return true;
         // it returns error inctance of CredentialsSignin
      }
      
      // Prevent sign in without email verification ( we also prevent inside login action too)
      const existingUser = await getUserById(user.id);

      if(!existingUser){
        throw new NotExistError;
      }

      if (!existingUser?.emailVerified) {
        throw new EmailVerificationError;
      }

      if (existingUser.isTwoFactorEnabled){
        const getTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

       if (!getTwoFactorConfirmation) {
          throw new TwoFactorError;
        }

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: getTwoFactorConfirmation.id}
        });
      }

      return true
    },
    async session({ session, user, token }) {
      // console.log({sessionToken: token})
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
      // console.log({token: token})
      return token
    }
  },
  
    session: { strategy: "jwt" },
  ...authConfig,
})