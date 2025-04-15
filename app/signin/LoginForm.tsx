'use client';

import { useRef } from "react";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, action, pending] = useActionState(login, undefined);

    const handleInputChange = () => {
        const form = formRef.current;
        if (!form) return;
    
        const button = form.querySelector("button[type='submit']") as HTMLButtonElement;
    
        if (form.email.value && form.password.value) {
          button.disabled = false;
        } else {
          button.disabled = true;
        }
      };

    return (
          <div >
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
            <form action={action} ref={formRef} className="flex flex-col gap-4">
                
        
                <input
                id="email"
                name="email"
                placeholder="Email"
                defaultValue={state?.values?.email}
                onInput={handleInputChange}
                className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
        
                <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                defaultValue={state?.values?.password}
                onInput={handleInputChange}
                className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {state?.error  && (<div className="text-sm text-red-500"> <p>{state.error}</p></div>)}

                <button disabled type="submit" 
                className="mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                >
                {pending ? 'signing in...' : 'Sign in'}
                </button>
                </form>

            <div className='flex flex-row items-center justify-between mt-4'>

            </div>

          </div>
    );
}
