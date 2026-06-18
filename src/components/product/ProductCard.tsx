"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const wishlist = useWishlistStore();
  const wished = wishlist.has(product.id);

  return (
    <article className="group rounded-lg border border-black/10 bg-white p-3 shadow-sm">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden rounded-md bg-black/5">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
      </Link>
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="font-semibold hover:text-brand-600">{product.name}</Link>
            <p className="text-sm text-black/55">{product.category.name}</p>
          </div>
          <button aria-label="Toggle wishlist" onClick={() => wishlist.toggle(product.id)} className="rounded-full p-2 hover:bg-black/5">
            <Heart size={18} className={wished ? "fill-coral text-coral" : ""} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold">{formatCurrency(product.price)}</p>
          <button aria-label="Add to cart" onClick={() => addItem(product)} className="rounded-full bg-ink p-2 text-white hover:bg-brand-600">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
