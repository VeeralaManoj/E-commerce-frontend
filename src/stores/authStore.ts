"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

type AuthState = {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  setHydrated: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,
      setAuth: (user, token) => set({ user, token }),
      setUser: (user) => set({ user }),
      setHydrated: (value) => set({ hydrated: value }),
      logout: () => set({ user: null, token: null })
    }),
    {
      name: "ecommerce-auth",
      onRehydrateStorage: () => (state) => state?.setHydrated(true)
    }
  )
);
