import { AdminOrdersClient } from "@/components/admin/admin-orders-client";
import { getAdminOrders } from "@/lib/data";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Dashboard</p>
        <h1 className="mt-2 font-heading text-4xl font-black text-slate-900">Orders</h1>
      </div>
      <AdminOrdersClient initialOrders={orders} />
    </section>
  );
}
