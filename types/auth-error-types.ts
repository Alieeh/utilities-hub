import { AuthError, CredentialsSignin } from "next-auth"

export class PasswordError extends CredentialsSignin {
  constructor(message= "wrong-password"){
    super(message)
  }
 }
 export class NotExistError extends CredentialsSignin {
  constructor(message= "user-not-exist"){
    super(message)
  }
 }

 export class EmailVerificationError extends CredentialsSignin {
  constructor(message= "email-not-verified"){
    super(message)
  }
 }

 export class TwoFactorError extends AuthError {
  constructor(message= "2FA-required"){
    super(message)
  }
 }