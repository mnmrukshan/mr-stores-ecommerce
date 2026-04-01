import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-[#888]">
        
        {/* Newsletter Section */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest mb-4">Newsletter</h4>
          <p className="mb-6 leading-relaxed">Sign up to our newsletter to receive exclusive offers on new arrivals and discounts.</p>
          <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="E-mail address" 
              className="bg-transparent border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
            <button className="primary-btn w-fit px-8">Subscribe</button>
          </form>
          <div className="flex space-x-6 mt-8">
            <span className="cursor-pointer hover:text-white transition-colors">FB</span>
            <span className="cursor-pointer hover:text-white transition-colors">IG</span>
            <span className="cursor-pointer hover:text-white transition-colors">TW</span>
            <span className="cursor-pointer hover:text-white transition-colors">IN</span>
          </div>
        </div>

        {/* Logo & Contact Section */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo SVG */}
          <svg width="120" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <path d="M20 60 L20 20 L50 40 L80 20 L80 60" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M50 40 L50 80" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-2xl font-bold tracking-widest text-white uppercase mb-2">MR Stores</h2>
          <p className="tracking-widest text-[10px] uppercase mb-6 text-[#555]">Boys Premium Collection</p>
          
          <div className="text-xs space-y-2 mt-4">
            <p>Mohamed Rukshan</p>
            <p>Sri Lanka</p>
            <p>mnmrukshan@gmail.com</p>
            <p>0760752854</p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="md:text-right">
          <h4 className="text-white font-semibold uppercase tracking-widest mb-4">Quick Links</h4>
          <ul className="space-y-3 flex flex-col items-start md:items-end">
            <li className="cursor-pointer hover:text-white transition-colors">Privacy Policy</li>
            <li className="cursor-pointer hover:text-white transition-colors">Terms of Sale</li>
            <li className="cursor-pointer hover:text-white transition-colors">Returns & Exchanges</li>
            <li className="cursor-pointer hover:text-white transition-colors">Shipping & Delivery</li>
            <li className="cursor-pointer hover:text-white transition-colors">Contact Us</li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div className="border-t border-[#222] px-6 py-6 text-center md:text-left text-xs text-[#555] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2026 MR STORES COPYRIGHT - MOHAMED RUKSHAN</p>
      </div>
    </footer>
  );
};

export default Footer;
