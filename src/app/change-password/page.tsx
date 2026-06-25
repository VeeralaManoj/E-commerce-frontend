"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { ProtectedRoute } from "@/components/auth/Protected";
import { Button } from "@/components/ui/Button";
import { changePasswordSchema } from "@/lib/validations/auth";
import { authService } from "@/services/authService";

type FormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(changePasswordSchema) });

  return (
    <ProtectedRoute>
      <div className="container-page py-12">
        <form
          className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6"
          onSubmit={form.handleSubmit(async ({ currentPassword, newPassword }) => {
            await authService.changePassword({ currentPassword, newPassword });
            form.reset();
            toast.success("Password changed");
          })}
        >
          <h1 className="text-2xl font-bold">Change password</h1>
          <PasswordField placeholder="Current password" {...form.register("currentPassword")} />
          <PasswordField placeholder="New password" {...form.register("newPassword")} />
          <PasswordField placeholder="Confirm password" {...form.register("confirmPassword")} />
          {(form.formState.errors.currentPassword || form.formState.errors.newPassword || form.formState.errors.confirmPassword) && (
            <p className="text-sm text-red-600">
              {form.formState.errors.confirmPassword?.message || form.formState.errors.newPassword?.message || form.formState.errors.currentPassword?.message}
            </p>
          )}
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="animate-spin" size={16} />}
            Save password
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
