'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus, Trash2, Send, ArrowLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Delivery address is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'review' | 'details'>('review');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset step to review whenever cart is opened
  useEffect(() => {
    if (isCartOpen) setStep('review');
  }, [isCartOpen]);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    try {
      const total = totalPrice();
      const orderData = {
        items: items,
        total: total,
        customer_name: data.name,
        phone: data.phone,
        address: data.address,
        status: 'Pending',
      };

      if (supabase) {
        await supabase.from('orders').insert([orderData]);
      }

      let msg = `*New Order - Chillington Bites* 🍔\n\n`;
      msg += `*Customer:* ${data.name}\n`;
      msg += `*Phone:* ${data.phone}\n\n`;
      msg += `*Order Items:*\n`;
      items.forEach(item => {
        msg += `- ${item.quantity}x ${item.product.name} (${item.size})\n`;
        if (item.extras.length > 0) {
          msg += `  + ${item.extras.map(e => e.name).join(', ')}\n`;
        }
      });
      msg += `\n*Total:* ₦${total.toLocaleString()}\n`;
      msg += `*Address:* ${data.address}`;

      const whatsappUrl = `https://wa.me/2347032891651?text=${encodeURIComponent(msg)}`;
      
      clearCart();
      window.location.href = whatsappUrl;
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] transition-opacity" onClick={() => setCartOpen(false)} />
      )}
      <div 
        className={`fixed inset-y-0 right-0 z-[201] w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-orange-50">
          <div className="flex items-center space-x-4">
            {step === 'details' && (
              <button onClick={() => setStep('review')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
            )}
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {step === 'review' ? 'My Bag' : 'Order Details'}
            </h2>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-3 bg-gray-100 hover:bg-orange-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6">
              <div className="text-7xl animate-float">🌭</div>
              <p className="font-black text-xl tracking-tight italic text-gray-900">Your bag is empty</p>
              <button onClick={() => setCartOpen(false)} className="text-orange-600 font-black uppercase tracking-[0.2em] text-xs hover:underline">
                Explore Menu
              </button>
            </div>
          ) : step === 'review' ? (
            /* STEP 1: REVIEW ITEMS */
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {items.map((item) => {
                const itemTotal = (item.price + item.extras.reduce((sum, e) => sum + Number(e.price), 0)) * item.quantity;
                return (
                  <div key={item.id} className="flex gap-6 pb-8 border-b border-orange-50/50 group">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">{item.product.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 italic">{item.size}</p>
                      {item.extras.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {item.extras.map(e => (
                            <span key={e.id} className="text-[10px] font-black text-orange-500 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                              + {e.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100 shadow-sm">
                          <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Minus className="w-4 h-4 stroke-[3]" />
                          </button>
                          <span className="font-black text-xl text-gray-900 w-4 text-center italic">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-gray-900 transition-colors">
                            <Plus className="w-4 h-4 stroke-[3]" />
                          </button>
                        </div>
                        <span className="text-2xl font-black text-gray-900 italic tracking-tighter">₦{itemTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* STEP 2: ENTER DETAILS */
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Step 2 of 2</p>
                <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">Enter Delivery Details</h3>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} id="checkout-form" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                  <input 
                    {...register('name')} 
                    placeholder="e.g. John Doe" 
                    className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none text-sm font-bold shadow-inner transition-all" 
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-black uppercase ml-6">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">WhatsApp Number</label>
                  <input 
                    {...register('phone')} 
                    placeholder="0800 000 0000" 
                    className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none text-sm font-bold shadow-inner transition-all" 
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-black uppercase ml-6">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Delivery Address</label>
                  <textarea 
                    {...register('address')} 
                    placeholder="Enter your full address in Akure..." 
                    rows={3}
                    className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none text-sm font-bold shadow-inner transition-all resize-none" 
                  />
                  {errors.address && <p className="text-[10px] text-red-500 font-black uppercase ml-6">{errors.address.message}</p>}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Action Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t bg-gray-50/50 space-y-6">
            <div className="flex justify-between items-center px-4">
              <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Grand Total</span>
              <span className="text-4xl font-black text-gray-900 italic tracking-tighter">₦{totalPrice().toLocaleString()}</span>
            </div>

            {step === 'review' ? (
              <button 
                onClick={() => setStep('details')}
                className="w-full py-6 px-8 bg-gray-900 hover:bg-orange-600 text-white rounded-[2.5rem] font-black text-xl transition-all shadow-2xl flex items-center justify-center group"
              >
                <span>Proceed to Order</span>
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-6 px-8 bg-green-600 hover:bg-green-700 text-white rounded-[2.5rem] font-black text-xl transition-all shadow-xl shadow-green-100 active:scale-95 flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-6 h-6 mr-3 stroke-[3]" /> Send to WhatsApp
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
