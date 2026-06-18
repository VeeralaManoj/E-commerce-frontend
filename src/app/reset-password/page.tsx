"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/lib/api/services";

function ResetPasswordForm() {
  const params = useSearchParams();
  const { register, handleSubmit } = useForm<{ password: string }>();
  return <div className="container-page py-12"><form className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6" onSubmit={handleSubmit(async ({ password }) => { await authService.resetPassword(params.get("token") || "", password).catch(() => undefined); toast.success("Password reset"); })}><h1 className="text-2xl font-bold">Reset password</h1><Input type="password" placeholder="New password" {...register("password")} /><Button>Reset password</Button></form></div>;
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<div className="container-page py-12">Loading...</div>}><ResetPasswordForm /></Suspense>;
}
