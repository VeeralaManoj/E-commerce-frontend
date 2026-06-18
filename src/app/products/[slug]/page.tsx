import Image from "next/image";
import { productService } from "@/lib/api/services";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AddToCart } from "@/components/product/AddToCart";
import { formatCurrency } from "@/lib/utils";

export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const { product, reviews, related } = await productService.details(params.slug);
  return (
    <div className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white"><Image src={product.images[0]} alt={product.name} fill className="object-cover" /></div>
          <div className="grid grid-cols-4 gap-3">{product.images.map((image) => <div key={image} className="relative aspect-square overflow-hidden rounded-md bg-white"><Image src={image} alt={product.name} fill className="object-cover" /></div>)}</div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">{product.category.name}</p>
          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>
          <p className="mt-3 text-xl font-bold">{formatCurrency(product.price)}</p>
          <p className="mt-5 text-black/65">{product.description}</p>
          <p className="mt-4 text-sm text-black/60">{product.rating.toFixed(1)} stars from {product.reviewCount} reviews</p>
          <div className="mt-8"><AddToCart product={product} /></div>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
        <div className="grid gap-3">{reviews.map((review) => <div key={review.id} className="rounded-lg border border-black/10 bg-white p-4"><p className="font-semibold">{review.user.name}</p><p className="text-sm text-black/60">{review.rating}/5</p><p className="mt-2">{review.comment}</p></div>)}</div>
      </section>
      <section className="mt-14"><h2 className="mb-6 text-2xl font-bold">Related products</h2><ProductGrid products={related} /></section>
    </div>
  );
}
