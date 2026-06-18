"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/shared/State";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (!items.length) return <div className="container-page py-10"><EmptyState title="Your cart is empty." actionHref="/products" actionLabel="Continue shopping" /></div>;

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-3xl font-bold">Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.product.id} className="grid grid-cols-[96px_1fr] gap-4 rounded-lg border border-black/10 bg-white p-4 sm:grid-cols-[120px_1fr_auto]">
              <div className="relative aspect-square overflow-hidden rounded-md"><Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" /></div>
              <div><p className="font-semibold">{item.product.name}</p><p className="text-sm text-black/60">{formatCurrency(item.product.price)}</p><input type="number" min={1} value={item.quantity} onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))} className="mt-4 h-10 w-24 rounded-md border border-black/15 px-3" /></div>
              <button aria-label="Remove item" onClick={() => removeItem(item.product.id)} className="self-start rounded-full p-2 hover:bg-black/5"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-xl font-bold">Summary</h2>
          <div className="mt-4 flex justify-between"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <Link href="/checkout" className="mt-6 block"><Button className="w-full">Checkout</Button></Link>
        </aside>
      </div>
    </div>
  );
}
