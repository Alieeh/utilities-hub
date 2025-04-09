'use client';

import { signup } from './actions';
import { useActionState } from 'react';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form action={action} className="flex flex-col space-y-4 mt-4">
        
        <input
          id="username"
          name="username"
          placeholder="Username"
          defaultValue={state?.values?.username }
          className="border border-gray-300 p-2 rounded-md"
        />
        {state?.errors?.username && (<p className="text-red-500">{state.errors.username}</p>)}

        <input
          id="email"
          name="email"
          defaultValue={state?.values?.email}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md"
          />
          {state?.errors?.email && (<p className="text-red-500">{state.errors.email}</p>)}

        <input
            id="password"
            name="password"
          type="password"
          
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-md"
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
        <button aria-disabled={pending} type="submit" className="mt-2 w-full">
        {pending ? 'Submitting...' : 'Sign Up'}
      </button>
      </form>
    </div>
  );
}
