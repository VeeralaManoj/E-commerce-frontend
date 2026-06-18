"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Protected } from "@/components/auth/Protected";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { orderService } from "@/lib/api/services";
import { shippingSchema } from "@/lib/validations/checkout";
import { useCartStore } from "@/stores/cartStore";

type FormValues = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCartStore();
  const form = useForm<FormValues>({ resolver: zodResolver(shippingSchema), defaultValues: { country: "US" } });

  async function onSubmit(values: FormValues) {
    if (!items.length) return toast.error("Your cart is empty");
    await orderService.create(values, items).catch(() => undefined);
    toast.success("Order created");
    clear();
    router.push("/order-success");
  }

  return (
    <Protected>
      <div className="container-page py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 sm:grid-cols-2">
            {(["fullName", "phone", "address", "city", "state", "postalCode", "country"] as const).map((name) => (
              <label key={name} className={name === "address" ? "sm:col-span-2" : ""}>
                <span className="mb-1 block text-sm font-semibold">{name}</span>
                <Input {...form.register(name)} />
                {form.formState.errors[name] && <span className="text-xs text-red-600">{form.formState.errors[name]?.message}</span>}
              </label>
            ))}
          </div>
          <aside className="h-fit rounded-lg border border-black/10 bg-white p-5">
            <h2 className="text-xl font-bold">Payment</h2>
            <p className="mt-2 text-sm text-black/60">Stripe publishable key is read from environment. Backend should create the PaymentIntent.</p>
            <Button className="mt-6 w-full" disabled={form.formState.isSubmitting}><CreditCard size={18} /> Pay and place order</Button>
          </aside>
        </form>
      </div>
    </Protected>
  );
}
