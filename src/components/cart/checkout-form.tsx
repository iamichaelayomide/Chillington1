"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getPublicEnv } from "@/lib/env";
import { formatCurrency, formatPhone } from "@/lib/format";
import { checkoutSchema, type CheckoutInputValues, type CheckoutValues } from "@/lib/validation";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { WhatsAppButton } from "@/components/cart/whatsapp-button";

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { total } = useMemo(() => getCartTotals(items), [items]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CheckoutInputValues, unknown, CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer_name: "",
      phone: "",
      address: "",
      items: [],
      total: 0,
    },
  });

  async function handleWhatsAppCheckout() {
    const valid = await form.trigger(["customer_name", "phone", "address"]);
    if (!valid || items.length === 0) {
      setFeedback(items.length === 0 ? "Your cart is empty." : "Fill in your contact details before checkout.");
      return;
    }

    const values = form.getValues();
    const payload = checkoutSchema.parse({
      ...values,
      phone: formatPhone(values.phone),
      items: items.map((item) => ({
        product_id: item.productId,
        product_name: item.dealLabel ? `${item.productName} - ${item.dealLabel}` : item.productName,
        size: item.size,
        quantity: item.quantity,
        extras: item.extras,
        price: item.lineTotal,
      })),
      total,
    });

    setIsSubmitting(true);
    setFeedback(null);

    let orderSaved = false;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        orderSaved = true;
      }
    } catch {
      orderSaved = false;
    }

    const message = [
      "Hello, I want to order:",
      "",
      ...payload.items.map((item) =>
        [`- ${item.product_name} (${item.size}) x${item.quantity}`, ...item.extras.map((extra) => `+ ${extra}`)].join("\n"),
      ),
      "",
      `Total: ${formatCurrency(payload.total)}`,
      `Name: ${payload.customer_name}`,
      `Phone: ${payload.phone}`,
      `Address: ${payload.address}`,
    ].join("\n");

    const url = `https://wa.me/${getPublicEnv().whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (orderSaved) {
      clearCart();
      form.reset();
      setFeedback("Order saved and sent to WhatsApp.");
    } else {
      setFeedback("Order sent to WhatsApp. Database save was skipped because Supabase is not configured.");
    }

    setIsSubmitting(false);
  }

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="customer_name" className="mb-2 block text-sm font-semibold text-slate-700">
          Name
        </label>
        <input
          id="customer_name"
          placeholder="Your full name"
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
          {...form.register("customer_name")}
        />
        {form.formState.errors.customer_name ? (
          <p className="mt-2 text-sm text-red-500">{form.formState.errors.customer_name.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
          Phone
        </label>
        <input
          id="phone"
          placeholder="0803 123 4567"
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
          {...form.register("phone")}
        />
        {form.formState.errors.phone ? (
          <p className="mt-2 text-sm text-red-500">{form.formState.errors.phone.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="address" className="mb-2 block text-sm font-semibold text-slate-700">
          Delivery address
        </label>
        <textarea
          id="address"
          placeholder="House number, street, area, Akure"
          rows={3}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
          {...form.register("address")}
        />
        {form.formState.errors.address ? (
          <p className="mt-2 text-sm text-red-500">{form.formState.errors.address.message}</p>
        ) : null}
      </div>
      <div className="rounded-[1.75rem] bg-slate-950 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Total</p>
          <p className="font-heading text-3xl font-black">{formatCurrency(total)}</p>
        </div>
        <p className="mt-2 text-sm text-slate-300">Your order message will be sent to customer care on WhatsApp.</p>
      </div>
      <WhatsAppButton onClick={handleWhatsAppCheckout} isSubmitting={isSubmitting} />
      {feedback ? <p className="text-sm text-slate-600">{feedback}</p> : null}
    </form>
  );
}
