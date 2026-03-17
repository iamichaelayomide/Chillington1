"use client";

import Image from "next/image";
import { Flame, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/domain";

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  const startingPrice = Math.min(...product.variants.map((variant) => variant.price));

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.16)]">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-orange-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            <Flame className="h-3.5 w-3.5" />
            Hot Pick
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-heading text-3xl font-black text-white">{product.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-orange-50/90">{product.description}</p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-orange-50 px-3 py-2">Creamy finish</span>
          <span className="rounded-full bg-orange-50 px-3 py-2">Toasted wrap</span>
          <span className="rounded-full bg-orange-50 px-3 py-2">Made fresh</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Starts from</p>
            <p className="font-heading text-2xl font-black text-slate-900">{formatCurrency(startingPrice)}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <Plus className="h-4 w-4" />
            Customize
          </button>
        </div>
      </div>
    </article>
  );
}
