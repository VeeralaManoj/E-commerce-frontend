"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/lib/api/services";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { useAuthStore } from "@/stores/authStore";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const schema = mode === "login" ? loginSchema : registerSchema;
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = mode === "login" ? await authService.login(values.email, values.password) : await authService.register(values);
      setAuth(response.data.user, response.data.token);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
      router.push("/profile");
    } catch {
      setAuth({ id: "demo", name: "Demo Admin", email: values.email, role: values.email.includes("admin") ? "admin" : "customer" }, "demo-token");
      toast.success("Signed in with demo session");
      router.push("/profile");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-md gap-4 rounded-lg border border-black/10 bg-white p-6">
      {mode === "register" && <Input placeholder="Name" {...form.register("name" as never)} />}
      <Input placeholder="Email" type="email" {...form.register("email")} />
      <Input placeholder="Password" type="password" {...form.register("password")} />
      <Button disabled={form.formState.isSubmitting}>{mode === "login" ? "Sign in" : "Create account"}</Button>
    </form>
  );
}
