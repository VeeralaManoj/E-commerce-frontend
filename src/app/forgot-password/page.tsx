"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { authService } from "@/services/authService";

type FormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  return (
    <div className="container-page py-12">
      <form
        className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6"
        onSubmit={form.handleSubmit(async ({ email }) => {
          await authService.forgotPassword(email);
          toast.success("Reset link sent if the email exists");
        })}
      >
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <Input type="email" placeholder="Email" {...form.register("email")} />
        {form.formState.errors.email && <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>}
        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" size={16} />}
          Send reset link
        </Button>
      </form>
    </div>
  );
}
