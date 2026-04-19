// apps/web/server/auth/assertions.ts

import { AuthUser } from "../types/auth.types";

export function assertIsAuthUser(user: unknown): asserts user is AuthUser {
  if (!user || typeof user !== "object") {
    throw new Error("Unauthorized");
  }

  const u = user as Record<string, unknown>;

  if (
    typeof u.id !== "string" ||
    typeof u.email !== "string" ||
    (u.role !== "USER" &&
      u.role !== "ADMIN" &&
      u.role !== "EDITOR")
  ) {
    throw new Error("Invalid user payload");
  }
}