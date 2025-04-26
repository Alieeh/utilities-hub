// using resend.com
import { EmailTemplate } from '@/components/email-template';

import { Resend } from "resend";
import { domainName } from "@/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(
    email: string,
    token: string
) => {
    const confirmLink = `${domainName}/auth/new-verification?token=${token}`
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        react: await EmailTemplate({hrefLink:confirmLink }),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
      }
}