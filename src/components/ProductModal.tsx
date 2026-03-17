'use client';

import { Product, Extra } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { X, Plus, Minus, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  extras: Extra[];
}

export default function ProductModal({ isOpen, onClose, product, extras }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedVariant(product.variants[0]);
      setSelectedExtras([]);
      setQuantity(1);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, product.variants]);

  if (!isOpen) return null;

  const handleAddExtra = (extra: Extra) => {
    if (selectedExtras.find(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + Number(e.price), 0);
  const total = (selectedVariant.price + extrasTotal) * quantity;

  const handleAddToCart = () => {
    addItem({
      id: Math.random().toString(36).substring(7),
      product,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity,
      extras: selectedExtras,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-500">
      <div className="bg-[#FFF7ED] rounded-t-[3rem] md:rounded-[4rem] w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-20 duration-700">
        
        {/* Visual Header */}
        <div className="relative h-72 md:h-80 bg-orange-100 flex-shrink-0">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-orange-200 bg-orange-50">
              <span className="font-black text-6xl italic tracking-tighter opacity-20">CHILL</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7ED] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-md hover:bg-white text-gray-900 rounded-3xl transition-all shadow-xl">
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
        
        <div className="px-8 md:px-12 pb-12 overflow-y-auto flex-1 no-scrollbar -mt-12 relative z-10">
          <div className="mb-10 text-center">
            <p className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-3">{product.category}</p>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter italic">{product.name}</h2>
          </div>

          {/* Size Selection */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select Size</h3>
              <div className="h-px flex-1 bg-orange-100 ml-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {product.variants.map((variant, idx) => {
                const isSelected = selectedVariant.size === variant.size;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-2 transition-all duration-500 group ${
                      isSelected 
                        ? 'border-gray-900 bg-gray-900 text-white scale-105 shadow-2xl' 
                        : 'border-orange-100 bg-white text-gray-900 hover:border-orange-400'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-orange-400' : 'text-gray-400'}`}>
                      {variant.size === 'Regular' ? 'Classic' : variant.size === 'Special' ? 'Loaded' : 'Feast'}
                    </span>
                    <span className="text-lg font-black italic mb-2 tracking-tight">{variant.size}</span>
                    <span className={`font-bold text-sm ${isSelected ? 'text-white/80' : 'text-orange-600'}`}>₦{variant.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extras Selection */}
          {extras.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Add On Extras</h3>
                <div className="h-px flex-1 bg-orange-100 ml-6" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extras.map((extra) => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button 
                      key={extra.id} 
                      onClick={() => handleAddExtra(extra)}
                      className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-green-600 bg-green-50/50' 
                          : 'border-orange-50 bg-white hover:border-orange-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-green-600 bg-green-600' : 'border-gray-200'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                        <span className="font-black text-gray-900 tracking-tight">{extra.name}</span>
                      </div>
                      <span className="text-orange-600 font-bold text-sm">₦{extra.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-8 md:p-12 border-t bg-white flex-shrink-0">
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-8">
            <div className="flex items-center space-x-8 bg-gray-50 p-2 rounded-[2rem] border border-gray-100">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-white shadow-sm hover:text-orange-600 transition-all text-gray-900">
                <Minus className="w-6 h-6 stroke-[3]" />
              </button>
              <span className="text-2xl font-black text-gray-900 w-6 text-center italic">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-white shadow-sm hover:text-orange-600 transition-all text-gray-900">
                <Plus className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 w-full flex items-center justify-between py-6 px-10 bg-gray-900 hover:bg-orange-600 text-white rounded-[2.5rem] font-black transition-all shadow-2xl hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-0.5">Total Amount</span>
                <span className="text-2xl italic tracking-tighter">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">Add to Bag</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
