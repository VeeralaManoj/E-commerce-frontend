import Link from "next/link";
import { Protected } from "@/components/auth/Protected";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/products", "Products"],
  ["/admin/categories", "Categories"],
  ["/admin/orders", "Orders"],
  ["/admin/users", "Users"]
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected admin>
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg border border-black/10 bg-white p-4">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-black/50">Admin</p>
          <nav className="grid gap-1">{links.map(([href, label]) => <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-black/5">{label}</Link>)}</nav>
        </aside>
        <section>{children}</section>
      </div>
    </Protected>
  );
}
