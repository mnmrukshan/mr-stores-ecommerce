import React from 'react';

const About = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center animate-fade-in">
      <h1 className="text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg mb-8">About MR Stores</h1>
      <div className="glass-dark p-8 md:p-12 rounded-2xl border border-white/10 text-[#aaa] space-y-6 leading-relaxed">
        <p className="text-lg">
          Welcome to MR Stores, your premier destination for exceptional boys' apparel. We believe that style starts early.
        </p>
        <p>
          Founded with a passion for quality materials and modern design aesthetics, MR Stores bridges the gap between classic tailoring and contemporary fashion. From our tailored shirts to our relaxed tees, premium jeans, crafted shorts, and warm sweaters, every piece in our collection is curated with the utmost care.
        </p>
        <p>
          Our mission is to provide an elite, seamless shopping experience. Thank you for choosing MR Stores.
        </p>
      </div>
    </div>
  );
};

export default About;
