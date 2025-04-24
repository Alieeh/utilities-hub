import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <main className="h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#f5f3ff,_#e0e7ff)]">
              <LoginForm/>
        </main>
    );
}
