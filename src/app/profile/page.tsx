"use client";

import { useEffect, useState } from "react";
import { Protected } from "@/components/auth/Protected";
import { orderService } from "@/lib/api/services";
import { formatCurrency } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { Order } from "@/types";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { void orderService.mine().then(setOrders); }, []);

  return (
    <Protected>
      <div className="container-page py-10">
        <div className="mb-8 flex items-center justify-between"><div><h1 className="text-3xl font-bold">{user?.name}</h1><p className="text-black/60">{user?.email}</p></div><button onClick={logout} className="text-sm font-semibold text-red-600">Sign out</button></div>
        <h2 className="mb-4 text-xl font-bold">Order history</h2>
        <div className="grid gap-3">{orders.map((order) => <div key={order.id} className="rounded-lg border border-black/10 bg-white p-4"><div className="flex justify-between"><strong>{order.id}</strong><span>{order.status}</span></div><p className="mt-2 text-sm text-black/60">{formatCurrency(order.total)} · {order.createdAt}</p></div>)}</div>
      </div>
    </Protected>
  );
}
