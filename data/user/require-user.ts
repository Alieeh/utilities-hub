import { useSession } from "next-auth/react";

export async function requireUser(){
    const { data: session, status } = useSession();

  if (status === "authenticated") {
    return null;
  }

  return session;

}