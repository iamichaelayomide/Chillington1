# Chillington Bites

Production-ready single-page shawarma ordering app for Chillington Bites, Akure. Built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, Zod, React Hook Form and Zustand.

## Features

- Single-page mobile-first ordering flow
- Category tabs, product modal, size and extra customization
- Persistent cart with localStorage
- WhatsApp checkout with dynamic order message
- Optional order saving to Supabase
- Protected admin dashboard for products, extras, promotions and orders
- Supabase Storage image uploads for product images

## Admin credentials

- Email: `admin@chillingtonbites.com`
- Password: `ChillingtonBites2026!`

Create the auth user after configuring Supabase:

```bash
node scripts/create-admin.mjs
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](/C:/Users/DELL/chillington-bites/supabase/schema.sql).
3. Run [`supabase/seed.sql`](/C:/Users/DELL/chillington-bites/supabase/seed.sql).
4. Add environment variables to `.env.local`.
5. Run `node scripts/create-admin.mjs`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` customer ordering experience
- `/admin/login` protected login
- `/admin/products`
- `/admin/orders`
- `/admin/extras`
- `/admin/promotions`

## Notes

- If Supabase is not configured, the homepage falls back to seeded local menu data so the frontend still renders.
- Admin pages and persistent database writes require Supabase configuration.
- Product image uploads write to the `product-images` storage bucket defined in the schema.
- The default WhatsApp checkout target is `07032891651`, stored in international format as `2347032891651`.
