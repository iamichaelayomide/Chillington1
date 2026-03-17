"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCartTotals, useCartStore } from "@/store/cart-store";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const totals = getCartTotals(items);

  return (
    <header className="sticky top-0 z-40 border-b border-orange-200/70 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-heading text-xl font-black uppercase tracking-[0.2em] text-slate-900">
            Chillington Bites
          </p>
          <p className="text-sm text-slate-600">Fresh, loaded shawarma in Akure.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/deals"
            className="hidden rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600 sm:inline-flex"
          >
            Deals
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-orange-500 px-1.5 py-1 text-xs font-bold text-white">
              {totals.quantity}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
