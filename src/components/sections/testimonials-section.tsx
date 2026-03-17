import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tomi, Alagbaka",
    quote: "The chicken jumbo is properly loaded. It actually feels worth the money every single time.",
  },
  {
    name: "David, FUTA South Gate",
    quote: "Fast delivery, hot wrap, good cream balance. One of the few places that gets shawarma texture right.",
  },
  {
    name: "Mide, Arakale",
    quote: "I ordered through WhatsApp in minutes and the combo arrived exactly how I expected.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Testimonials</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-slate-950">What people say after the first bite.</h2>
          </div>
          <div className="hidden items-center gap-1 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-slate-700 sm:inline-flex">
            <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
            4.9 local rating feel
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
              <div className="mb-4 flex gap-1 text-orange-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-700">“{testimonial.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-slate-950">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
