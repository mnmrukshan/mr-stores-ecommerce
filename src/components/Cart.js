import React from 'react';

const Cart = ({ isOpen, setIsOpen, cartItems, removeFromCart }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 glass-dark z-50 flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Your Cart</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-red-400 transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 flex flex-col space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-xl">Your cart is empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 glass-button text-sm px-6"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex space-x-4 bg-white/5 p-3 rounded-xl border border-white/5 relative pr-8">
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors p-1"
                  title="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between text-white gap-2">
                    <span className="font-bold text-green-400">Rs. {item.price.toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                      {item.size && (
                        <span className="text-xs bg-black/40 px-2 py-1 rounded border border-white/20">
                          Size: {item.size}
                        </span>
                      )}
                      <span className="text-xs bg-white/10 px-2 py-1 rounded">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-300">Total</span>
              <span className="text-2xl font-bold text-white">Rs. {total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
