import React from 'react';

const Navbar = ({ cartCount, setIsCartOpen, activeTab, setActiveTab, selectedCategory, setSelectedCategory }) => {
  return (
    <nav className="glass-header px-6 md:px-12 py-5 flex justify-between items-center w-full">
      {/* Logo Section */}
      <div 
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setActiveTab('home')}
      >
        <svg width="40" height="30" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 60 L20 20 L50 40 L80 20 L80 60" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M50 40 L50 80" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-3xl font-extrabold tracking-[0.2em] text-white uppercase">MR</span>
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-[#999] uppercase ml-1">Stores</span>
        </div>
      </div>

      {/* Center Links (Desktop only) */}
      <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-widest text-[#aaa]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`hover:text-white transition-colors uppercase ${activeTab === 'home' ? 'text-white' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
          className={`hover:text-white transition-colors uppercase ${activeTab === 'shop' && selectedCategory === 'All' ? 'text-white' : ''}`}
        >
          Shop All
        </button>

        <button className="hover:text-white transition-colors uppercase ml-4 border-l border-[#333] pl-8">About</button>
        <button className="hover:text-white transition-colors uppercase">Contact</button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6 text-[#ccc]">
        <button className="hover:text-white transition-colors">
          {/* User Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="hover:text-white transition-colors">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative hover:text-white transition-colors"
        >
          {/* Bag/Cart Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e63946] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
