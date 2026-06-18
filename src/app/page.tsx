import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryService, productService } from "@/lib/api/services";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export default async function HomePage() {
  const [{ data: featured }, categories, { data: arrivals }] = await Promise.all([
    productService.list({ page: "1" }),
    categoryService.list(),
    productService.list({ sort: "newest", page: "1" })
  ]);

  return (
    <div>
      <section className="bg-white">
        <div className="container-page grid min-h-[560px] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Curated daily goods</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">Better essentials for work, home, and every day.</h1>
            <p className="mt-5 max-w-xl text-lg text-black/65">A scalable commerce experience with real API integration, protected accounts, cart persistence, checkout, and admin operations.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products"><Button>Shop products <ArrowRight size={18} /></Button></Link>
              <Link href="/register"><Button variant="secondary">Create account</Button></Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop" alt="Curated store display" fill priority className="object-cover" />
          </div>
        </div>
      </section>
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between"><h2 className="text-2xl font-bold">Featured products</h2><Link href="/products" className="text-sm font-semibold text-brand-600">View all</Link></div>
        <ProductGrid products={featured.slice(0, 6)} />
      </section>
      <section className="bg-brand-50 py-12">
        <div className="container-page">
          <h2 className="mb-6 text-2xl font-bold">Shop by category</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`} className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black text-white">
                {category.image && <Image src={category.image} alt={category.name} fill className="object-cover opacity-70" />}
                <span className="absolute bottom-4 left-4 text-xl font-bold">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-12">
        <h2 className="mb-6 text-2xl font-bold">New arrivals</h2>
        <ProductGrid products={arrivals.slice(0, 3)} />
      </section>
      <section className="bg-ink py-12 text-white">
        <div className="container-page flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div><h2 className="text-2xl font-bold">Get product drops and offers</h2><p className="mt-2 text-white/70">Newsletter-ready UI wired for backend integration.</p></div>
          <form className="flex w-full max-w-md gap-2"><input className="h-11 flex-1 rounded-md px-3 text-ink" placeholder="you@example.com" /><Button>Subscribe</Button></form>
        </div>
      </section>
    </div>
  );
}
