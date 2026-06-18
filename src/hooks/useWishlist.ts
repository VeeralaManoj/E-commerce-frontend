"use client";

import { selectToggleWishlist, selectWishlistIds, useWishlistStore } from "@/stores/wishlistStore";

export function useWishlist(productId?: string) {
  const favoriteIds = useWishlistStore(selectWishlistIds);
  const toggleFavorite = useWishlistStore(selectToggleWishlist);
  const isFavorite = productId ? favoriteIds.includes(productId) : false;

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite
  };
}
