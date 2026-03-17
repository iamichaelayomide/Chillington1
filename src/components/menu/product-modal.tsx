"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import type { Deal, Extra, Product, ProductSize } from "@/types/domain";

type ProductModalProps = {
  product: Product | null;
  extras: Extra[];
  claimedDeal?: Deal | null;
  onClose: () => void;
};

export function ProductModal({ product, extras, claimedDeal, onClose }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isDealMode = Boolean(claimedDeal && product && claimedDeal.product_id === product.id);
  const [size, setSize] = useState<ProductSize>(claimedDeal?.size ?? product?.variants[0]?.size ?? "Regular");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [product, onClose]);

  const selectedExtraObjects = useMemo(
    () => extras.filter((extra) => selectedExtras.includes(extra.id)),
    [extras, selectedExtras],
  );

  if (!product) {
    return null;
  }

  const basePrice = product.variants.find((variant) => variant.size === size)?.price ?? 0;
  const unitPrice = isDealMode ? claimedDeal!.deal_price : basePrice + selectedExtraObjects.reduce((sum, extra) => sum + extra.price, 0);
  const total = unitPrice * quantity;
  const quantityLimit = isDealMode ? claimedDeal!.max_quantity : 20;

  function toggleExtra(extraId: string) {
    if (isDealMode) {
      return;
    }

    setSelectedExtras((current) =>
      current.includes(extraId) ? current.filter((item) => item !== extraId) : [...current, extraId],
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/55 p-0 sm:items-center sm:justify-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-white sm:max-w-2xl sm:rounded-[2rem]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-orange-100 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">{product.category}</p>
            <h2 id="product-modal-title" className="font-heading text-2xl font-black text-slate-900">
              {isDealMode ? claimedDeal!.title : product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600"
            aria-label="Close product modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[1.75rem] bg-orange-100">
            <Image src={product.image_url} alt={product.name} width={900} height={700} className="h-auto w-full object-cover" />
            <div className="grid grid-cols-3 gap-2 border-t border-orange-100 bg-[#fff8f2] p-3 text-center text-xs font-semibold text-slate-700">
              <span className="rounded-2xl bg-white px-3 py-2">Toasted wrap</span>
              <span className="rounded-2xl bg-white px-3 py-2">{isDealMode ? "Deal locked" : "Creamy sauce"}</span>
              <span className="rounded-2xl bg-white px-3 py-2">Made hot</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-orange-50 p-4">
              <p className="text-sm leading-6 text-slate-700">{isDealMode ? claimedDeal!.description : product.description}</p>
            </div>
            {isDealMode ? (
              <div className="rounded-[1.5rem] border border-green-200 bg-green-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">Deal math</p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
                  <span>Normal price</span>
                  <span className="line-through">{formatCurrency(claimedDeal!.original_price)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>Deal price</span>
                  <span>{formatCurrency(claimedDeal!.deal_price)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm font-semibold text-green-700">
                  <span>You save</span>
                  <span>{formatCurrency(claimedDeal!.original_price - claimedDeal!.deal_price)}</span>
                </div>
                <p className="mt-3 text-xs text-slate-600">This offer is fixed to {claimedDeal!.size} size and capped at {claimedDeal!.max_quantity} per order.</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Choose size</p>
                <div className="mt-3 space-y-3">
                  {product.variants.map((variant) => (
                    <label
                      key={variant.size}
                      className="flex cursor-pointer items-center justify-between rounded-3xl border border-orange-200 px-4 py-4 transition has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="size"
                          value={variant.size}
                          checked={size === variant.size}
                          onChange={() => setSize(variant.size)}
                          className="h-4 w-4 accent-orange-500"
                        />
                        <span className="font-semibold text-slate-900">{variant.size}</span>
                      </span>
                      <span className="font-semibold text-slate-700">{formatCurrency(variant.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {!isDealMode ? (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Add extras</p>
                <div className="mt-3 space-y-3">
                  {extras.map((extra) => (
                    <label
                      key={extra.id}
                      className="flex cursor-pointer items-center justify-between rounded-3xl border border-orange-200 px-4 py-4 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="h-4 w-4 accent-green-500"
                        />
                        <span className="font-semibold text-slate-900">{extra.name}</span>
                      </span>
                      <span className="font-semibold text-slate-700">{formatCurrency(extra.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-between rounded-3xl bg-slate-950 px-4 py-3 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-300">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center font-heading text-2xl font-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(quantityLimit, current + 1))}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                addItem(product, size, isDealMode ? [] : selectedExtraObjects, quantity, {
                  priceOverride: isDealMode ? claimedDeal!.deal_price : undefined,
                  dealSlug: claimedDeal?.slug,
                  dealLabel: claimedDeal?.title,
                });
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-full bg-orange-500 px-5 py-4 text-left text-white transition hover:bg-orange-600"
            >
              <span>
                <span className="block text-sm uppercase tracking-[0.2em] text-orange-100">
                  {isDealMode ? "Claim deal" : "Add to cart"}
                </span>
                <span className="font-heading text-2xl font-black">{formatCurrency(total)}</span>
              </span>
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
