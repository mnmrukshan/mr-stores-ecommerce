import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Reset link sent to your email.');
        } else {
          setError(data.message || 'Something went wrong');
        }
      } else if (isLogin) {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          onLoginSuccess(data);
        } else {
          setError(data.message || 'Invalid email or password');
        }
      } else {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          onLoginSuccess(data);
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Connection refused. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-radial from-[#ffffff08] to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-gradient-radial from-[#e639460a] to-transparent rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-md px-6 py-12 z-10 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-[0.3em] uppercase text-white mb-2">
            MR Stores
          </h1>
          <div className="h-[1px] w-12 bg-white/30 mx-auto mt-4 mb-4"></div>
          <h2 className="text-sm tracking-[0.2em] uppercase text-[#888]">
            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Join the Club')}
          </h2>
        </div>

        <div className="w-full bg-[#111]/80 backdrop-blur-md p-8 md:p-10 rounded-sm border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</div>}
          {message && <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] uppercase tracking-widest text-center">{message}</div>}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {!isLogin && !isForgotPassword && (
              <div className="flex flex-col space-y-2 group">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#666] group-focus-within:text-white transition-colors duration-300">Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off" 
                  className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm placeholder-[#444]" 
                  placeholder="Enter your name" 
                />
              </div>
            )}
            <div className="flex flex-col space-y-2 group">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#666] group-focus-within:text-white transition-colors duration-300">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="off" 
                className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm placeholder-[#444]" 
                placeholder="Enter your email" 
              />
            </div>
            {!isForgotPassword && (
              <div className="flex flex-col space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#666] group-focus-within:text-white transition-colors duration-300">Password</label>
                  {isLogin && (
                    <span 
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[9px] text-[#666] hover:text-white cursor-pointer transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-[2px]"
                    >
                      Forgot?
                    </span>
                  )}
                </div>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="off" 
                  className="bg-transparent border-b border-[#333] text-white focus:outline-none focus:border-white transition-colors py-2 text-sm placeholder-[#444]" 
                  placeholder="Enter your password" 
                />
              </div>
            )}
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 py-4 tracking-[0.2em] text-xs font-bold uppercase relative overflow-hidden group disabled:opacity-50"
            >
              <span className="relative z-10">
                {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account'))}
              </span>
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-[#222] flex flex-col items-center">
            {isForgotPassword ? (
              <button onClick={() => setIsForgotPassword(false)} type="button" className="text-white hover:text-[#bbb] transition-colors duration-300 tracking-[0.2em] text-[10px] uppercase border-b border-white/30 hover:border-white pb-1">
                Back to Sign In
              </button>
            ) : (
              <>
                <p className="text-[#666] text-[10px] tracking-[0.2em] uppercase mb-4">
                  {isLogin ? 'New to MR Stores?' : 'Already have an account?'}
                </p>
                <button onClick={() => setIsLogin(!isLogin)} type="button" className="text-white hover:text-[#bbb] transition-colors duration-300 tracking-[0.2em] text-[10px] uppercase border-b border-white/30 hover:border-white pb-1">
                  {isLogin ? 'Create an Account' : 'Sign In'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
