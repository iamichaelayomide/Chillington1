import { unstable_noStore as noStore } from "next/cache";
import { fallbackExtras, fallbackOrders, fallbackProducts, fallbackPromotion } from "@/lib/mock-data";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import type { Extra, MenuData, Order, Product, Promotion } from "@/types/domain";

async function loadMenuFromSupabase(): Promise<MenuData | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const [{ data: products }, { data: extras }, { data: promotion }] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("category")
      .order("created_at", { ascending: true }),
    supabase.from("extras").select("*").eq("is_active", true).order("name"),
    supabase.from("promotions").select("*").eq("is_active", true).limit(1).maybeSingle(),
  ]);

  if (!products || !extras) {
    return null;
  }

  return {
    products: products as Product[],
    extras: extras as Extra[],
    promotion: (promotion as Promotion | null) ?? null,
  };
}

export async function getMenuData(): Promise<MenuData> {
  noStore();
  return (await loadMenuFromSupabase()) ?? {
    products: fallbackProducts,
    extras: fallbackExtras,
    promotion: fallbackPromotion,
  };
}

export async function getAdminProducts() {
  noStore();
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return fallbackProducts;
  }

  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  return (data as Product[]) ?? fallbackProducts;
}

export async function getAdminExtras() {
  noStore();
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return fallbackExtras;
  }

  const { data } = await supabase.from("extras").select("*").order("name");
  return (data as Extra[]) ?? fallbackExtras;
}

export async function getAdminPromotions() {
  noStore();
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return [fallbackPromotion];
  }

  const { data } = await supabase.from("promotions").select("*").order("title");
  return (data as Promotion[]) ?? [fallbackPromotion];
}

export async function getAdminOrders() {
  noStore();
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return fallbackOrders;
  }

  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  return (data as Order[]) ?? fallbackOrders;
}
