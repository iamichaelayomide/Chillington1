import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="flex flex-col justify-between rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft sm:p-8">
          <div>
            <span className="inline-flex rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Akure delivery
            </span>
            <h1 className="mt-5 max-w-lg font-heading text-5xl font-black leading-none text-slate-950 sm:text-6xl">
              Hot shawarma.
              <br />
              Real hunger.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Loaded wraps, clean ordering, fast WhatsApp checkout.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-[1.4rem] bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              Start order
            </a>
            <Link
              href="/deals"
              className="rounded-[1.4rem] border border-orange-200 bg-orange-50 px-6 py-4 text-base font-semibold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
            >
              Special deals
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="rounded-full bg-orange-50 px-4 py-2">Fresh wraps</span>
            <span className="rounded-full bg-orange-50 px-4 py-2">Fast flow</span>
            <span className="rounded-full bg-orange-50 px-4 py-2">Direct checkout</span>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-orange-200 bg-slate-950 shadow-[0_32px_80px_rgba(15,23,42,0.18)]">
          <Image
            src="https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg"
            alt="Large platter of shawarma, fries and drinks."
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.74))]" />
          <div className="absolute left-5 right-5 top-5 flex justify-between">
            <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-950">
              Best seller
            </div>
            <div className="rounded-full bg-green-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              WhatsApp order
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-lg rounded-[1.75rem] border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Most ordered tonight</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">
                Chicken Jumbo with extra cream.
              </h2>
              <p className="mt-3 text-sm leading-6 text-orange-50/90">Big wrap, visible filling, no wasted steps.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
