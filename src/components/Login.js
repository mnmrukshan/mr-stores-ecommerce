import React from 'react';

const Login = () => {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-24 flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg mb-8">Sign In</h1>
      <div className="w-full glass-dark p-8 md:p-10 rounded-2xl border border-white/10">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2">
            <label className="text-xs tracking-[0.2em] uppercase text-[#888]">Email</label>
            <input type="email" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs tracking-[0.2em] uppercase text-[#888]">Password</label>
              <span className="text-[10px] text-[#666] hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Forgot?</span>
            </div>
            <input type="password" className="bg-transparent border-b border-[#444] text-white focus:outline-none focus:border-white transition-colors py-2" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full border border-[#fff]/30 text-white hover:bg-white hover:text-black transition-all duration-300 py-4 tracking-[0.2em] text-xs font-semibold uppercase">
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-[#333] pt-6">
          <p className="text-[#888] text-xs tracking-widest uppercase">
            New to MR Stores? <span className="text-white hover:text-[#bbb] cursor-pointer ml-1">Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
