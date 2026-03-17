import { AdminPromotionsClient } from "@/components/admin/admin-promotions-client";
import { getAdminPromotions } from "@/lib/data";

export default async function AdminPromotionsPage() {
  const promotions = await getAdminPromotions();

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Dashboard</p>
        <h1 className="mt-2 font-heading text-4xl font-black text-slate-900">Promotions</h1>
      </div>
      <AdminPromotionsClient initialPromotions={promotions} />
    </section>
  );
}
