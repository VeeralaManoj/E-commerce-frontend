"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/profile", label: "Orders" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const count = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">Commerce</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-brand-600">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link aria-label="Search products" href="/products" className="rounded-full p-2 hover:bg-black/5"><Search size={20} /></Link>
          <Link aria-label="Cart" href="/cart" className="relative rounded-full p-2 hover:bg-black/5">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{count}</span>}
          </Link>
          <Link aria-label="Account" href={user ? "/profile" : "/login"} className="rounded-full p-2 hover:bg-black/5"><UserRound size={20} /></Link>
          <button aria-label="Toggle menu" className="rounded-full p-2 hover:bg-black/5 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="container-page grid gap-3 border-t border-black/10 py-4 md:hidden">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium">{link.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
