"use client";

import { useEffect } from "react";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

export function useAuthBootstrap() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setBootstrapped = useAuthStore((state) => state.setBootstrapped);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!hydrated) return;

    if (!accessToken) {
      setBootstrapped(true);
      return;
    }

    let active = true;
    authService
      .me()
      .then((response) => {
        if (active) setUser(response.data.user);
      })
      .catch(() => {
        if (active) logout();
      })
      .finally(() => {
        if (active) setBootstrapped(true);
      });

    return () => {
      active = false;
    };
  }, [accessToken, hydrated, logout, setBootstrapped, setUser]);
}
