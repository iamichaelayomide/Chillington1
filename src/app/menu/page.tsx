import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

export default async function MenuPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  const { data: extras } = await supabase
    .from('extras')
    .select('*')
    .eq('is_active', true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-xl text-gray-600">Explore our delicious range of hot shawarmas.</p>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-2xl font-bold mb-2">Menu is empty right now.</p>
          <p>Please run the seed script to populate data or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} extras={extras || []} />
          ))}
        </div>
      )}
    </div>
  );
}