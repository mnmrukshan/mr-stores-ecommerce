import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && item.size === product.size);
      if (existingItem) {
        return prevItems.map((item) =>
          (item.id === product.id && item.size === product.size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Open cart automatically when an item is added
    setIsCartOpen(true);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen relative antialiased selection:bg-[#e63946] selection:text-white flex flex-col">
      {/* Background ambient light effects specifically tailored to dark theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#121212]">
        <div className="absolute top-0 -left-[20%] w-[50%] h-[50%] bg-gradient-radial from-[#ffffff05] to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] -right-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#e6394610] to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      <TopBar />
      
      <Navbar 
        cartCount={totalItems} 
        setIsCartOpen={setIsCartOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <main className="flex-grow flex flex-col items-center w-full">
        {activeTab === 'home' && (
          <div className="w-full">
            <Hero />
            <div className="mt-12 w-full max-w-[1600px] mx-auto pb-24">
                <ProductGrid onProductClick={setSelectedProduct} selectedCategory="All" />
                <div className="flex justify-center mt-12 w-full">
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="border border-[#fff]/30 text-white hover:bg-white hover:text-black transition-all duration-300 py-3 px-12 tracking-[0.2em] text-xs font-semibold uppercase"
                  >
                    View All Styles
                  </button>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="w-full pt-12 pb-24">
            <div className="w-full text-center px-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg mb-4">All Apparel</h1>
                <p className="text-[#888] tracking-widest text-sm">Fine collections for boys.</p>
            </div>
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <ProductGrid onProductClick={setSelectedProduct} selectedCategory={selectedCategory} />
          </div>
        )}
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cartItems={cartItems} 
      />

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />
    </div>
  );
}

export default App;
