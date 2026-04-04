import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center animate-fade-in">
      
      <div className="text-center mb-16 max-w-3xl">
        <h1 className="text-4xl lg:text-6xl font-light tracking-[0.25em] uppercase text-white drop-shadow-lg mb-6">About MR Stores</h1>
        <p className="text-[#888] tracking-widest text-sm leading-loose">
          Welcome to MR Stores, your premier destination for exceptional boys' apparel. We believe that style starts early and quality is paramount.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 w-full items-stretch">
        
        <div className="glass-dark p-10 md:p-14 rounded-2xl border border-white/10 flex flex-col justify-center h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffffff05] rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-700 group-hover:bg-[#ffffff0a]"></div>
          <h2 className="text-xl font-light text-white uppercase tracking-[0.2em] mb-6">Our Heritage</h2>
          <p className="text-[#aaa] text-sm leading-relaxed mb-6">
            Founded with a passion for quality materials and modern design aesthetics, MR Stores bridges the gap between classic tailoring and contemporary fashion for boys. Every garment is meticulously designed to offer both comfort for active lifestyles and a polished look for special occasions.
          </p>
          <p className="text-[#aaa] text-sm leading-relaxed">
            From our tailored shirts to our relaxed tees, premium jeans, crafted bottoms, and warm sweaters, every piece in our collection is curated with the utmost care. We select only the finest fabrics to ensure durability and style go hand-in-hand.
          </p>
        </div>

        <div className="flex flex-col space-y-8 lg:space-y-16">
          <div className="glass-dark p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden flex items-start space-x-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex flex-shrink-0 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-3">Uncompromising Quality</h3>
              <p className="text-[#888] text-xs leading-relaxed">We source premium materials globally to ensure our apparel stands the test of time, wash after wash.</p>
            </div>
          </div>

          <div className="glass-dark p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden flex items-start space-x-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex flex-shrink-0 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
               <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-3">Modern Aesthetics</h3>
               <p className="text-[#888] text-xs leading-relaxed">Our designs reflect cutting-edge fashion trends while maintaining a timeless elegance suitable for any event.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
