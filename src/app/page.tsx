'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { Product, Extra } from '@/types';
import { Flame, ChefHat, Tag, Sparkles, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const CATEGORIES = ['Premium Treat', 'Combo Treats', 'Classic Treats', 'Extras'];

const OFFICIAL_MENU: Product[] = [
  // PREMIUM TREATS (Real Images for Appetite)
  { id: 'p1', name: 'Chicken Shawarma', category: 'Premium Treat', variants: [{size: 'Regular', price: 2900}, {size: 'Special', price: 3500}, {size: 'Jumbo', price: 3700}], image_url: 'https://images.unsplash.com/photo-1648937000288-0ea18ff944ff?w=800&q=80', is_available: true },
  { id: 'p2', name: 'Beef Shawarma', category: 'Premium Treat', variants: [{size: 'Regular', price: 2800}, {size: 'Special', price: 3200}, {size: 'Jumbo', price: 3700}], image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80', is_available: true },
  { id: 'p3', name: 'Suya Shawarma', category: 'Premium Treat', variants: [{size: 'Regular', price: 2900}, {size: 'Special', price: 3400}, {size: 'Jumbo', price: 3900}], image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', is_available: true },
  { id: 'p4', name: 'Goat Shawarma', category: 'Premium Treat', variants: [{size: 'Regular', price: 3200}, {size: 'Special', price: 3600}, {size: 'Jumbo', price: 3900}], image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80', is_available: true },
  { id: 'p5', name: 'Turkey Shawarma', category: 'Premium Treat', variants: [{size: 'Regular', price: 3900}, {size: 'Special', price: 4300}, {size: 'Jumbo', price: 4800}], image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80', is_available: true },
  
  // COMBO TREATS
  { id: 'c1', name: "Chicken 'n Beef", category: 'Combo Treats', variants: [{size: 'Regular', price: 3200}, {size: 'Jumbo', price: 4700}], image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80', is_available: true },
  { id: 'c2', name: "Suya 'n Beef", category: 'Combo Treats', variants: [{size: 'Regular', price: 3400}, {size: 'Jumbo', price: 4900}], image_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80', is_available: true },
  
  // CLASSIC TREATS
  { id: 'cl1', name: 'Lingtonsaur Wrap', category: 'Classic Treats', variants: [{size: 'Classic', price: 8900}], image_url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80', is_available: true },
];

const OFFICIAL_EXTRAS: Extra[] = [
  { id: 'e1', name: 'Extra Meat Protein', price: 500, is_active: true },
  { id: 'e2', name: 'Extra Sausage', price: 400, is_active: true },
];

export default function SinglePageOrdering() {
  const [products, setProducts] = useState<Product[]>(OFFICIAL_MENU);
  const [extras, setExtras] = useState<Extra[]>(OFFICIAL_EXTRAS);
  const [activeCategory, setActiveCategory] = useState('Premium Treat');
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: pRes } = await supabase.from('products').select('*').eq('is_available', true);
        const { data: eRes } = await supabase.from('extras').select('*').eq('is_active', true);
        if (pRes && pRes.length > 0) setProducts(pRes);
        if (eRes && eRes.length > 0) setExtras(eRes);
      } catch (err) {}
    }
    fetchData();
  }, []);

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const element = categoryRefs.current[cat];
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FFF7ED] min-h-screen">
      <HeroSection />

      {/* FIXED CATEGORY BAR */}
      <div className="sticky top-20 z-[100] bg-white border-b border-orange-100 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex overflow-x-auto no-scrollbar space-x-4 items-center">
            <div className="flex items-center space-x-2 text-gray-400 mr-4 border-r border-orange-50 pr-6 hidden sm:flex">
              <ChefHat className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Kitchen</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`relative px-8 py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-[0.15em] whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-xl scale-105 shadow-orange-900/10' 
                    : 'bg-orange-50 text-gray-500 hover:text-orange-600 hover:bg-white border border-transparent hover:border-orange-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-20" id="menu">
        <div className="flex flex-col space-y-32">
          {CATEGORIES.map((cat) => {
            const catProducts = products.filter(p => p.category === cat);
            if (catProducts.length === 0) return null;

            return (
              <div key={cat} ref={el => categoryRefs.current[cat] = el} className="scroll-mt-40">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-4 border-orange-600 pb-10">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-orange-200">
                      {cat === 'Combo Treats' ? <Tag className="w-10 h-10" /> : <Flame className="w-10 h-10" />}
                    </div>
                    <div>
                      <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter italic leading-none">{cat}</h2>
                      <div className="flex items-center space-x-3 mt-4">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <p className="text-orange-600 font-black text-sm uppercase tracking-[0.3em]">Premium Local Favorite</p>
                      </div>
                    </div>
                  </div>
                  {cat === 'Combo Treats' && (
                    <div className="bg-green-600 text-white px-8 py-4 rounded-[2rem] font-black text-lg shadow-xl animate-float" id="deals">
                      Best Value Deals 🔥
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
                  {catProducts.map((product, idx) => (
                    <div key={product.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${idx * 100}ms` }}>
                      <ProductCard product={product} extras={extras} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-20 text-center flex flex-col items-center justify-center space-y-6">
        <Sparkles className="w-16 h-16 text-orange-200 animate-pulse" />
        <p className="text-gray-400 font-black italic text-xl uppercase tracking-widest">Always Fresh • Always Hot • Chillington Bites</p>
      </div>
    </div>
  );
}
