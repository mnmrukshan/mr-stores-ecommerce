import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-[#050505] text-[#b3b3b3] text-[9px] md:text-[10px] tracking-[0.3em] uppercase py-[10px] flex overflow-hidden relative">
      <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap items-center hover:pause-animation">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
             <span className="mx-8 text-white/40">✦</span>
             <span className="hover:text-white transition-colors cursor-pointer">Enjoy Free Shipping on Orders Over Rs.15000</span>
             <span className="mx-8 text-white/40">✦</span>
             <span className="hover:text-white transition-colors cursor-pointer">New Arrivals: Premium Denim</span>
             <span className="mx-8 text-white/40">✦</span>
             <span className="hover:text-white transition-colors cursor-pointer">Sign up and get 15% off your first order</span>
          </div>
        ))}
      </div>
      <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TopBar;
