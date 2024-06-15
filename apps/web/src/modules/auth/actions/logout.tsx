import { api } from "@/lib/api";

export const logout = async () => {
  const result = api.post("/auth/logout");

  return result;
};
