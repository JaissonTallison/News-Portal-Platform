import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUserServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const user = verifyToken(token);

  return user || null;
}