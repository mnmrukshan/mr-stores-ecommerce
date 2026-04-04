import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <img 
        src="/hero_banner.png" 
        alt="Three stylish boys in urban fashion"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,1)] via-[rgba(18,18,18,0.2)] to-transparent z-10"></div>
      
      {/* Breadcrumb - Absolute positioned like reference image */}
      <div className="absolute top-8 left-6 md:left-12 z-20 text-[10px] uppercase font-bold tracking-[0.2em] text-[#bbb]">
        <span className="cursor-pointer hover:text-white transition-colors">HOME</span> 
        <span className="mx-2 text-[#666]">/</span> 
        <span className="cursor-pointer hover:text-white transition-colors">SHOP</span> 
        <span className="mx-2 text-[#666]">/</span> 
        <span className="text-white">BOYS CLOTHING</span>
      </div>

      {/* Main Center Content */}
      <div className="relative z-20 text-center flex flex-col items-center px-4 w-full h-full justify-center pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-2xl">
          Boys Clothing
        </h1>
        <p className="mt-6 text-[#aaaaaa] text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed">
          Discover a premium collection of fine apparel for young gentlemen. Uncompromising style, quality, and sophistication.
        </p>
      </div>
    </section>
  );
};

export default Hero;
