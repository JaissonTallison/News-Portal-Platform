// apps/web/lib/auth-server.ts

import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export async function getUserFromRequest(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
}