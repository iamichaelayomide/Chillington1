import { AdminExtrasClient } from "@/components/admin/admin-extras-client";
import { getAdminExtras } from "@/lib/data";

export default async function AdminExtrasPage() {
  const extras = await getAdminExtras();

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Dashboard</p>
        <h1 className="mt-2 font-heading text-4xl font-black text-slate-900">Extras</h1>
      </div>
      <AdminExtrasClient initialExtras={extras} />
    </section>
  );
}
