"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { UnauthorizedState } from "@/components/shared/State";
import { Role } from "@/types";

export function RoleGuard({ children, roles }: { children: React.ReactNode; roles: Role[] }) {
  const user = useAuthStore((state) => state.user);

  if (!user || !roles.includes(user.role)) {
    return <div className="container-page py-10"><UnauthorizedState /></div>;
  }

  return children;
}

export function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user, hydrated, bootstrapped } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && bootstrapped && !user) router.replace("/login");
  }, [bootstrapped, hydrated, router, user]);

  if (!hydrated || !bootstrapped) return <div className="container-page py-10">Loading...</div>;
  if (!user) return <div className="container-page py-10"><UnauthorizedState /></div>;
  if (roles) return <RoleGuard roles={roles}>{children}</RoleGuard>;
  return children;
}

export function Protected({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  return <ProtectedRoute roles={admin ? ["ADMIN"] : undefined}>{children}</ProtectedRoute>;
}
