import { adminService } from "@/lib/api/services";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const stats = await adminService.stats();
  const cards = [
    ["Revenue", formatCurrency(stats.revenue)],
    ["Orders", stats.orders],
    ["Users", stats.users],
    ["Products", stats.products]
  ];
  return <div><h1 className="mb-6 text-3xl font-bold">Dashboard</h1><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-lg border border-black/10 bg-white p-5"><p className="text-sm text-black/60">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</div></div>;
}
