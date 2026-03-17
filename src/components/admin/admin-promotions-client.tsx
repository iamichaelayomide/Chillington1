"use client";

import { useState } from "react";
import { AdminTable } from "@/components/admin/admin-table";
import type { Promotion } from "@/types/domain";

export function AdminPromotionsClient({ initialPromotions }: { initialPromotions: Promotion[] }) {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createPromotion() {
    const response = await fetch("/api/admin/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, is_active: false }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    setPromotions((current) => [...current, result.promotion]);
    setTitle("");
    setDescription("");
  }

  async function togglePromotion(promotion: Promotion) {
    const response = await fetch(`/api/admin/promotions/${promotion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...promotion, is_active: !promotion.is_active }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    setPromotions((current) =>
      current.map((item) => (item.id === result.promotion.id ? result.promotion : { ...item, is_active: false })),
    );
  }

  async function deletePromotion(promotionId: string) {
    const response = await fetch(`/api/admin/promotions/${promotionId}`, { method: "DELETE" });
    if (!response.ok) {
      return;
    }

    setPromotions((current) => current.filter((promotion) => promotion.id !== promotionId));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Promotions</p>
        <h2 className="mt-2 font-heading text-3xl font-black text-slate-900">Manage banners</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Buy 1 Get 1 Drink"
            className="rounded-2xl border border-orange-200 px-4 py-3"
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Order any Special and get a chilled drink."
            className="rounded-2xl border border-orange-200 px-4 py-3"
          />
        </div>
        <button type="button" onClick={createPromotion} className="mt-4 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white">
          Add promotion
        </button>
      </section>
      <AdminTable headers={["Promotion", "Description", "State", "Actions"]}>
        {promotions.map((promotion) => (
          <tr key={promotion.id}>
            <td className="px-5 py-4 font-semibold text-slate-900">{promotion.title}</td>
            <td className="px-5 py-4 text-sm text-slate-700">{promotion.description}</td>
            <td className="px-5 py-4 text-sm font-semibold text-slate-700">
              {promotion.is_active ? "Live now" : "Inactive"}
            </td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => togglePromotion(promotion)} className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  {promotion.is_active ? "Deactivate" : "Make active"}
                </button>
                <button type="button" onClick={() => deletePromotion(promotion.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
