"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Box, LogOut, Megaphone, Package2, ShoppingBasket, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/products", label: "Products", icon: Package2 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBasket },
  { href: "/admin/extras", label: "Extras", icon: Box },
  { href: "/admin/promotions", label: "Promotions", icon: Megaphone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="rounded-[2rem] border border-orange-200 bg-slate-950 p-5 text-white shadow-soft">
      <div className="border-b border-white/10 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Chillington Bites</p>
        <h1 className="mt-2 font-heading text-3xl font-black">Admin</h1>
        <p className="mt-2 text-sm text-slate-300">Control the live menu, extras, promotions and incoming orders.</p>
      </div>
      <nav className="mt-5 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                pathname === link.href ? "bg-orange-500 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-2xl bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-green-400" />
          <p className="text-sm font-semibold">Mobile-first ordering</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Update prices, toggle availability and keep the WhatsApp order flow live without redeploy friction.
        </p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
