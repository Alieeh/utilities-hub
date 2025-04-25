"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    // const [errorMsgGoogle, dispatchGoogle] = useActionState(googleAuthenticate,undefined);
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    }

    return (
        <div className="flex items-center w-full gap-x-1 gap-y-2" >
            <Button
            size = "lg"
            className="w-1/2"
            variant = "outline"
            onClick={() => onClick("google")}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
            size = "lg"
            className="w-1/2"
            variant = "outline"
            onClick={() => onClick("github")}>
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}