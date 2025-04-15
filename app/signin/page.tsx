'use client';

import BackButton from "@/components/backButton";
import LoginForm from "./LoginForm";
import Link from "next/link";



export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center">
          <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
            <LoginForm/>
            <div className='flex flex-row items-center justify-between mt-4'>
              <BackButton />
              <Link href={'/signup'}> Sign up</Link>
            </div>
            </div>
        </div>
    );
}
