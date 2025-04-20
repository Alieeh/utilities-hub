import BackButton from "@/components/backButton";
import { SignupForm } from "./SignupForm";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center">
            <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
                <SignupForm/>
                <div className='flex flex-row items-center justify-between mt-4'>
                    <BackButton />
                    <Link href={'/signin'}> Sign in</Link>
                </div>
            </div>
        </div>
    );
}
