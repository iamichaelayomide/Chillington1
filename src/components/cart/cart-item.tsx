"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { CartItem as CartLineItem } from "@/store/cart-store";

export function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartLineItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="rounded-[1.75rem] border border-orange-100 bg-white p-4">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-orange-100">
          <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="80px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">{item.productName}</h3>
              {item.dealLabel ? (
                <p className="mt-1 inline-flex rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-green-700">
                  {item.dealLabel}
                </p>
              ) : null}
              <p className="text-sm text-slate-500">{item.size}</p>
              {item.extras.length > 0 ? <p className="mt-1 text-sm text-slate-600">+ {item.extras.join(", ")}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              aria-label={`Remove ${item.productName}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 rounded-full bg-slate-950 px-2 py-2 text-white">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                aria-label="Decrease item quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                aria-label="Increase item quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="font-heading text-xl font-black text-slate-900">{formatCurrency(item.lineTotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
