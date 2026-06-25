"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Protected } from "@/components/auth/Protected";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await authService.logout(refreshToken).catch(() => undefined);
    logout();
    toast.success("Signed out");
  }

  return (
    <Protected>
      <div className="container-page py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-black/60">{user?.email} · {user?.role}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/change-password" className="text-sm font-semibold text-brand-600">Change password</Link>
            <button onClick={handleLogout} className="text-sm font-semibold text-red-600">Sign out</button>
          </div>
        </div>
      </div>
    </Protected>
  );
}
