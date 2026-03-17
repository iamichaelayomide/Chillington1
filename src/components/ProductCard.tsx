'use client';

import { Product } from '@/types';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { Plus, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  extras: any[];
}

export default function ProductCard({ product, extras }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startingPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-white rounded-[2.5rem] p-4 shadow-xl shadow-orange-900/5 hover:shadow-2xl hover:shadow-orange-600/10 transition-all duration-500 cursor-pointer border border-orange-50/50 flex flex-col h-full"
      >
        {/* Animated Visual Element */}
        <div className="relative aspect-square mb-6 overflow-hidden rounded-[2rem] bg-orange-50">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-orange-200">
              <span className="font-black text-4xl italic tracking-tighter opacity-20">CHILL</span>
            </div>
          )}
          
          {/* Price Tag Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
              <span className="text-sm font-black text-gray-900">₦{startingPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors duration-500" />
        </div>

        <div className="px-2 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
          </div>
          
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
            {product.category}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center space-x-1 text-orange-600 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>Customize</span>
              <ArrowRight className="w-3 h-3" />
            </div>
            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-gray-200 group-hover:shadow-orange-200">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
        extras={extras}
      />
    </>
  );
}
