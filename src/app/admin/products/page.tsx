import { AdminProductsClient } from "@/components/admin/admin-products-client";
import { getAdminProducts } from "@/lib/data";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Dashboard</p>
        <h1 className="mt-2 font-heading text-4xl font-black text-slate-900">Products</h1>
      </div>
      <AdminProductsClient initialProducts={products} />
    </section>
  );
}
