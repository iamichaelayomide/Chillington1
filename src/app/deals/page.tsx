'use client';

import { useCartStore } from '@/store/cartStore';
import { Flame, Clock, Sparkles, ChevronRight, Tag, X, Minus, Plus, Send, Info } from 'lucide-react';
import { useState } from 'react';

const DEALS = [
  {
    id: 'd1',
    title: 'Turkey Thursday',
    description: 'Buy 1 Turkey Shawarma & Get 1 Free Drink.',
    validity: 'Valid for Special & Jumbo Size every Thursday',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80',
    status: 'Ongoing',
    originalPrice: 4800, // Turkey Jumbo (3700) + Drink (1100 approx value)
    dealPrice: 3700,
    discount: '23%',
    package: { 
      name: 'Turkey Thursday Deal', 
      items: ['1x Turkey Shawarma (Jumbo)', '1x Cold 7up/Pepsi'],
      price: 3700, 
      size: 'Jumbo', 
      product: { id: 'p5', name: 'Turkey Shawarma' } 
    }
  },
  {
    id: 'd2',
    title: 'Eid Special Deal',
    description: 'Buy 1 Goat or Lamb Shawarma & Get 1 Free Drink.',
    validity: 'Coming Soon: 6th - 9th June, 2025',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    status: 'Coming Soon',
    date: 'June 06, 2025'
  },
  {
    id: 'd3',
    title: 'Independence Day',
    description: 'Buy 1 Shawarma Get 1 Free Drink.',
    validity: 'Valid for Special & Jumbo Size',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    status: 'Coming Soon',
    date: 'Oct 01, 2025'
  },
];

export default function DealsPage() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  const handleClaimDeal = () => {
    addItem({
      id: Math.random().toString(36).substring(7),
      product: selectedDeal.package.product,
      size: `${selectedDeal.package.size} (DEAL)`,
      price: selectedDeal.package.price,
      quantity: quantity,
      extras: [{ id: 'free-drink', name: 'Free Drink (Deal Content)', price: 0, is_active: true }],
    });
    setSelectedDeal(null);
    setCartOpen(true); // Open bag to enter details
  };

  return (
    <div className="bg-[#FFF7ED] min-h-screen pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b-8 border-orange-600 pb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4 text-orange-600">
              <Flame className="w-6 h-6 fill-orange-600" />
              <span className="font-black uppercase tracking-[0.4em] text-xs">Hot Specials</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter italic leading-none">DEALS.</h1>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-500 max-w-sm italic tracking-tight">The biggest shawarma packages in Akure, for the best prices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {DEALS.map((deal) => (
            <div key={deal.id} className={`group relative bg-white rounded-[3rem] overflow-hidden border-2 transition-all duration-500 ${deal.status === 'Ongoing' ? 'border-orange-100 hover:border-orange-500 shadow-xl' : 'border-gray-100 grayscale opacity-80'}`}>
              <div className="relative h-80 overflow-hidden">
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 flex space-x-2">
                  <span className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg ${deal.status === 'Ongoing' ? 'bg-orange-600 text-white animate-bounce' : 'bg-gray-900 text-white'}`}>
                    {deal.status}
                  </span>
                  {deal.discount && (
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">Save {deal.discount}</span>
                  )}
                </div>
              </div>

              <div className="p-10">
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic mb-4">{deal.title}</h3>
                <p className="text-lg font-bold text-gray-600 leading-tight mb-8">{deal.description}</p>
                
                {deal.status === 'Ongoing' ? (
                  <button 
                    onClick={() => { setSelectedDeal(deal); setQuantity(1); }}
                    className="w-full py-6 px-8 bg-gray-900 hover:bg-orange-600 text-white rounded-[2rem] font-black text-xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-between group/btn"
                  >
                    <span>View Deal Package</span>
                    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="w-full py-6 px-8 bg-gray-100 text-gray-400 rounded-[2rem] font-black text-xl text-center italic">Coming Soon</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEAL PACKAGE MODAL */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col">
            <div className="relative h-64 sm:h-72 bg-orange-600 flex-shrink-0">
              <img src={selectedDeal.image} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <button onClick={() => setSelectedDeal(null)} className="absolute top-8 right-8 p-4 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all">
                <X className="w-6 h-6 stroke-[3]" />
              </button>
              <div className="absolute bottom-8 left-10">
                <span className="bg-green-600 text-white px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 inline-block">Active Package</span>
                <h2 className="text-5xl font-black text-gray-950 tracking-tighter italic leading-none">{selectedDeal.title}</h2>
              </div>
            </div>

            <div className="p-10 sm:p-12">
              <div className="flex items-center space-x-2 text-orange-600 mb-8 bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-black uppercase tracking-widest leading-relaxed">This package is fixed and cannot be modified.</p>
              </div>

              <div className="space-y-6 mb-12">
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">What's Inside</h4>
                <ul className="space-y-4">
                  {selectedDeal.package.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center space-x-4 text-xl font-black text-gray-900 italic">
                      <div className="w-3 h-3 bg-orange-600 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-12 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Savings Math</p>
                    <p className="text-sm font-bold text-gray-600 line-through leading-none mb-1">Original: ₦{selectedDeal.originalPrice.toLocaleString()}</p>
                    <p className="text-2xl font-black text-orange-600 italic tracking-tighter">Deal: ₦{selectedDeal.dealPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">-{selectedDeal.discount} OFF</span>
                  </div>
                </div>
                
                <div className="h-px bg-gray-200 mb-6" />

                <div className="flex items-center justify-between">
                  <span className="font-black text-gray-900 uppercase tracking-widest text-xs">How many?</span>
                  <div className="flex items-center space-x-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-600 hover:text-white transition-all text-gray-400"
                    >
                      <Minus className="w-6 h-6 stroke-[3]" />
                    </button>
                    <span className="text-2xl font-black text-gray-900 w-6 text-center italic leading-none">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(5, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-600 hover:text-white transition-all text-gray-400"
                    >
                      <Plus className="w-6 h-6 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleClaimDeal}
                className="w-full py-7 bg-gray-900 hover:bg-orange-600 text-white rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl flex items-center justify-center group"
              >
                <span>Add Deal to Bag</span>
                <ChevronRight className="w-8 h-8 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6">Cap: 5 packages per order</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
