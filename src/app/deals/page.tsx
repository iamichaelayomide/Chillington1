import Image from "next/image";
import Link from "next/link";
import { deals } from "@/lib/deals-data";
import { formatCurrency } from "@/lib/format";
import { Navbar } from "@/components/sections/navbar";

export default function DealsPage() {
  const ongoingDeals = deals.filter((deal) => deal.status === "ongoing");
  const upcomingDeals = deals.filter((deal) => deal.status === "coming-soon");

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Special Deals</p>
            <h1 className="mt-3 font-heading text-5xl font-black text-slate-950">Deals worth claiming.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Live offers, clear savings, no guesswork.</p>
          </div>

          <section className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-700">Ongoing</p>
              <h2 className="mt-2 font-heading text-3xl font-black text-slate-900">Claimable right now</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {ongoingDeals.map((deal) => (
                <article key={deal.slug} className="overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-soft">
                  <div className="relative h-64">
                    <Image src={deal.hero_image} alt={deal.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">{deal.badge}</p>
                      <h3 className="mt-2 font-heading text-3xl font-black text-white">{deal.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm leading-6 text-slate-600">{deal.teaser}</p>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-[1.25rem] bg-orange-50 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Normal</p>
                        <p className="mt-2 font-heading text-xl font-black text-slate-900">{formatCurrency(deal.original_price)}</p>
                      </div>
                      <div className="rounded-[1.25rem] bg-green-50 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">Deal</p>
                        <p className="mt-2 font-heading text-xl font-black text-slate-900">{formatCurrency(deal.deal_price)}</p>
                      </div>
                      <div className="rounded-[1.25rem] bg-slate-100 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Save</p>
                        <p className="mt-2 font-heading text-xl font-black text-slate-900">
                          {formatCurrency(deal.original_price - deal.deal_price)}
                        </p>
                      </div>
                    </div>
                    <Link href={`/deals/${deal.slug}`} className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                      View deal
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Coming Soon</p>
              <h2 className="mt-2 font-heading text-3xl font-black text-slate-900">Starts from April 2026 onward</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {upcomingDeals.map((deal) => (
                <article key={deal.slug} className="rounded-[2rem] border border-orange-200 bg-white p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">{deal.badge}</p>
                  <h3 className="mt-2 font-heading text-3xl font-black text-slate-900">{deal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{deal.teaser}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                    <span className="rounded-full bg-orange-50 px-4 py-2">
                      Starts {new Date(deal.starts_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                    </span>
                    <span className="rounded-full bg-slate-100 px-4 py-2">Max {deal.max_quantity} per order</span>
                  </div>
                  <Link href={`/deals/${deal.slug}`} className="mt-5 inline-flex rounded-full border border-orange-200 px-5 py-3 text-sm font-semibold text-slate-900">
                    View preview
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
