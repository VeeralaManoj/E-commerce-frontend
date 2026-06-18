"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";

type FavoriteButtonProps = {
  productId: string;
  className?: string;
};

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useWishlist(productId);

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isFavorite}
      onClick={() => toggleFavorite(productId)}
      className={cn("rounded-full p-2 transition hover:bg-black/5", className)}
    >
      <Heart
        size={18}
        className={cn("transition", isFavorite ? "fill-coral text-coral" : "fill-transparent text-black/65")}
      />
    </button>
  );
}
