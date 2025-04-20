'use client';

import { signup } from './actions';
//import { redirect } from 'next/navigation';
import { useActionState, useRef } from 'react';

export function SignupForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, action, pending] = useActionState(signup, undefined);

    const handleInputChange = () => {
      const form = formRef.current;
      if (!form) return;
  
      const button = form.querySelector("button[type='submit']") as HTMLButtonElement;
  
      if (form.username.value && form.email.value && form.password.value) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    };
 
  return (
      <div >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Sign Up</h2>
        <form action={action} ref={formRef} className="flex flex-col gap-4">
          
          <input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={state?.values?.username }
            onInput={handleInputChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.username && (<p className="text-red-500">{state.errors.username}</p>)}

          <input
            id="email"
            name="email"
            defaultValue={state?.values?.email}
            placeholder="Email"
            onInput={handleInputChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}

          <input
            id="password"
            name="password"
            type="password"
            defaultValue={state?.values?.password}
            placeholder="Password"
            onInput={handleInputChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {state?.errors?.password && (<p className="text-red-500">{state.errors.password}</p>)}

          <button disabled type="submit"
          className="mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
          {pending ? 'Submitting...' : 'Sign Up'}
        </button>
        </form>
    </div>
  );
}
