// apps/web/server/auth/guards.ts

import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/auth-server";
import { can } from "./policies";
import { Permission } from "./permissions";
import { AuthUser } from "../types/auth.types";
import { assertIsAuthUser } from "./assertions";

export async function requireAuth(req: NextRequest): Promise<AuthUser> {
  const user = await getUserFromRequest(req);

  assertIsAuthUser(user);

  return user;
}

export function requirePermission(
  user: AuthUser,
  permission: Permission,
  resource?: { authorId?: string }
) {
  const allowed = can(user, permission, resource);

  if (!allowed) {
    throw new Error("Forbidden");
  }
}