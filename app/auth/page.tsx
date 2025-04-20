'use client';

import BackButton from "@/components/backButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";



export default function LoginPage() {
    return (
        <main className="h-full flex flex-col items-center justify-center ">
          <div className="space-y-6 text-center">
              <h1 className= "text-6xl font-semibold text-blue-950">
                Login
              </h1>
              <p className = "text-lg">authentication service</p>
              <LoginButton>
                <Button variant="secondary" size="lg">Sign in</Button>
              </LoginButton>
              {/* <Link href={'/signup'}> Sign up</Link> */}
            </div>
        </main>
    );
}
