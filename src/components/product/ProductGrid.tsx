import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/shared/State";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <EmptyState title="No products found." />;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
