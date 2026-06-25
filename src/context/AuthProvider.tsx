"use client";

import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthBootstrap();
  return children;
}
