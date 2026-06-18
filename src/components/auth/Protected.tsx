"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { UnauthorizedState } from "@/components/shared/State";

export function Protected({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, router, user]);

  if (!hydrated) return <div className="container-page py-10">Loading...</div>;
  if (!user || (admin && user.role !== "admin")) return <div className="container-page py-10"><UnauthorizedState /></div>;
  return children;
}
