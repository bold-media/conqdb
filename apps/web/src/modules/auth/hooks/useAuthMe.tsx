import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@conqdb/types/user";

export const AUTH_ME_QUERY_KEY = "/auth/me";

const getAuthMe = async () => {
  const { data } = await api.get("/auth/me");
  return data?.user || null;
};

export const useAuthMe = () => {
  return useQuery<User>({
    queryKey: [AUTH_ME_QUERY_KEY],
    queryFn: getAuthMe,
    refetchOnWindowFocus: "always",
  });
};
