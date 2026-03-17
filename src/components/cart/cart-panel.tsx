"use client";

import { ShoppingBag } from "lucide-react";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { CartItem } from "@/components/cart/cart-item";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/format";

export function CartPanel() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totals = getCartTotals(items);

  return (
    <aside
      id="cart"
      className="hidden h-[calc(100vh-7rem)] rounded-[2rem] border border-orange-200 bg-[#fffaf4] p-5 shadow-soft lg:sticky lg:top-24 lg:block"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Your order</p>
            <h2 className="font-heading text-3xl font-black text-slate-900">Cart</h2>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-2 text-sm font-semibold text-orange-700">
            {totals.quantity} items
          </span>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border border-dashed border-orange-200 bg-white/80 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-orange-400" />
            <p className="mt-4 font-heading text-2xl font-black text-slate-900">Your cart is empty</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Pick a shawarma, choose your size, stack your extras and your total updates instantly here.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
              ))}
            </div>
            <div className="mt-5 rounded-[1.75rem] bg-white p-4">
              <div className="mb-4 flex items-center justify-between border-b border-orange-100 pb-4">
                <p className="text-sm font-semibold text-slate-600">Cart subtotal</p>
                <p className="font-heading text-2xl font-black text-slate-900">{formatCurrency(totals.total)}</p>
              </div>
              <CheckoutForm />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
