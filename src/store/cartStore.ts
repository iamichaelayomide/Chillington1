import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.product.id === item.product.id && i.size === item.size && JSON.stringify(i.extras) === JSON.stringify(item.extras)
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
            // No longer opening cart automatically
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      })),
      clearCart: () => set({ items: [] }),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: () => get().items.reduce((total, item) => {
        const extrasTotal = item.extras.reduce((sum, extra) => sum + Number(extra.price), 0);
        return total + ((item.price + extrasTotal) * item.quantity);
      }, 0),
    }),
    {
      name: 'chillington-cart',
      partialize: (state) => ({ items: state.items }), // Persist only items
    }
  )
);