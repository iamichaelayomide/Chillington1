'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          supabase.from('orders').select('total'),
          supabase.from('products').select('id', { count: 'exact' })
        ]);

        const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
        const totalOrders = ordersRes.data?.length || 0;
        const totalProducts = productsRes.count || 0;

        setStats({ orders: totalOrders, revenue: totalRevenue, products: totalProducts });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div className="text-gray-500">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-full">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-bold">{stats.orders}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold">₦{stats.revenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Products</p>
            <p className="text-2xl font-bold">{stats.products}</p>
          </div>
        </div>
      </div>
    </div>
  );
}