"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { authService } from "@/services/authService";

type FormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: params.get("token") || "" }
  });

  return (
    <div className="container-page py-12">
      <form
        className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6"
        onSubmit={form.handleSubmit(async ({ token, password }) => {
          await authService.resetPassword({ token, password });
          toast.success("Password reset");
          router.push("/login");
        })}
      >
        <h1 className="text-2xl font-bold">Reset password</h1>
        <PasswordField placeholder="New password" {...form.register("password")} />
        <PasswordField placeholder="Confirm password" {...form.register("confirmPassword")} />
        {(form.formState.errors.password || form.formState.errors.confirmPassword || form.formState.errors.token) && (
          <p className="text-sm text-red-600">{form.formState.errors.confirmPassword?.message || form.formState.errors.password?.message || form.formState.errors.token?.message}</p>
        )}
        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" size={16} />}
          Reset password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<div className="container-page py-12">Loading...</div>}><ResetPasswordForm /></Suspense>;
}
