import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginService } from '../services/auth.service.js';
import useAuthStore from '../store/authStore.js';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginService(email, password);
      const { user, accessToken } = result.data;
      setUser(user, accessToken);
      toast.success(result.message || 'Logged in successfully');
      navigate('/home');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[420px] glass-effect border border-white/10 rounded-lg p-10 shadow-premium relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-accent-glow">
            <span className="material-symbols-rounded text-bg-primary text-3xl font-bold">waves</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tighter">Welcome back</h1>
          <p className="text-[13px] font-medium text-text-muted">Enter your credentials to access your archive</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Email Identity</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded-md py-3.5 px-5 text-text-primary text-sm outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all placeholder-[#333]"
              type="email"
              placeholder="archive@aura.fm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Security Cipher</label>
              <button type="button" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-wider">Forgot?</button>
            </div>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded-md py-3.5 px-5 text-text-primary text-sm outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all placeholder-[#333]"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-bg-primary font-bold py-4 rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all text-xs tracking-widest uppercase shadow-accent-glow disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Initialize Access'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/5 pt-8">
          <p className="text-text-muted text-[12px] font-medium">
            Don't have an archive? <Link to="/register" className="text-accent hover:underline font-bold ml-1">Initialize Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
