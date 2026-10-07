import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginService } from '../services/auth.service.js';
import useAuthStore from '../store/authStore.js';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 md:p-8 relative overflow-hidden selection:bg-accent/20">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-cyan/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[440px] glass-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-elevated relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-accent-glow hover:scale-105 transition-transform">
            <Waves className="w-8 h-8 text-bg-primary stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-xs md:text-sm font-medium text-text-muted">Enter your credentials to tune into your frequency</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 group">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">
              Email Identity
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 px-4 text-text-primary text-sm outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40"
              type="email"
              placeholder="curator@synctune.fm"
            />
          </div>

          <div className="space-y-2 group">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest group-focus-within:text-accent transition-colors">
                Security Cipher
              </label>
            </div>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-4 pr-11 text-text-primary text-sm outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-xs tracking-widest uppercase shadow-accent-glow disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Initialize Access</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/[0.08] pt-6">
          <p className="text-text-muted text-xs font-medium">
            Don't have an archive? <Link to="/register" className="text-accent hover:underline font-bold ml-1">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
