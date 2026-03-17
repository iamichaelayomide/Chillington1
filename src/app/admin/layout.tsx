'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, ListOrdered, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (!mounted) return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-50 z-50 fixed inset-0">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <NextLink href="/">
            <h2 className="text-2xl font-bold text-orange-500 cursor-pointer">Admin<span className="text-white">Panel</span></h2>
          </NextLink>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NextLink href="/admin" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-gray-800 text-orange-500' : 'hover:bg-gray-800'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NextLink>
          <NextLink href="/admin/orders" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === '/admin/orders' ? 'bg-gray-800 text-orange-500' : 'hover:bg-gray-800'}`}>
            <ListOrdered className="w-5 h-5" />
            <span>Orders</span>
          </NextLink>
          <NextLink href="/admin/products" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === '/admin/products' ? 'bg-gray-800 text-orange-500' : 'hover:bg-gray-800'}`}>
            <ShoppingBag className="w-5 h-5" />
            <span>Products</span>
          </NextLink>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-gray-800 transition-colors text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 text-black">
        {children}
      </main>
    </div>
  );
}