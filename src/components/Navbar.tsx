'use client';

import { ShoppingBasket, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, setCartOpen } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-white/80 backdrop-blur-xl border-b border-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <NextLink href="/" className="flex-shrink-0 flex items-center group">
              <span className="text-3xl font-black text-gray-950 tracking-tighter italic">CHILLINGTON<span className="text-orange-600 group-hover:text-green-600 transition-colors">BITES</span></span>
            </NextLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <NextLink href="/#menu" className="text-sm font-black uppercase tracking-widest text-gray-500 hover:text-orange-600 transition-colors">Menu</NextLink>
            <NextLink href="/deals" className="text-sm font-black uppercase tracking-widest text-gray-500 hover:text-orange-600 transition-colors">Deals</NextLink>
            
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-3 bg-gray-950 text-white rounded-2xl hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-gray-200"
            >
              <ShoppingBasket className="h-6 w-6 stroke-[2.5]" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-[10px] font-black leading-none text-white transform bg-orange-500 rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {totalItems()}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center md:hidden space-x-4">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-3 bg-gray-950 text-white rounded-xl active:scale-95 transition-all"
            >
              <ShoppingBasket className="h-6 w-6 stroke-[2.5]" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-[10px] font-black leading-none text-white transform bg-orange-500 rounded-full border-2 border-white">
                  {totalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-50 animate-in slide-in-from-top duration-300">
          <div className="px-6 pt-4 pb-10 space-y-4 text-center">
            <NextLink href="/#menu" className="block text-2xl font-black text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Menu</NextLink>
            <NextLink href="/deals" className="block text-2xl font-black text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Deals</NextLink>
          </div>
        </div>
      )}
    </nav>
  );
}
