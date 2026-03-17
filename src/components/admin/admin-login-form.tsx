"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "admin@chillingtonbites.com",
      password: "",
    },
  });

  async function handleLogin(values: LoginValues) {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setErrorMessage("Configure Supabase environment variables before using admin authentication.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-orange-200 bg-white p-6 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Protected route</p>
      <h1 className="mt-2 font-heading text-4xl font-black text-slate-900">Admin Login</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Use the seeded admin account from the README. This route is protected and uses Supabase Auth sessions.
      </p>
      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-2xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-400"
            {...form.register("email")}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-2xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-400"
            {...form.register("password")}
          />
        </div>
        {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-orange-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Access dashboard"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        Back to ordering:{" "}
        <Link href="/" className="font-semibold text-orange-600">
          Chillington Bites homepage
        </Link>
      </p>
    </div>
  );
}
