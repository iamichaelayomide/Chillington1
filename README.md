# Chillington Bites - Shawarma Ordering Website

A modern, high-converting shawarma ordering website for Chillington Bites in Akure. Built with Next.js App Router, Tailwind CSS, Zustand, and Supabase.

## Features
- **Fast Menu Browsing:** Mobile-first design for quick ordering.
- **WhatsApp Checkout:** Seamless checkout flow that formats orders and redirects to WhatsApp.
- **Admin Dashboard:** Manage products, track orders, and view stats.
- **Cart Management:** Persistent shopping cart using Zustand.

## Tech Stack
- Next.js (App Router)
- React & TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Zustand (State Management)
- React Hook Form & Zod (Validation)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Check the `.env.local` file in the root directory and add your real Supabase credentials and WhatsApp number:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=2348000000000
```

### 3. Database Setup (Supabase)
1. Go to your Supabase project dashboard.
2. Open the SQL Editor.
3. Copy the contents of `supabase/migrations/00000_init.sql` and run it to create the necessary tables and RLS policies.

### 4. Seed Data
To populate the database with realistic menu items:
```bash
node scripts/seed.js
```
*(Ensure your `.env.local` has valid Supabase credentials before running the seed script.)*

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access
- **URL:** `/admin`
- **Password:** `admin123` (Hardcoded for demo purposes)
