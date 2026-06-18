"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/lib/api/services";

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  return <div className="container-page py-12"><form className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6" onSubmit={handleSubmit(async ({ email }) => { await authService.forgotPassword(email).catch(() => undefined); toast.success("Reset link sent if the email exists"); })}><h1 className="text-2xl font-bold">Forgot password</h1><Input type="email" placeholder="Email" {...register("email")} /><Button>Send reset link</Button></form></div>;
}
