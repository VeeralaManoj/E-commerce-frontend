"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";

export function AddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  return <Button onClick={() => addItem(product)}><ShoppingCart size={18} /> Add to cart</Button>;
}
