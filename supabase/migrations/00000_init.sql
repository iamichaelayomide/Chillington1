-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  variants jsonb not null default '[]'::jsonb,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Extras Table
create table public.extras (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  is_active boolean default true
);

-- Orders Table
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  items jsonb not null default '[]'::jsonb,
  total numeric not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  status text not null default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Promotions Table
create table public.promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  is_active boolean default false
);

-- Row Level Security (RLS) Policies

-- Products: Everyone can read, only authenticated can write
alter table public.products enable row level security;
create policy "Products are viewable by everyone." on public.products for select using (true);
create policy "Products are editable by admins." on public.products for all using (auth.role() = 'authenticated');

-- Extras: Everyone can read, only authenticated can write
alter table public.extras enable row level security;
create policy "Extras are viewable by everyone." on public.extras for select using (true);
create policy "Extras are editable by admins." on public.extras for all using (auth.role() = 'authenticated');

-- Promotions: Everyone can read, only authenticated can write
alter table public.promotions enable row level security;
create policy "Promotions are viewable by everyone." on public.promotions for select using (true);
create policy "Promotions are editable by admins." on public.promotions for all using (auth.role() = 'authenticated');

-- Orders: Everyone can insert (checkout), only authenticated can read/update
alter table public.orders enable row level security;
create policy "Anyone can create an order." on public.orders for insert with check (true);
create policy "Orders are viewable by admins." on public.orders for select using (auth.role() = 'authenticated');
create policy "Orders are editable by admins." on public.orders for update using (auth.role() = 'authenticated');
create policy "Orders are deletable by admins." on public.orders for delete using (auth.role() = 'authenticated');
