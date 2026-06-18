import Link from "next/link";
import { productService, categoryService } from "@/lib/api/services";
import { ProductGrid } from "@/components/product/ProductGrid";
import { buildQuery } from "@/lib/utils";

export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const [result, categories] = await Promise.all([productService.list(searchParams), categoryService.list()]);
  const page = Number(searchParams.page || 1);

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-black/60">Search, filter, sort, and paginate with URL query params.</p>
      </div>
      <form className="mb-8 grid gap-3 rounded-lg border border-black/10 bg-white p-4 md:grid-cols-5">
        <input name="q" defaultValue={searchParams.q} placeholder="Search" className="h-11 rounded-md border border-black/15 px-3 md:col-span-2" />
        <select name="category" defaultValue={searchParams.category || ""} className="h-11 rounded-md border border-black/15 px-3">
          <option value="">All categories</option>
          {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
        </select>
        <select name="sort" defaultValue={searchParams.sort || ""} className="h-11 rounded-md border border-black/15 px-3">
          <option value="">Top rated</option><option value="price-asc">Price low</option><option value="price-desc">Price high</option>
        </select>
        <button className="h-11 rounded-md bg-brand-600 px-4 font-semibold text-white">Apply</button>
      </form>
      <ProductGrid products={result.data} />
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link className="rounded-md border border-black/15 bg-white px-4 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-40" aria-disabled={page <= 1} href={`/products?${buildQuery({ ...searchParams, page: page - 1 })}`}>Previous</Link>
        <span className="text-sm">Page {result.page} of {Math.max(result.pages, 1)}</span>
        <Link className="rounded-md border border-black/15 bg-white px-4 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-40" aria-disabled={page >= result.pages} href={`/products?${buildQuery({ ...searchParams, page: page + 1 })}`}>Next</Link>
      </div>
    </div>
  );
}
