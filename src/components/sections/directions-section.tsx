import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";

const branches = [
  {
    name: "Arakale Branch",
    address: "No. 1 HACO Building, Ori-Eguru Street, Arakale, Akure, Ondo State",
    mapsQuery: "HACO Building Ori-Eguru Street Arakale Akure",
  },
  {
    name: "Oja Oba Branch",
    address: "Oja Oba Market, close to Union Bank, Akure, Ondo State",
    mapsQuery: "Oja Oba Market Union Bank Akure",
  },
];

export function DirectionsSection() {
  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-orange-200 bg-slate-950 p-6 text-white shadow-soft sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Visit Us</p>
          <h2 className="mt-3 font-heading text-4xl font-black">Need directions to the store?</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Walk in, pick up, or confirm delivery from the closest branch. Both locations serve Akure orders.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-orange-300" />
              07041249727 · 08109643705
            </p>
            <p className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-orange-300" />
              Open daily. Confirm current timing on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/2347032891651"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-[1.4rem] bg-orange-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-orange-600"
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="grid gap-5">
          {branches.map((branch) => (
            <article key={branch.name} className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Physical store</p>
                  <h3 className="mt-2 font-heading text-3xl font-black text-slate-950">{branch.name}</h3>
                </div>
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{branch.address}</p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapsQuery)}`}
                target="_blank"
                className="mt-5 inline-flex rounded-full border border-orange-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
              >
                Open in Maps
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
