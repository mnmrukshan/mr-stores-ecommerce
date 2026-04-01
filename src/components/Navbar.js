import React, { useState } from 'react';
import productsData from '../data/products.json';

const Navbar = ({ cartCount, setIsCartOpen, activeTab, setActiveTab, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

        <button 
          onClick={() => setActiveTab('about')}
          className={`hover:text-white transition-colors uppercase ml-4 border-l border-[#333] pl-8 ${activeTab === 'about' ? 'text-white' : ''}`}
        >
          About
        </button>
        <button 
          onClick={() => setActiveTab('contact')}
          className={`hover:text-white transition-colors uppercase ${activeTab === 'contact' ? 'text-white' : ''}`}
        >
          Contact
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6 text-[#ccc]">
        
        {/* Search Icon / Input */}
        <div className="relative flex items-center">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-white transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <div className={`relative transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-32 md:w-56 ml-3 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery || ''}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && activeTab !== 'shop') {
                  setActiveTab('shop');
                }
              }}
              className="bg-transparent border-b border-[#666] text-white text-sm focus:outline-none focus:border-white w-full pb-1 pr-5"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 text-[#666] hover:text-white mb-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Autocomplete Dropdown */}
            {searchQuery && isSearchOpen && (
              <div className="absolute top-full lg:right-0 mt-4 w-64 md:w-80 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {productsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map(product => (
                   <div 
                      key={product.id} 
                      className="flex items-center p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0" 
                      onClick={() => { 
                        setSearchQuery(product.name); 
                        setActiveTab('shop'); 
                        setIsSearchOpen(false); 
                      }}
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</span>
                        <span className="text-green-400 text-[10px]">Rs. {product.price.toLocaleString()}</span>
                      </div>
                   </div>
                ))}
                {productsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                   <div className="p-4 text-center text-xs text-gray-500">No styles found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bag/Cart Icon */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e63946] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* User Icon (Profile Logo) */}
        <button 
          onClick={() => setActiveTab('login')}
          className={`hover:text-white transition-colors ${activeTab === 'login' ? 'text-white' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
