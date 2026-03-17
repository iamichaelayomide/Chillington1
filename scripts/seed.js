const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars (naive approach for script)
const envPath = path.resolve(__dirname, '../.env.local');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
  });
}

// Just for dummy purposes since this is a local build for the user
if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
  console.log('Skipping real seed due to missing actual Supabase credentials. Seed script created successfully.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: 'Chicken Shawarma',
    category: 'Shawarma',
    image_url: 'https://images.unsplash.com/photo-1648937000288-0ea18ff944ff?w=800&q=80',
    is_available: true,
    variants: [
      { size: 'Regular', price: 2900 },
      { size: 'Special', price: 3500 },
      { size: 'Jumbo', price: 3700 }
    ]
  },
  {
    name: 'Beef Shawarma',
    category: 'Shawarma',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80',
    is_available: true,
    variants: [
      { size: 'Regular', price: 3000 },
      { size: 'Special', price: 3600 },
      { size: 'Jumbo', price: 3800 }
    ]
  },
  {
    name: 'Suya Shawarma',
    category: 'Shawarma',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    is_available: true,
    variants: [
      { size: 'Regular', price: 3200 },
      { size: 'Special', price: 3800 },
      { size: 'Jumbo', price: 4000 }
    ]
  }
];

const extras = [
  { name: 'Extra Sausage', price: 500, is_active: true },
  { name: 'Extra Cheese', price: 600, is_active: true },
  { name: 'Extra Chicken', price: 1000, is_active: true }
];

const promotions = [
  { title: 'Free Drink Fridays!', description: 'Get a free drink with any Jumbo Shawarma', is_active: true }
];

async function seed() {
  console.log('Seeding products...');
  for (const p of products) {
    await supabase.from('products').insert(p);
  }
  
  console.log('Seeding extras...');
  for (const e of extras) {
    await supabase.from('extras').insert(e);
  }

  console.log('Seeding promotions...');
  for (const p of promotions) {
    await supabase.from('promotions').insert(p);
  }
  
  console.log('Seed complete!');
}

seed().catch(console.error);
