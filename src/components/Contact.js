import React from 'react';

const Contact = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-24 flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg mb-8">Contact Us</h1>
      <div className="w-full glass-dark p-8 md:p-12 rounded-2xl border border-white/10">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase text-[#888]">First Name</label>
              <input type="text" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2" placeholder="John" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase text-[#888]">Last Name</label>
              <input type="text" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2" placeholder="Doe" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs tracking-[0.2em] uppercase text-[#888]">Email Address</label>
            <input type="email" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2" placeholder="john@example.com" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs tracking-[0.2em] uppercase text-[#888]">Message</label>
            <textarea rows="4" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2 resize-none" placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" className="w-full mt-6 border border-[#fff]/30 text-white hover:bg-white hover:text-black transition-all duration-300 py-3 tracking-[0.2em] text-xs font-semibold uppercase">
            Send Message
          </button>
        </form>
      </div>
      
      <div className="mt-12 text-center text-[#888] text-sm tracking-widest space-y-2">
        <p>Email: support@mrstores.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default Contact;
