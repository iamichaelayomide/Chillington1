'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await supabase.from('products').update({ is_available: !currentStatus }).eq('id', id);
      setProducts(products.map(p => p.id === id ? { ...p, is_available: !currentStatus } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors" onClick={() => alert('Add Product Modal/Page to be implemented.')}>
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Variants (Starting Price)</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const startingPrice = Math.min(...product.variants.map((v) => v.price));
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-4 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                      </div>
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{product.category}</td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600">{product.variants.length} options</p>
                      <p className="font-bold">₦{startingPrice.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleAvailability(product.id, product.is_available)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          product.is_available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {product.is_available ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" onClick={() => alert('Edit Product Modal/Page to be implemented.')}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}