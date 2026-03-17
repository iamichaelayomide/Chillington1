"use client";

import { X } from "lucide-react";
import { CartPanelMobileContent } from "@/components/cart/cart-panel-mobile-content";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        onClick={closeDrawer}
        aria-label="Close cart overlay"
        className="absolute inset-0 bg-slate-950/60"
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-[2rem] border-t border-orange-200 bg-[#fffaf4] shadow-[0_-24px_80px_rgba(15,23,42,0.22)] lg:inset-y-0 lg:right-0 lg:left-auto lg:max-h-none lg:w-[34rem] lg:rounded-none lg:rounded-l-[2rem] lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b border-orange-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Basket</p>
            <h2 className="font-heading text-2xl font-black text-slate-900">Your Order</h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full border border-slate-200 p-2 text-slate-600"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <CartPanelMobileContent />
      </div>
    </div>
  );
}
