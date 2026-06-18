"use client";

import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartService } from "@/lib/api/services";
import { CartItem, Product } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  sync: () => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          const items = existing
            ? state.items.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
            : [...state.items, { product, quantity }];
          return { items };
        });
        toast.success("Added to cart");
        void get().sync();
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({ items: state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)).filter((item) => item.quantity > 0) }));
        void get().sync();
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) }));
        toast.success("Removed from cart");
        void get().sync();
      },
      clear: () => set({ items: [] }),
      sync: async () => {
        await cartService.sync(get().items).catch(() => undefined);
      }
    }),
    { name: "ecommerce-cart" }
  )
);
