export interface Product {
  id: string;
  name: string;
  category: string;
  variants: Variant[];
  image_url: string | null;
  is_available: boolean;
  created_at?: string;
}

export interface Variant {
  size: string;
  price: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
}

export interface CartItem {
  id: string; // unique local id
  product: Product;
  size: string;
  price: number;
  quantity: number;
  extras: Extra[];
}

export interface Order {
  id?: string;
  items: any[];
  total: number;
  customer_name: string;
  phone: string;
  address: string;
  status?: string;
  created_at?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
}