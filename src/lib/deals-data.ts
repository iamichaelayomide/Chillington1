import type { Deal } from "@/types/domain";

export const deals: Deal[] = [
  {
    slug: "jumbo-chicken-rush",
    title: "Jumbo Chicken Rush",
    status: "ongoing",
    starts_at: "2026-04-03T09:00:00.000Z",
    ends_at: "2026-04-30T22:00:00.000Z",
    hero_image:
      "https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg",
    product_id: "prod-chicken-classic",
    product_name: "Chicken Shawarma",
    size: "Jumbo",
    original_price: 3900,
    deal_price: 3200,
    max_quantity: 3,
    badge: "Ongoing Deal",
    teaser: "Save big on the most ordered jumbo wrap in Akure.",
    description:
      "Claim the Jumbo Chicken Rush and lock in a lower jumbo price. The wrap stays fixed at Jumbo size so the value is clean, the order is fast, and the customer sees exactly what they are getting.",
  },
  {
    slug: "suya-special-week",
    title: "Suya Special Week",
    status: "ongoing",
    starts_at: "2026-05-06T09:00:00.000Z",
    ends_at: "2026-05-31T22:00:00.000Z",
    hero_image:
      "https://images.pexels.com/photos/29306506/pexels-photo-29306506.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306506.jpg&fm=jpg",
    product_id: "prod-suya-blaze",
    product_name: "Suya Shawarma",
    size: "Special",
    original_price: 3800,
    deal_price: 3200,
    max_quantity: 3,
    badge: "Ongoing Deal",
    teaser: "Pepper-forward deal for people who want heat without paying full special price.",
    description:
      "Suya Special Week drops the Special size to a sharper price. It is claimable now, quantity-limited, and designed to move people straight into ordering without extra decision fatigue.",
  },
  {
    slug: "combo-night-drop",
    title: "Combo Night Drop",
    status: "coming-soon",
    starts_at: "2026-06-12T17:00:00.000Z",
    hero_image:
      "https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306505.jpg&fm=jpg",
    product_id: "prod-combo-feast",
    product_name: "Shawarma Combo Box",
    size: "Regular",
    original_price: 5200,
    deal_price: 4600,
    max_quantity: 3,
    badge: "Coming Soon",
    teaser: "A tighter combo price for evening orders starting in June 2026.",
    description:
      "This upcoming combo deal goes live in June 2026. The offer will cap at three combo boxes per order and send customers directly into the same fast checkout flow once it becomes active.",
  },
  {
    slug: "turkey-weekend-fire",
    title: "Turkey Weekend Fire",
    status: "coming-soon",
    starts_at: "2026-07-10T12:00:00.000Z",
    hero_image:
      "https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg",
    product_id: "prod-turkey-gold",
    product_name: "Turkey Shawarma",
    size: "Special",
    original_price: 4200,
    deal_price: 3600,
    max_quantity: 3,
    badge: "Coming Soon",
    teaser: "Weekend-only turkey special running from July 2026.",
    description:
      "Turkey Weekend Fire is a limited special-size offer planned for July 2026. Customers will see the exact markdown and can only claim it once it becomes active.",
  },
];

export function getDealBySlug(slug: string) {
  return deals.find((deal) => deal.slug === slug) ?? null;
}
