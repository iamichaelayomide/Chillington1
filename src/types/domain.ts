export const productCategories = [
  "Chicken",
  "Beef",
  "Suya",
  "Goat",
  "Turkey",
  "Shrimken",
  "Lamb",
  "Combos",
  "Extras",
] as const;

export const productSizes = ["Regular", "Special", "Jumbo"] as const;
export const orderStatuses = ["Pending", "Preparing", "Delivered"] as const;

export type ProductCategory = (typeof productCategories)[number];
export type ProductSize = (typeof productSizes)[number];
export type OrderStatus = (typeof orderStatuses)[number];

export type ProductVariant = {
  size: ProductSize;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image_url: string;
  variants: ProductVariant[];
  is_available: boolean;
  created_at: string;
};

export type Extra = {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
};

export type DealStatus = "ongoing" | "coming-soon";

export type Deal = {
  slug: string;
  title: string;
  status: DealStatus;
  starts_at: string;
  ends_at?: string;
  hero_image: string;
  product_id: string;
  product_name: string;
  size: ProductSize;
  original_price: number;
  deal_price: number;
  max_quantity: number;
  teaser: string;
  description: string;
  badge: string;
 };

export type OrderItem = {
  product_id: string;
  product_name: string;
  size: ProductSize;
  quantity: number;
  extras: string[];
  price: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  customer_name: string;
  phone: string;
  address: string;
  status: OrderStatus;
  created_at: string;
};

export type MenuData = {
  products: Product[];
  extras: Extra[];
  promotion: Promotion | null;
};
