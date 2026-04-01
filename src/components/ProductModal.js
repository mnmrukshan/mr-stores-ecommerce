import React, { useState } from 'react';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('L'); // default L based on user's screenshot
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...product, size: selectedSize });
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 transition-opacity"
        onClick={onClose}
      >
        <div 
          className="bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col pt-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">{product.name}</h2>
            <p className="text-xl font-semibold mb-8 text-gray-800">Rs. {product.price.toLocaleString()}</p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold underline cursor-pointer text-gray-600 flex items-center gap-2 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Size Chart
                </span>
              </div>
              
              <div className="mb-4">
                <span className="font-medium text-gray-900">Size: <span className="font-bold">{selectedSize}</span></span>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 w-12 border border-gray-300 font-medium transition-colors flex items-center justify-center ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-auto border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-bold text-lg text-black">Safe Checkout</span>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-12 bg-gray-200 border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm font-bold text-blue-800 text-xs italic">
                  VISA
                </div>
                <div className="h-8 w-12 bg-gray-200 border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm relative">
                    <div className="w-5 h-5 rounded-full bg-red-500 absolute left-1 mix-blend-multiply opacity-90"></div>
                    <div className="w-5 h-5 rounded-full bg-yellow-500 absolute right-1 mix-blend-multiply opacity-90"></div>
                </div>
                <div className="h-8 w-12 bg-blue-600 rounded overflow-hidden flex items-center justify-center text-white shadow-sm font-bold text-[8px] leading-tight text-center">
                  AM<br/>EX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
