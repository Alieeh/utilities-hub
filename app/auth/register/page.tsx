import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#f5f3ff,_#e0e7ff)]">
              <RegisterForm/>
        </main>
    );
}