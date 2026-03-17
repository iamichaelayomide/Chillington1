"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Extra, Product, ProductSize } from "@/types/domain";

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  dealSlug?: string;
  dealLabel?: string;
  size: ProductSize;
  extras: string[];
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (
    product: Product,
    size: ProductSize,
    selectedExtras: Extra[],
    quantity: number,
    options?: { priceOverride?: number; dealSlug?: string; dealLabel?: string },
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

function buildItemId(productId: string, size: ProductSize, extras: string[], dealSlug?: string) {
  return `${productId}:${size}:${extras.sort().join("|")}:${dealSlug ?? "standard"}`;
}

function recalculateItem(item: Omit<CartItem, "lineTotal"> & { lineTotal?: number }) {
  return {
    ...item,
    lineTotal: item.unitPrice * item.quantity,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product, size, selectedExtras, quantity, options) =>
        set((state) => {
          const basePrice = product.variants.find((variant) => variant.size === size)?.price ?? 0;
          const extraPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
          const unitPrice = options?.priceOverride ?? basePrice + extraPrice;
          const extras = selectedExtras.map((extra) => extra.name);
          const id = buildItemId(product.id, size, extras, options?.dealSlug);
          const existing = state.items.find((item) => item.id === id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id ? recalculateItem({ ...item, quantity: item.quantity + quantity }) : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              recalculateItem({
                id,
                productId: product.id,
                productName: product.name,
                productImage: product.image_url,
                dealSlug: options?.dealSlug,
                dealLabel: options?.dealLabel,
                size,
                extras,
                quantity,
                unitPrice,
              }),
            ],
          };
        }),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === itemId ? recalculateItem({ ...item, quantity }) : item))
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (itemId) => set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "chillington-bites-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function getCartTotals(items: CartItem[]) {
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { quantity, total };
}
