"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { extractTokens } from "@/utils/auth";

type Mode = "login" | "register";
type AuthFormValues = {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  rememberMe?: boolean;
  role?: "CUSTOMER" | "SELLER" | "ADMIN";
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const schema = mode === "login" ? loginSchema : registerSchema;
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", phone: "", password: "", rememberMe: true, role: "CUSTOMER" }
  });

  async function onSubmit(values: AuthFormValues) {
    try {
      const response = mode === "login"
        ? await authService.login({ email: values.email, password: values.password, rememberMe: values.rememberMe })
        : await authService.register({ name: values.name || "", email: values.email, phone: values.phone || "", password: values.password, role: values.role });
      const tokens = extractTokens(response.data);
      if (!tokens.accessToken) throw new Error("Missing access token");
      setAuth(response.data.user, tokens.accessToken, tokens.refreshToken, values.rememberMe);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
      router.replace(params.get("redirect") || "/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6">
      {mode === "register" && (
        <>
          <Input placeholder="Name" {...form.register("name")} />
          {form.formState.errors.name && <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>}
          <Input placeholder="Phone" type="tel" {...form.register("phone")} />
          {form.formState.errors.phone && <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>}
          <select className="h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm" {...form.register("role")}>
            <option value="CUSTOMER">Customer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
        </>
      )}
      <Input placeholder="Email" type="email" {...form.register("email")} />
      {form.formState.errors.email && <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>}
      <PasswordField placeholder="Password" {...form.register("password")} />
      {form.formState.errors.password && <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>}
      {form.formState.errors.root && <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>}
      <label className="flex items-center gap-2 text-sm text-black/70">
        <input className="h-4 w-4 rounded border-black/20" type="checkbox" {...form.register("rememberMe")} />
        Remember me
      </label>
      <Button disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <Loader2 className="animate-spin" size={16} />}
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>
    </form>
  );
}
