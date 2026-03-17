import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminUser();

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </main>
  );
}
