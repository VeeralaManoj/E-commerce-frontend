"use client";

import { create } from "zustand";

type UiState = {
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setCartOpen: (cartOpen) => set({ cartOpen })
}));
