'use client';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80" 
          alt="Loaded Shawarma" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7ED] via-gray-900/60 to-gray-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-3 mb-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 animate-in fade-in slide-in-from-left duration-1000">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Now Delivering in Akure</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] mb-8 tracking-tighter italic animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            HOT <br />
            <span className="text-orange-600">SHW</span>ARMA.
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-sm leading-tight tracking-tight">
              Freshly grilled, heavily loaded, and delivered in <span className="text-white underline decoration-orange-600 underline-offset-8 italic">under 30 minutes.</span>
            </p>
            
            <button 
              onClick={() => document.getElementById('menu-start')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center justify-center px-12 py-8 bg-orange-600 text-white font-black text-2xl rounded-[2.5rem] transition-all shadow-2xl shadow-orange-900/40 hover:bg-orange-500 hover:-translate-y-2 active:translate-y-0 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Start Your Order</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Branding */}
      <div className="absolute right-[-5%] bottom-[10%] opacity-10 select-none pointer-events-none hidden lg:block">
        <span className="text-[25rem] font-black italic tracking-tighter text-white">BITES</span>
      </div>

      <div id="menu-start" className="absolute bottom-0" />
    </section>
  );
}
