const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
  console.log('Skipping real seed due to missing actual Supabase credentials.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  // PREMIUM TREATS
  { name: 'Beef Shawarma', category: 'Beef', variants: [{ size: 'Regular', price: 2800 }, { size: 'Special', price: 3200 }, { size: 'Jumbo', price: 3700 }], image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80' },
  { name: 'Chicken Shawarma', category: 'Chicken', variants: [{ size: 'Regular', price: 2900 }, { size: 'Special', price: 3500 }, { size: 'Jumbo', price: 3700 }], image_url: 'https://images.unsplash.com/photo-1648937000288-0ea18ff944ff?w=800&q=80' },
  { name: 'Suya Shawarma', category: 'Suya', variants: [{ size: 'Regular', price: 2900 }, { size: 'Special', price: 3400 }, { size: 'Jumbo', price: 3900 }], image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80' },
  { name: 'Goat Shawarma', category: 'Goat', variants: [{ size: 'Regular', price: 3200 }, { size: 'Special', price: 3600 }, { size: 'Jumbo', price: 3900 }], image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80' },
  { name: 'Turkey Shawarma', category: 'Turkey', variants: [{ size: 'Regular', price: 3900 }, { size: 'Special', price: 4300 }, { size: 'Jumbo', price: 4800 }], image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80' },
  { name: 'Shrimken Shawarma', category: 'Shrimken', variants: [{ size: 'Regular', price: 4800 }, { size: 'Special', price: 5300 }, { size: 'Jumbo', price: 5800 }], image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80' },
  { name: 'Lamb Shawarma', category: 'Lamb', variants: [{ size: 'Regular', price: 4000 }, { size: 'Special', price: 4700 }, { size: 'Jumbo', price: 5100 }], image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e184f?w=800&q=80' },

  // COMBO TREATS
  { name: "Chicken 'n Beef Shawarma", category: 'Combos', variants: [{ size: 'Regular', price: 3200 }, { size: 'Jumbo', price: 4700 }], image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80' },
  { name: "Suya 'n Beef Shawarma", category: 'Combos', variants: [{ size: 'Regular', price: 3400 }, { size: 'Jumbo', price: 4900 }], image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80' },
  { name: "Goat 'n Beef Shawarma", category: 'Combos', variants: [{ size: 'Regular', price: 3500 }, { size: 'Jumbo', price: 5000 }], image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80' },
];

const extras = [
  { name: 'Extra Sausage', price: 500, is_active: true },
  { name: 'Extra Spice', price: 300, is_active: true },
  { name: 'Extra Wrap', price: 400, is_active: true },
  { name: 'Cheese', price: 2000, is_active: true },
];

const promotions = [
  { title: 'Free Drink Fridays!', description: 'Get a free drink with any Jumbo Shawarma', is_active: true }
];

async function seed() {
  console.log('Cleaning existing data...');
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('extras').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('promotions').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Seeding products...');
  await supabase.from('products').insert(products);
  
  console.log('Seeding extras...');
  await supabase.from('extras').insert(extras);

  console.log('Seeding promotions...');
  await supabase.from('promotions').insert(promotions);
  
  console.log('Seed complete!');
}

seed().catch(console.error);
