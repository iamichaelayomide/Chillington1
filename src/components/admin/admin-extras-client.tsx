"use client";

import { useState } from "react";
import { AdminTable } from "@/components/admin/admin-table";
import { formatCurrency } from "@/lib/format";
import type { Extra } from "@/types/domain";

export function AdminExtrasClient({ initialExtras }: { initialExtras: Extra[] }) {
  const [extras, setExtras] = useState(initialExtras);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(true);

  async function createExtra() {
    const response = await fetch("/api/admin/extras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, is_active: isActive }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    setExtras((current) => [...current, result.extra]);
    setName("");
    setPrice(0);
    setIsActive(true);
  }

  async function toggleExtra(extra: Extra) {
    const response = await fetch(`/api/admin/extras/${extra.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...extra, is_active: !extra.is_active }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    setExtras((current) => current.map((item) => (item.id === extra.id ? result.extra : item)));
  }

  async function deleteExtra(extraId: string) {
    const response = await fetch(`/api/admin/extras/${extraId}`, { method: "DELETE" });
    if (!response.ok) {
      return;
    }

    setExtras((current) => current.filter((extra) => extra.id !== extraId));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Upsells</p>
        <h2 className="mt-2 font-heading text-3xl font-black text-slate-900">Manage extras</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Extra sausage"
            className="rounded-2xl border border-orange-200 px-4 py-3"
          />
          <input
            type="number"
            min={0}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            placeholder="700"
            className="rounded-2xl border border-orange-200 px-4 py-3"
          />
          <label className="inline-flex items-center gap-3 rounded-2xl border border-orange-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} className="accent-green-500" />
            Extra is active
          </label>
        </div>
        <button type="button" onClick={createExtra} className="mt-4 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white">
          Add extra
        </button>
      </section>
      <AdminTable headers={["Extra", "Price", "Status", "Actions"]}>
        {extras.map((extra) => (
          <tr key={extra.id}>
            <td className="px-5 py-4 font-semibold text-slate-900">{extra.name}</td>
            <td className="px-5 py-4 text-sm text-slate-700">{formatCurrency(extra.price)}</td>
            <td className="px-5 py-4 text-sm text-slate-700">{extra.is_active ? "Active" : "Hidden"}</td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => toggleExtra(extra)} className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  Toggle
                </button>
                <button type="button" onClick={() => deleteExtra(extra.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">
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
