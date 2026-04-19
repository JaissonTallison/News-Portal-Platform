import { Permission } from "./permissions";
import { AuthUser } from "../types/auth.types";

interface Resource {
  authorId?: string;
}

export function can(
  user: AuthUser | null,
  permission: Permission,
  resource?: Resource
): boolean {
  if (!user) return false;

  if (user.role === "ADMIN") return true;

  if (user.role === "EDITOR") {
    switch (permission) {
      case "create_post":
        return true;

      case "update_post":
      case "delete_post":
        return resource?.authorId === user.id;

      case "publish_post":
        return true;

      default:
        return false;
    }
  }

  return false;
}