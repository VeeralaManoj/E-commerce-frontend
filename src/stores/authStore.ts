"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { normalizeUser } from "@/utils/auth";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  bootstrapped: boolean;
  rememberMe: boolean;
  setAuth: (user: User, accessToken: string, refreshToken?: string | null, rememberMe?: boolean) => void;
  setTokens: (accessToken: string, refreshToken?: string | null) => void;
  setUser: (user: User | null) => void;
  setHydrated: (value: boolean) => void;
  setBootstrapped: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      hydrated: false,
      bootstrapped: false,
      rememberMe: true,
      setAuth: (user, accessToken, refreshToken = null, rememberMe = true) => set({ user: normalizeUser(user), accessToken, refreshToken, rememberMe }),
      setTokens: (accessToken, refreshToken) => set((state) => ({ accessToken, refreshToken: refreshToken ?? state.refreshToken })),
      setUser: (user) => set({ user: user ? normalizeUser(user) : null }),
      setHydrated: (value) => set({ hydrated: value }),
      setBootstrapped: (value) => set({ bootstrapped: value }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null, bootstrapped: true })
    }),
    {
      name: "ecommerce-auth",
      partialize: (state) => ({
        user: state.rememberMe ? state.user : null,
        accessToken: state.rememberMe ? state.accessToken : null,
        refreshToken: state.rememberMe ? state.refreshToken : null,
        rememberMe: state.rememberMe
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true)
    }
  )
);
