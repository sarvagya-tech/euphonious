import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerService } from '../services/auth.service.js';

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error('Profile image is required');
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
      toast.success(result.message || 'Account created successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[420px] glass-effect border border-white/10 rounded-lg p-10 shadow-premium relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-accent-glow rotate-45">
            <span className="material-symbols-rounded text-bg-primary text-3xl font-bold">add</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tighter">Initialize Identity</h1>
          <p className="text-[13px] font-medium text-text-muted">Create your unique sonic profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">User Handle</label>
            <input
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded-md py-3.5 px-5 text-text-primary text-sm outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all placeholder-[#333]"
              type="text"
              placeholder="vibe_architect"
            />
          </div>

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
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Security Cipher</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded-md py-3.5 px-5 text-text-primary text-sm outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all placeholder-[#333]"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Profile Image</label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="w-full bg-[#111] border border-[#1e1e1e] rounded-md py-3 px-5 text-text-muted text-sm outline-none focus:border-accent/40 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-accent file:text-bg-primary file:font-bold file:text-[10px] file:uppercase"
            />
          </div>

          <div className="flex items-start gap-3 px-1 py-2">
            <input type="checkbox" className="mt-1 accent-accent" id="terms" required />
            <label htmlFor="terms" className="text-[11px] text-text-muted leading-relaxed">
              I agree to the <span className="text-text-primary hover:underline cursor-pointer">Sonic Architecture Protocols</span> and data encryption terms.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-bg-primary font-bold py-4 rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all text-xs tracking-widest uppercase shadow-accent-glow disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Initialize Profile'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/5 pt-8">
          <p className="text-text-muted text-[12px] font-medium">
            Already synced? <Link to="/login" className="text-accent hover:underline font-bold ml-1">Access Archive</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
