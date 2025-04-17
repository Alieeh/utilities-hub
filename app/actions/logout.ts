
"use server";

import { deleteSession } from "@/app/_lib/session"; // adjust path

export async function logout() {
  await deleteSession();
}
