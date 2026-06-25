"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function AuthOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, hydrated, bootstrapped } = useAuthStore();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (hydrated && bootstrapped && user) router.replace(params.get("redirect") || "/profile");
  }, [bootstrapped, hydrated, params, router, user]);

  if (!hydrated || !bootstrapped) return <div className="container-page py-10">Loading...</div>;
  if (user) return null;
  return children;
}
