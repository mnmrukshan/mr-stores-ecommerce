import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'Shirts',
    image: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'orders') {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } else if (activeTab === 'inventory') {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } else if (activeTab === 'inquiries') {
        const [msgRes, subRes] = await Promise.all([
          fetch('http://localhost:5000/api/messages'),
          fetch('http://localhost:5000/api/subscribers')
        ]);
        const msgData = await msgRes.json();
        const subData = await subRes.json();
        setMessages(Array.isArray(msgData) ? msgData : []);
        setSubscribers(Array.isArray(subData) ? subData : []);
      }
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price)
        }),
      });
      if (res.ok) {
        setIsAddingProduct(false);
        setProductForm({ name: '', price: '', category: 'Shirts', image: '', description: '' });
        fetchData();
      }
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/subscribers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Failed to delete subscriber');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-light tracking-[0.3em] uppercase mb-4">Control Panel</h1>
            <p className="text-[#666] tracking-[0.2em] text-[10px] uppercase">Management Suite / MR Stores</p>
          </div>
          <div className="flex space-x-6 items-end">
            <button 
              onClick={fetchData}
              className="text-[#444] hover:text-white transition-colors flex items-center gap-2 mb-1 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-[9px] tracking-[0.2em] uppercase">Sync Data</p>
            </button>
            <div className="w-[1px] h-10 bg-white/10"></div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] mb-1">Status</p>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">System Online</p>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex space-x-12 mb-12 border-b border-white/5">
          {['orders', 'inventory', 'inquiries', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative ${
                activeTab === tab ? 'text-white' : 'text-[#444] hover:text-[#888]'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-width-in"></div>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center animate-pulse tracking-[0.3em] text-[#444] uppercase text-xs">Accessing Database...</div>
        ) : (
          <div className="animate-fade-in">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {orders.length === 0 ? (
                    <div className="py-24 text-center glass-dark border border-white/5 rounded-2xl">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#444]">No active orders found</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="glass-dark border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row justify-between gap-8 hover:border-white/20 transition-all duration-300">
                        <div className="flex-grow space-y-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[9px] tracking-[0.2em] uppercase text-[#666] mb-1">Order Ref</p>
                              <p className="text-xs font-bold text-white tracking-widest">#{order._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] tracking-[0.2em] uppercase text-[#666] mb-1">Customer</p>
                              <p className="text-xs text-white tracking-widest">{order.user?.name || 'Guest'}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                             {order.items.map((item, idx) => (
                               <div key={idx} className="flex justify-between text-[10px] tracking-widest border-b border-white/5 pb-2 last:border-0">
                                 <span className="text-[#888]">{item.quantity}x {item.name} ({item.size})</span>
                                 <span className="text-white">Rs. {item.price.toLocaleString()}</span>
                               </div>
                             ))}
                          </div>
                        </div>
                        <div className="w-full md:w-64 space-y-6 border-t md:border-t-0 md:border-l border-white/10 md:pl-8 pt-6 md:pt-0">
                           <div className="flex justify-between items-end">
                             <div>
                               <p className="text-[9px] tracking-[0.2em] uppercase text-[#666] mb-1">Total Value</p>
                               <p className="text-lg font-bold text-emerald-400 tracking-tighter">Rs. {order.totalAmount.toLocaleString()}</p>
                             </div>
                             <div className="text-right">
                               <p className="text-[9px] tracking-[0.2em] uppercase text-[#666] mb-1">Status</p>
                               <p className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${order.status === 'PENDING' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                 {order.status}
                               </p>
                             </div>
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                              {order.status === 'PENDING' && (
                                <button 
                                  onClick={() => updateOrderStatus(order._id, 'SHIPPED')}
                                  className="text-[9px] tracking-[0.2em] uppercase bg-white text-black py-2 rounded-lg font-bold hover:bg-gray-200"
                                >
                                  Process
                                </button>
                              )}
                              <button 
                                onClick={() => updateOrderStatus(order._id, 'CANCELLED')}
                                className="text-[9px] tracking-[0.2em] uppercase border border-red-500/30 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white"
                              >
                                Cancel
                              </button>
                           </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xs tracking-[0.3em] uppercase text-[#666]">Stock Inventory</h2>
                  <button 
                    onClick={() => setIsAddingProduct(true)}
                    className="text-[10px] tracking-[0.2em] uppercase bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-[#ddd] transition-all"
                  >
                    Add Style
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div key={p._id} className="glass-dark border border-white/5 p-6 rounded-2xl group hover:border-white/20 transition-all">
                      <div className="flex justify-between mb-4">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-[#444]">{p.category}</span>
                        <div className="space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => deleteProduct(p._id)} className="text-[9px] uppercase text-red-500 hover:underline">Delete</button>
                        </div>
                      </div>
                      <h3 className="text-xs font-bold tracking-widest uppercase mb-2 truncate">{p.name}</h3>
                      <p className="text-sm font-bold text-emerald-400 tracking-tighter">Rs. {p.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Messages List */}
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-8">Client Requests</h2>
                  {messages.length === 0 ? (
                    <div className="py-12 text-center glass-dark border border-white/5 rounded-2xl">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#444]">No messages received</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg._id} className="glass-dark border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-white">{msg.firstName} {msg.lastName}</h3>
                            <p className="text-[10px] text-emerald-400 tracking-wider lowercase mt-1">{msg.email}</p>
                          </div>
                          <button onClick={() => deleteMessage(msg._id)} className="text-[10px] uppercase text-[#444] hover:text-red-500 transition-colors">Dismiss</button>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                          <p className="text-xs text-[#888] leading-relaxed italic">"{msg.message}"</p>
                        </div>
                        <p className="text-[9px] text-[#444] mt-4 uppercase tracking-[0.2em]">{new Date(msg.createdAt).toLocaleDateString()} @ {new Date(msg.createdAt).toLocaleTimeString()}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Subscribers List */}
                <div className="space-y-6">
                   <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-8">Newsletter</h2>
                   <div className="glass-dark border border-white/5 p-6 rounded-2xl">
                     {subscribers.length === 0 ? (
                       <p className="text-[10px] tracking-[0.2em] uppercase text-[#444] text-center py-4">Zero subscribers</p>
                     ) : (
                       <div className="space-y-4">
                         {subscribers.map((sub) => (
                           <div key={sub._id} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0 group">
                             <div>
                               <p className="text-xs text-white tracking-wider lowercase">{sub.email}</p>
                               <p className="text-[8px] text-[#444] uppercase mt-1 italic">Joined {new Date(sub.joinedAt).toLocaleDateString()}</p>
                             </div>
                             <button onClick={() => deleteSubscriber(sub._id)} className="text-[10px] text-red-500/30 group-hover:text-red-500 transition-colors">&times;</button>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="glass-dark border border-white/10 p-8 rounded-2xl w-full max-w-md animate-fade-in">
            <h2 className="text-sm tracking-[0.3em] uppercase mb-8 border-b border-white/10 pb-4">New Collection Style</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Name" required 
                className="w-full bg-white/5 border border-white/10 p-3 rounded text-xs tracking-widest outline-none focus:border-white/30"
                value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              />
              <input 
                type="number" placeholder="Price (LKR)" required 
                className="w-full bg-white/5 border border-white/10 p-3 rounded text-xs tracking-widest outline-none focus:border-white/30"
                value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})}
              />
              <select 
                className="w-full bg-white/5 border border-white/10 p-3 rounded text-xs tracking-widest outline-none focus:border-white/30"
                value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}
              >
                <option value="Shirts" className="bg-[#111]">Shirts</option>
                <option value="Jeans" className="bg-[#111]">Jeans</option>
                <option value="Shorts" className="bg-[#111]">Shorts</option>
                <option value="Sweaters" className="bg-[#111]">Sweaters</option>
              </select>
              <input 
                type="text" placeholder="Image URL" required 
                className="w-full bg-white/5 border border-white/10 p-3 rounded text-xs tracking-widest outline-none focus:border-white/30"
                value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded text-xs tracking-widest outline-none focus:border-white/30 h-24"
                value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})}
              ></textarea>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAddingProduct(false)} className="flex-1 border border-white/10 py-3 rounded text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-white text-black py-3 rounded text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all">Save Style</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
