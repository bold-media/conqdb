import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_ME_QUERY_KEY } from "./useAuthMe";

export const logout = async () => {
  await api.post("/auth/logout");
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [AUTH_ME_QUERY_KEY] });
    },
  });
};
