create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Chicken', 'Beef', 'Suya', 'Goat', 'Turkey', 'Shrimken', 'Lamb', 'Combos', 'Extras')),
  description text not null,
  variants jsonb not null,
  image_url text not null,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.extras (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price integer not null check (price > 0),
  is_active boolean not null default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total integer not null check (total > 0),
  customer_name text not null,
  phone text not null,
  address text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Preparing', 'Delivered')),
  created_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  is_active boolean not null default false
);

alter table public.products enable row level security;
alter table public.extras enable row level security;
alter table public.orders enable row level security;
alter table public.promotions enable row level security;

drop policy if exists "Public can read available products" on public.products;
create policy "Public can read available products"
on public.products for select
using (is_available = true);

drop policy if exists "Public can read active extras" on public.extras;
create policy "Public can read active extras"
on public.extras for select
using (is_active = true);

drop policy if exists "Public can read active promotions" on public.promotions;
create policy "Public can read active promotions"
on public.promotions for select
using (is_active = true);

drop policy if exists "Anyone can insert orders" on public.orders;
create policy "Anyone can insert orders"
on public.orders for insert
with check (true);

drop policy if exists "Authenticated admins manage products" on public.products;
create policy "Authenticated admins manage products"
on public.products for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated admins manage extras" on public.extras;
create policy "Authenticated admins manage extras"
on public.extras for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated admins manage promotions" on public.promotions;
create policy "Authenticated admins manage promotions"
on public.promotions for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated admins view orders" on public.orders;
create policy "Authenticated admins view orders"
on public.orders for select
using (auth.role() = 'authenticated');

drop policy if exists "Authenticated admins update orders" on public.orders;
create policy "Authenticated admins update orders"
on public.orders for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
on storage.objects for insert
with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
on storage.objects for update
using (bucket_id = 'product-images' and auth.role() = 'authenticated');
