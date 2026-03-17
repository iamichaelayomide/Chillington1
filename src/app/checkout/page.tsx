'use client';

import { useCartStore } from '@/store/cartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

const checkoutSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Delivery address is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    try {
      // Save order to Supabase
      const total = totalPrice();
      const orderData = {
        items: items,
        total: total,
        customer_name: data.customer_name,
        phone: data.phone,
        address: data.address,
        status: 'Pending',
      };

      const { error } = await supabase.from('orders').insert([orderData]);

      if (error) {
        console.error('Error saving order:', error);
      }

      // Generate WhatsApp message
      let message = `*New Order - Chillington Bites* 🍔\n\n`;
      message += `*Customer:* ${data.customer_name}\n`;
      message += `*Phone:* ${data.phone}\n`;
      message += `*Address:* ${data.address}\n\n`;
      message += `*Order Details:*\n`;

      items.forEach(item => {
        message += `- ${item.quantity}x ${item.product.name} (${item.size})\n`;
        if (item.extras.length > 0) {
          message += `  Extras: ${item.extras.map(e => e.name).join(', ')}\n`;
        }
      });

      message += `\n*Total:* ₦${total.toLocaleString()}`;

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348000000000';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      clearCart();
      window.location.href = whatsappUrl;
      
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious shawarma to your cart to checkout.</p>
        <NextLink href="/menu" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition">
          Browse Menu
        </NextLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NextLink href="/menu" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-8 font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
      </NextLink>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout Details</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                {...register('customer_name')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="John Doe"
              />
              {errors.customer_name && <p className="mt-1 text-sm text-red-600">{errors.customer_name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="0800 000 0000"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <textarea 
                {...register('address')}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                placeholder="Enter your full delivery address in Akure..."
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Processing...
                </>
              ) : (
                'Place Order via WhatsApp'
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">You will be redirected to WhatsApp to complete your payment and order.</p>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm border-b border-gray-200 pb-4">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-gray-900">{item.quantity}x {item.product.name}</p>
                    <p className="text-gray-500 text-xs">Size: {item.size}</p>
                    {item.extras.length > 0 && (
                      <p className="text-gray-500 text-xs">Extras: {item.extras.map(e => e.name).join(', ')}</p>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 whitespace-nowrap">
                    ₦{((item.price + item.extras.reduce((s,e) => s+Number(e.price), 0)) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span className="text-orange-600">₦{totalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}