"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CartItem } from "@/components/cart/cart-item";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { formatCurrency } from "@/lib/format";
import { getCartTotals, useCartStore } from "@/store/cart-store";

export function CartPanelMobileContent() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totals = useMemo(() => getCartTotals(items), [items]);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center px-6 text-center">
        <ShoppingBag className="h-10 w-10 text-orange-400" />
        <p className="mt-4 font-heading text-2xl font-black text-slate-900">Your cart is empty</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Choose a shawarma from the menu to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[calc(88vh-88px)] overflow-y-auto px-5 py-5">
      {!isCheckoutStep ? (
        <>
          <div className="mb-4 rounded-[1.75rem] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Review order</p>
                <p className="mt-1 text-sm text-slate-600">Everything you added shows here before checkout.</p>
              </div>
              <p className="font-heading text-2xl font-black text-slate-900">{formatCurrency(totals.total)}</p>
            </div>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutStep(true)}
            className="mt-5 w-full rounded-full bg-green-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-green-600"
          >
            Proceed to checkout
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsCheckoutStep(false)}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cart
          </button>
          <div className="rounded-[1.75rem] bg-white p-4">
            <div className="mb-4 flex items-center justify-between border-b border-orange-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Checkout</p>
                <p className="mt-1 text-sm text-slate-600">Enter delivery details, then send your order to customer care.</p>
              </div>
              <p className="font-heading text-2xl font-black text-slate-900">{formatCurrency(totals.total)}</p>
            </div>
            <CheckoutForm />
          </div>
        </div>
      )}
    </div>
  );
}
