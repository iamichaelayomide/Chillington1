import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validation";

export async function POST(request: Request) {
  await requireAdminUser();
  const payload = productSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const product = {
    id: randomUUID(),
    ...payload.data,
    created_at: new Date().toISOString(),
  };

  if (!supabase) {
    return NextResponse.json({ product }, { status: 201 });
  }

  const { data, error } = await supabase.from("products").insert(product).select("*").maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data }, { status: 201 });
}
