import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-light tracking-[0.25em] uppercase text-white drop-shadow-lg mb-6">Contact Us</h1>
        <p className="text-[#888] tracking-widest text-sm uppercase">Get in touch with our team</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Contact Info Card */}
        <div className="glass-dark p-10 md:p-14 rounded-2xl border border-white/10 h-full flex flex-col justify-center space-y-12">
          
          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-2">Email Directory</h3>
              <p className="text-[#888] text-sm mb-1 hover:text-white transition-colors cursor-pointer">mnmrukshan22@gmail.com</p>
              <p className="text-[#888] text-sm hover:text-white transition-colors cursor-pointer">mrstores@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-2">Phone Support</h3>
              <p className="text-[#888] text-sm mb-1 hover:text-white transition-colors cursor-pointer">+94 76 075 2854</p>
              <p className="text-[#888] text-sm hover:text-white transition-colors cursor-pointer">Mon - Sun, 9am - 6pm (LKT)</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-2">Headquarters</h3>
              <p className="text-[#888] text-sm hover:text-white transition-colors cursor-pointer">Colombo,<br/>Sri Lanka</p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="w-full glass-dark p-10 md:p-14 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffffff0a] rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <h2 className="text-2xl font-light text-white mb-8">Send a Request</h2>
          <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#888]">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="off" 
                  className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm" 
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#888]">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="off" 
                  className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm" 
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#888]">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off" 
                className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm" 
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#888]">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5" 
                className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status.loading}
              className={`w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 py-4 tracking-[0.2em] text-xs font-semibold uppercase mt-4 ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status.loading ? 'Sending...' : 'Submit Inquiry'}
            </button>
            
            {status.success && (
              <p className="text-emerald-400 text-[10px] uppercase tracking-[0.2em] text-center mt-4 animate-fade-in">Message sent successfully!</p>
            )}
            {status.error && (
              <p className="text-red-400 text-[10px] uppercase tracking-[0.2em] text-center mt-4 animate-fade-in">{status.error}</p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
