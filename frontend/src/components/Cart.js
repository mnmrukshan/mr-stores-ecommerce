import React, { useState, useEffect } from 'react';

const Cart = ({ isOpen, setIsOpen, cartItems, removeFromCart, user, clearCart }) => {
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch recent orders whenever the drawer opens or every 30 seconds
  useEffect(() => {
    let interval;
    if (isOpen && user) {
      fetchRecentOrders();
      interval = setInterval(fetchRecentOrders, 30000); // Auto-poll every 30s
    }
    return () => clearInterval(interval);
  }, [isOpen, user]);

  const fetchRecentOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/myorders?userId=${user._id}`);
      const data = await res.json();
      setRecentOrders(Array.isArray(data) ? data.slice(-5).reverse() : []);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: 'PUT',
      });
      if (res.ok) fetchRecentOrders();
      else {
        const error = await res.json();
        alert(error.message || 'Cannot cancel order');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        user: user._id,
        orderItems: cartItems.map(item => ({
          product: item.id || item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          price: item.price
        })),
        shippingAddress: 'Colombo, Sri Lanka',
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setOrderSuccess(true);
        fetchRecentOrders(); // Refresh history
        setTimeout(() => {
          clearCart();
          setOrderSuccess(false);
        }, 3000);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Checkout failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 glass-dark z-50 flex flex-col transform transition-transform duration-300 shadow-2xl border-l border-white/10">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Your Session</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Cart Items Section */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#666] mb-6 flex items-center">
              Current Cart {cartItems.length > 0 && `(${cartItems.length})`}
              <div className="flex-grow h-[1px] bg-white/5 ml-4"></div>
              <button 
                onClick={fetchRecentOrders}
                className="ml-4 text-[8px] text-[#444] hover:text-white transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </h3>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-xs text-[#444] tracking-widest uppercase italic">Bag is empty</p>
              </div>
            ) : orderSuccess ? (
              <div className="text-center py-12 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-white uppercase tracking-[0.2em]">Order Confirmed</p>
                <p className="text-[10px] text-emerald-400 mt-2 uppercase tracking-widest">Added to your history</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex space-x-4 bg-white/5 p-4 rounded-xl border border-white/5 relative group transition-all hover:bg-white/10">
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded shadow-lg" />
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest">{item.name}</h4>
                        <p className="text-[10px] text-[#666] uppercase mt-1">{item.category} / {item.size}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-emerald-400 font-bold text-sm">Rs. {item.price.toLocaleString()}</span>
                        <span className="text-[10px] text-white bg-white/10 px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Orders / History Section */}
          {user && (
            <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#666] mb-6 flex items-center">
                My Orders / Status
                <div className="flex-grow h-[1px] bg-white/5 ml-4"></div>
              </h3>
              
              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl">
                    <p className="text-[10px] text-[#222] uppercase tracking-[0.2em]">No order history found</p>
                  </div>
                ) : (
                  recentOrders.map(order => (
                    <div key={order._id} className="p-5 bg-[#111] border border-white/10 rounded-xl space-y-4 hover:border-white/20 transition-all shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <p className="text-[9px] text-[#666] uppercase tracking-widest mb-1">Status</p>
                          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded inline-block w-fit ${
                            order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 
                            order.status === 'SHIPPED' ? 'bg-emerald-500/10 text-emerald-500' :
                            order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' : 'bg-white/10 text-white'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-[#666] uppercase tracking-widest mb-1">Order Ref</p>
                          <p className="text-[10px] text-white font-bold tracking-widest">#{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                         <div className="text-[10px] text-[#888] space-y-1">
                            {order.items.map((item, i) => (
                              <p key={i} className="truncate max-w-[150px]">{item.quantity}x {item.name}</p>
                            ))}
                         </div>
                         <div className="text-right">
                           <p className="text-[9px] text-[#666] uppercase tracking-widest">Total</p>
                           <p className="text-xs text-white font-bold tracking-widest">Rs. {order.totalAmount.toLocaleString()}</p>
                         </div>
                      </div>

                      {order.status === 'PENDING' && (
                        <button 
                          onClick={() => cancelOrder(order._id)}
                          className="w-full mt-2 text-[10px] uppercase tracking-[0.2em] text-red-500 border border-red-500/30 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all font-semibold"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && !orderSuccess && (
          <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-sm tracking-[0.2em] uppercase text-gray-400">Total Price</span>
              <span className="text-xl font-bold text-white tracking-tighter">Rs. {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-gray-200 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>Processing</span>
                </div>
              ) : 'Confirm Checkout'}
            </button>
          </div>
        )}

        {cartItems.length === 0 && (
          <div className="p-6 border-t border-white/10 bg-black/20">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full border border-white/10 text-white/50 py-4 rounded-xl text-[10px] uppercase tracking-[0.3em] hover:text-white hover:border-white/30 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
