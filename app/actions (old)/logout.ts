
"use server";

import { deleteSession } from "@/app/_lib (old)/session"; // adjust path

export async function logout() {
  await deleteSession();
}
