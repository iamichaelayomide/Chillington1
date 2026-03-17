'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 z-50 fixed inset-0">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-black">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter password (admin123)"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}