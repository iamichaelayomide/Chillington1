import type { Extra, Order, Product, Promotion } from "@/types/domain";

const realFoodImages = {
  wrapped:
    "https://images.pexels.com/photos/29306506/pexels-photo-29306506.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306506.jpg&fm=jpg",
  platter:
    "https://images.pexels.com/photos/29306497/pexels-photo-29306497.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306497.jpg&fm=jpg",
  closeUp:
    "https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?cs=srgb&dl=pexels-nano-erdozain-120534369-29306505.jpg&fm=jpg",
};

export const fallbackProducts: Product[] = [
  {
    id: "prod-chicken-classic",
    name: "Chicken Shawarma",
    category: "Chicken",
    description: "Juicy chicken, crunchy veg, signature cream and a hot griddle finish.",
    image_url: realFoodImages.platter,
    variants: [
      { size: "Regular", price: 2900 },
      { size: "Special", price: 3500 },
      { size: "Jumbo", price: 3900 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:00:00.000Z",
  },
  {
    id: "prod-beef-loaded",
    name: "Beef Shawarma",
    category: "Beef",
    description: "Rich beef strips with pepper cream, cabbage and toasted wrap edges.",
    image_url: realFoodImages.closeUp,
    variants: [
      { size: "Regular", price: 3100 },
      { size: "Special", price: 3700 },
      { size: "Jumbo", price: 4200 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:02:00.000Z",
  },
  {
    id: "prod-suya-blaze",
    name: "Suya Shawarma",
    category: "Suya",
    description: "Peppery suya spice, onion crunch and creamy heat in every bite.",
    image_url: realFoodImages.wrapped,
    variants: [
      { size: "Regular", price: 3200 },
      { size: "Special", price: 3800 },
      { size: "Jumbo", price: 4300 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:04:00.000Z",
  },
  {
    id: "prod-goat-smoke",
    name: "Goat Shawarma",
    category: "Goat",
    description: "Smoky goat filling with green sauce lift and fresh-cut vegetables.",
    image_url: realFoodImages.closeUp,
    variants: [
      { size: "Regular", price: 3400 },
      { size: "Special", price: 4100 },
      { size: "Jumbo", price: 4700 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:06:00.000Z",
  },
  {
    id: "prod-turkey-gold",
    name: "Turkey Shawarma",
    category: "Turkey",
    description: "Tender turkey with butter-toasted wrap and a fuller, richer filling.",
    image_url: realFoodImages.platter,
    variants: [
      { size: "Regular", price: 3500 },
      { size: "Special", price: 4200 },
      { size: "Jumbo", price: 4900 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:08:00.000Z",
  },
  {
    id: "prod-shrimken-wave",
    name: "Shrimken Shawarma",
    category: "Shrimken",
    description: "Chicken meets shrimp for a richer coastal-style shawarma build.",
    image_url: realFoodImages.wrapped,
    variants: [
      { size: "Regular", price: 3900 },
      { size: "Special", price: 4600 },
      { size: "Jumbo", price: 5400 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:10:00.000Z",
  },
  {
    id: "prod-lamb-heat",
    name: "Lamb Shawarma",
    category: "Lamb",
    description: "Bold lamb flavour with sweet onion, chilli glaze and silky cream.",
    image_url: realFoodImages.closeUp,
    variants: [
      { size: "Regular", price: 4000 },
      { size: "Special", price: 4700 },
      { size: "Jumbo", price: 5600 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:12:00.000Z",
  },
  {
    id: "prod-combo-feast",
    name: "Shawarma Combo Box",
    category: "Combos",
    description: "One jumbo shawarma, fries and chilled drink bundled for quick decisions.",
    image_url: realFoodImages.platter,
    variants: [
      { size: "Regular", price: 5200 },
      { size: "Special", price: 5900 },
      { size: "Jumbo", price: 6600 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:14:00.000Z",
  },
  {
    id: "prod-frozen-drink",
    name: "Frozen Drink Pair",
    category: "Extras",
    description: "Cold drink add-on for hot shawarma runs and combo upsells.",
    image_url: realFoodImages.wrapped,
    variants: [
      { size: "Regular", price: 800 },
      { size: "Special", price: 1200 },
      { size: "Jumbo", price: 1500 },
    ],
    is_available: true,
    created_at: "2026-03-17T10:15:00.000Z",
  },
];

export const fallbackExtras: Extra[] = [
  { id: "extra-sausage", name: "Extra sausage", price: 700, is_active: true },
  { id: "extra-cream", name: "Extra cream", price: 500, is_active: true },
  { id: "extra-wrap", name: "Extra wrap", price: 600, is_active: true },
];

export const fallbackPromotion: Promotion = {
  id: "promo-drink",
  title: "Buy 1, Get 1 Drink",
  description: "Order any Special or Jumbo shawarma today and claim a chilled drink add-on.",
  is_active: true,
};

export const fallbackOrders: Order[] = [
  {
    id: "ord-demo-1",
    items: [
      {
        product_id: "prod-chicken-classic",
        product_name: "Chicken Shawarma",
        size: "Jumbo",
        quantity: 2,
        extras: ["Extra sausage"],
        price: 8500,
      },
    ],
    total: 8500,
    customer_name: "Tayo Adekunle",
    phone: "08031234567",
    address: "Road 7, Alagbaka, Akure",
    status: "Pending",
    created_at: "2026-03-17T13:00:00.000Z",
  },
];
