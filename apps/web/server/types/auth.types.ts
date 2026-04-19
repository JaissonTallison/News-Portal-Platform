// apps/web/server/types/auth.types.ts

export type Role = "USER" | "ADMIN" | "EDITOR";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}