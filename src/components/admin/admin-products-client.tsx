"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/admin-table";
import { formatCurrency } from "@/lib/format";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { productCategories, productSizes, type Product, type ProductVariant } from "@/types/domain";

type VariantDraft = ProductVariant;
type ProductDraft = {
  name: string;
  category: (typeof productCategories)[number];
  description: string;
  image_url: string;
  is_available: boolean;
  variants: VariantDraft[];
};

const initialDraft: ProductDraft = {
  name: "",
  category: "Chicken",
  description: "",
  image_url: "/images/menu-chicken.svg",
  is_available: true,
  variants: productSizes.map((size) => ({ size, price: 0 })),
};

export function AdminProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [draft, setDraft] = useState<ProductDraft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function uploadImage(file: File) {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setFeedback("Supabase Storage is not configured. Use a direct image URL instead.");
      return;
    }

    const extension = file.name.split(".").pop() ?? "jpg";
    const filePath = `products/${slugify(draft.name || "shawarma")}-${Date.now()}.${extension}`;
    const { error } = await supabase.storage.from("product-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      setFeedback(error.message);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
    setDraft((current) => ({ ...current, image_url: data.publicUrl }));
    setFeedback("Image uploaded.");
  }

  async function submitProduct() {
    setBusy(true);
    setFeedback(null);

    const response = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    const result = await response.json();

    if (!response.ok) {
      setFeedback(result.error ?? "Unable to save product.");
      setBusy(false);
      return;
    }

    if (editingId) {
      setProducts((current) => current.map((product) => (product.id === editingId ? result.product : product)));
    } else {
      setProducts((current) => [result.product, ...current]);
    }

    setDraft(initialDraft);
    setEditingId(null);
    setFeedback("Product saved.");
    setBusy(false);
  }

  async function deleteProduct(id: string) {
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setFeedback("Unable to delete product.");
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== id));
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setDraft({
      name: product.name,
      category: product.category,
      description: product.description,
      image_url: product.image_url,
      is_available: product.is_available,
      variants: product.variants,
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Menu management</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-slate-900">
              {editingId ? "Edit product" : "Create product"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setDraft(initialDraft);
            }}
            className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Reset
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Name
            <input
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Category
            <select
              value={draft.category}
              onChange={(event) =>
                setDraft((current) => ({ ...current, category: event.target.value as Product["category"] }))
              }
              className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3"
            >
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2 text-sm font-semibold text-slate-700">
            Description
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold text-slate-700">
            Image URL
            <input
              value={draft.image_url}
              onChange={(event) => setDraft((current) => ({ ...current, image_url: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3"
            />
          </label>
          <label className="md:col-span-2 text-sm font-semibold text-slate-700">
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void uploadImage(file);
                }
              }}
              className="mt-2 w-full rounded-2xl border border-dashed border-orange-200 px-4 py-3"
            />
          </label>
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-slate-700">Variants</p>
            <div className="mt-2 grid gap-3 md:grid-cols-3">
              {draft.variants.map((variant, index) => (
                <label key={variant.size} className="rounded-2xl border border-orange-200 p-4 text-sm font-semibold text-slate-700">
                  {variant.size}
                  <input
                    type="number"
                    min={0}
                    value={variant.price}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        variants: current.variants.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, price: Number(event.target.value) } : entry,
                        ),
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3"
                  />
                </label>
              ))}
            </div>
          </div>
          <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={draft.is_available}
              onChange={(event) => setDraft((current) => ({ ...current, is_available: event.target.checked }))}
              className="h-4 w-4 accent-green-500"
            />
            Product is available
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submitProduct}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            {busy ? "Saving..." : editingId ? "Update product" : "Create product"}
          </button>
          {feedback ? <p className="text-sm text-slate-600">{feedback}</p> : null}
        </div>
      </section>
      <AdminTable headers={["Product", "Category", "Variants", "Status", "Actions"]}>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-5 py-4">
              <p className="font-semibold text-slate-900">{product.name}</p>
              <p className="text-sm text-slate-500">{product.description}</p>
            </td>
            <td className="px-5 py-4 text-sm text-slate-700">{product.category}</td>
            <td className="px-5 py-4 text-sm text-slate-700">
              {product.variants.map((variant) => `${variant.size}: ${formatCurrency(variant.price)}`).join(" | ")}
            </td>
            <td className="px-5 py-4 text-sm font-semibold text-slate-700">
              {product.is_available ? "Available" : "Hidden"}
            </td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(product)}
                  className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  <Trash2 className="mr-1 inline h-4 w-4" />
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
