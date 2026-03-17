'use client';

import { useCartStore } from '@/store/cartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { Loader2, Trash2, Plus, Minus, Send, MapPin, Phone, User } from 'lucide-react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Delivery address is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CartPanel() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      msg += `*Phone:* ${data.phone}\n`;
      msg += `*Address:* ${data.address}\n\n`;
      msg += `*Order Items:*\n`;

      items.forEach(item => {
        msg += `- ${item.quantity}x ${item.product.name} (${item.size})\n`;
        if (item.extras.length > 0) {
          msg += `  Extras: ${item.extras.map(e => e.name).join(', ')}\n`;
        }
      });

      msg += `\n*Total:* ₦${total.toLocaleString()}`;

      const whatsappUrl = `https://wa.me/2347032891651?text=${encodeURIComponent(msg)}`;
      
      clearCart();
      window.location.href = whatsappUrl;
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-orange-900/5 border border-orange-50/50 h-[calc(100vh-140px)] sticky top-28 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 animate-float">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 4v2m0 0l-1 1m1-1l1 1m-1-1h.01m-4.704 6.452l.8-1.602m-5.492 0l.8 1.602M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-black text-gray-900 tracking-tight">Your bag is empty</p>
          <p className="text-gray-400 font-medium text-sm max-w-[200px] mx-auto">Hungry? Add some loaded shawarma to your bag!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-900/10 border border-orange-50/50 h-[calc(100vh-140px)] sticky top-28 flex flex-col overflow-hidden">
      <div className="p-8 border-b border-orange-50/50 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Your Bag</h2>
          <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest">
            {items.reduce((s, i) => s + i.quantity, 0)} Items
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        {items.map((item) => {
          const itemTotal = (item.price + item.extras.reduce((s, e) => s + Number(e.price), 0)) * item.quantity;
          return (
            <div key={item.id} className="flex gap-4 group animate-in slide-in-from-right duration-500">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">{item.product.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-gray-200 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.size}</span>
                  {item.extras.length > 0 && <span className="text-gray-300">•</span>}
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                    {item.extras.map(e => e.name).join(', ')}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-gray-50 rounded-2xl p-1 space-x-3 border border-gray-100">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-orange-600 transition-all">
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <span className="text-sm font-black text-gray-900 w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-orange-600 transition-all">
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                  <span className="text-lg font-black text-gray-900">₦{itemTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-gray-50/50 border-t border-orange-50/50 flex-shrink-0">
        <form onSubmit={handleSubmit(onSubmit)} id="checkout-form" className="space-y-4 mb-8">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              {...register('name')}
              placeholder="Your Full Name"
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold shadow-sm"
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              {...register('phone')}
              placeholder="Phone Number"
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold shadow-sm"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
            <textarea 
              {...register('address')}
              placeholder="Delivery Address in Akure"
              rows={2}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold shadow-sm resize-none"
            />
          </div>
        </form>

        <div className="space-y-6 pt-4 border-t border-gray-200/50">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Grand Total</span>
            <span className="text-3xl font-black text-gray-900 italic tracking-tighter">₦{totalPrice().toLocaleString()}</span>
          </div>
          <button 
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-5 px-6 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black text-xl transition-all shadow-xl shadow-green-100 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:scale-[0.98]"
          >
            {isSubmitting ? <Loader2 className="w-7 h-7 animate-spin" /> : (
              <>
                <Send className="w-6 h-6 mr-3 stroke-[3]" /> Send Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
