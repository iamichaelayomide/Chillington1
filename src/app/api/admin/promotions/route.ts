import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { promotionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  await requireAdminUser();
  const payload = promotionSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const promotion = { id: randomUUID(), ...payload.data };
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ promotion }, { status: 201 });
  }

  if (promotion.is_active) {
    await supabase.from("promotions").update({ is_active: false }).neq("id", promotion.id);
  }

  const { data, error } = await supabase.from("promotions").insert(promotion).select("*").maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ promotion: data }, { status: 201 });
}
