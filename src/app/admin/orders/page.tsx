import { orderService } from "@/lib/api/services";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await orderService.all();
  return <div><h1 className="mb-6 text-3xl font-bold">Orders</h1><AdminTable headings={["Order", "Customer", "Total", "Status", "Created"]} rows={orders.map((o) => [o.id, o.shippingAddress.fullName, formatCurrency(o.total), o.status, o.createdAt])} /></div>;
}
