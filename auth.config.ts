import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { type NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { NotExistError, PasswordError } from "./types/auth-error-types";


export default {
     providers: 
     [Google,
      // google will automatically get the env variables from the .env file
      Github,
      Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success) {
                const {email, password} = validatedFields.data;

                const user = await getUserByEmail(email.toLowerCase());
                if(!user || !user.password || !user.email){ 
                  throw new NotExistError;
                };

                const isValidPassword = await bcrypt.compare(password, user.password);
                if(isValidPassword) {
                  return user;
                }
            }
            // user password is wrong
            throw new PasswordError;
        }
      }),
    ]
} satisfies NextAuthConfig