'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from('orders').update({ status }).eq('id', id);
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b">
              <tr>
                <th className="p-4 font-medium">Order ID / Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-xs text-gray-500 mb-1">{order.id?.substring(0, 8)}...</p>
                    <p className="text-sm">{new Date(order.created_at || '').toLocaleDateString()}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{order.customer_name}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                    <p className="text-sm text-gray-500 max-w-[200px] truncate" title={order.address}>{order.address}</p>
                  </td>
                  <td className="p-4 text-sm max-w-[200px]">
                    <div className="space-y-1">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold">₦{Number(order.total).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id!, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg p-2 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}