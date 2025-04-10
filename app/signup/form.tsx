'use client';

import { signup } from './actions';
import { BackButton } from "@/components/backButton";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useActionState } from 'react';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Sign Up</h2>
      <form action={action} className="flex flex-col gap-4">
        
        <input
          id="username"
          name="username"
          placeholder="Username"
          defaultValue={state?.values?.username }
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {state?.errors?.username && (<p className="text-red-500">{state.errors.username}</p>)}

        <input
          id="email"
          name="email"
          defaultValue={state?.values?.email}
          placeholder="Email"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}

        <input
            id="password"
            name="password"
          type="password"
          defaultValue={state?.values?.password}
          placeholder="Password"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button aria-disabled={pending} type="submit" className="mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        {pending ? 'Submitting...' : 'Sign Up'}
      </button>
      </form>
      <div className='flex flex-row items-center justify-between mt-4'>
      <BackButton />

      <Link href={'/signin'}> Sign in</Link>
      </div>
    </div>
    </div>
  );
}
