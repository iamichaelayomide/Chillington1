import { Megaphone } from "lucide-react";
import type { Promotion } from "@/types/domain";

export function PromoBanner({ promotion }: { promotion: Promotion | null }) {
  if (!promotion) {
    return null;
  }

  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-green-200 bg-green-500 px-5 py-5 text-white shadow-soft">
        <div className="flex items-start gap-4">
          <span className="rounded-2xl bg-white/15 p-3">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-100">Active Promo</p>
            <h2 className="mt-1 font-heading text-2xl font-black">{promotion.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-green-50 sm:text-base">{promotion.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
