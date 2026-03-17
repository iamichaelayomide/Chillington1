import { OrderingExperience } from "@/components/ordering-experience";
import { DirectionsSection } from "@/components/sections/directions-section";
import { HeroSection } from "@/components/sections/hero-section";
import { Navbar } from "@/components/sections/navbar";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getDealBySlug } from "@/lib/deals-data";
import { getMenuData } from "@/lib/data";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const menu = await getMenuData();
  const params = await searchParams;
  const dealSlug = typeof params.deal === "string" ? params.deal : undefined;
  const claimedDeal = dealSlug ? getDealBySlug(dealSlug) : null;

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <OrderingExperience
        products={menu.products}
        extras={menu.extras}
        promotion={menu.promotion}
        claimedDeal={claimedDeal}
      />
      <TestimonialsSection />
      <DirectionsSection />
    </main>
  );
}
