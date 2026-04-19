// apps/web/server/auth/permissions.ts

export const Permissions = {
  CREATE_POST: "create_post",
  UPDATE_POST: "update_post",
  DELETE_POST: "delete_post",
  PUBLISH_POST: "publish_post",
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_USERS: "manage_users",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];