export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Chillington<span className="text-green-500">Bites</span></h3>
            <p className="text-gray-400">Hot Shawarma. Fast Delivery in Akure. Experience the best street food from the comfort of your home.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Akure, Nigeria</li>
              <li>📞 +234 800 000 0000</li>
              <li>✉️ hello@chillingtonbites.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Chillington Bites. All rights reserved.
        </div>
      </div>
    </footer>
  );
}