import { User } from "payload-types";

export const checkRole = (
  allowedRoles: User["roles"] = [],
  user?: Partial<User>
): boolean => {
  if (user) {
    if (user?.roles?.includes("admin")) {
      return true;
    }
    if (
      allowedRoles?.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role;
        });
      })
    )
      return true;
  }

  return false;
};
