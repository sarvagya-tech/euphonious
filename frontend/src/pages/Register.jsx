import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Plus, Eye, EyeOff, Loader2, Camera, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerService } from '../services/auth.service.js';

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error('Profile avatar is required');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    setLoading(true);
    try {
      const result = await registerService(formData);
      toast.success(result.message || 'Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 md:p-8 relative overflow-hidden selection:bg-accent/20">
      {/* Ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-purple/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[460px] glass-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-elevated relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-accent-glow hover:scale-105 transition-transform">
            <Waves className="w-8 h-8 text-bg-primary stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-1.5">Initialize Identity</h1>
          <p className="text-xs md:text-sm font-medium text-text-muted">Create your unique sonic profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload with Live Preview */}
          <div className="flex flex-col items-center justify-center pb-2">
            <label className="relative w-20 h-20 rounded-full bg-white/[0.04] border-2 border-dashed border-white/20 hover:border-accent p-1 cursor-pointer group transition-all flex items-center justify-center">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar preview" 
                  className="w-full h-full object-cover rounded-full shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center text-text-muted group-hover:text-accent transition-colors">
                  <Camera className="w-6 h-6" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent text-bg-primary rounded-full flex items-center justify-center shadow-accent-glow group-hover:scale-110 transition-transform">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                required
              />
            </label>
            <span className="text-[10.5px] font-bold text-text-muted uppercase tracking-wider mt-2">
              {avatar ? 'Profile photo selected' : 'Upload Profile Picture *'}
            </span>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">
              User Handle / Full Name
            </label>
            <input
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-text-primary text-sm outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40"
              type="text"
              placeholder="vibe_architect"
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">
              Email Identity
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-text-primary text-sm outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40"
              type="email"
              placeholder="curator@groovio.fm"
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">
              Security Cipher
            </label>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-4 pr-11 text-text-primary text-sm outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40"
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

          <div className="flex items-start gap-2.5 px-1 py-1">
            <input type="checkbox" className="mt-1 accent-accent" id="terms" required />
            <label htmlFor="terms" className="text-[11px] text-text-muted leading-relaxed select-none">
              I agree to the <span className="text-white hover:underline cursor-pointer">Sonic Architecture Protocols</span> and data encryption terms.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-xs tracking-widest uppercase shadow-accent-glow disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Initialize Profile</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-white/[0.08] pt-5">
          <p className="text-text-muted text-xs font-medium">
            Already synced? <Link to="/login" className="text-accent hover:underline font-bold ml-1">Access Archive</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
