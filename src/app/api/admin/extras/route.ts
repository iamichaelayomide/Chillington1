import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { extraSchema } from "@/lib/validation";

export async function POST(request: Request) {
  await requireAdminUser();
  const payload = extraSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const extra = { id: randomUUID(), ...payload.data };
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ extra }, { status: 201 });
  }

  const { data, error } = await supabase.from("extras").insert(extra).select("*").maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ extra: data }, { status: 201 });
}
