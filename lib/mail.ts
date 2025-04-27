// using resend.com
import { EmailTemplateReset } from '@/components/email-template-reset';
import { EmailTemplateVerification } from '@/components/email-template-verification';

import { Resend } from "resend";
import { domainName } from "@/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async(
    email: string,
    token: string
) => {
    const resetLink = `${domainName}/auth/new-password?token=${token}`
    const { data, error } = await resend.emails.send({
        from: "ITALIHUB <italihub@resend.dev>",
        to: email,
        subject: "Reset your password",
        react: EmailTemplateReset({hrefLink:resetLink }),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
      }
}


export const sendVerificationEmail = async(
    email: string,
    token: string
) => {
    const confirmLink = `${domainName}/auth/new-verification?token=${token}`
    const { data, error } = await resend.emails.send({
        from: "ITALIHUB <italihub@resend.dev>",
        to: email,
        subject: "Confirm your email",
        react: EmailTemplateVerification({hrefLink:confirmLink }),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
      }
}