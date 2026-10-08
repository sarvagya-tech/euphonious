import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Waves, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '../lib/auth-client.js';

const Login = () => {
  const location = useLocation();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const origin = location.state?.from?.pathname || '/home';
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}${origin}`,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to initialize Google Sign In');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden selection:bg-accent/20">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-cyan/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[380px] glass-card border border-white/10 rounded-3xl p-8 shadow-elevated relative z-10 animate-fade-in text-center space-y-6">
        
        {/* Brand Header */}
        <div>
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-accent-glow hover:scale-105 transition-transform">
            <Waves className="w-7 h-7 text-bg-primary stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1.5">Welcome to SyncTune</h1>
          <p className="text-xs font-medium text-text-muted">
            Sign in with Google to start listening
          </p>
        </div>

        {/* Action: Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full bg-white text-bg-primary hover:bg-white/95 active:scale-[0.98] font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-3 transition-all text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(255,255,255,0.12)] disabled:opacity-60 group"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-bg-primary" />
          ) : (
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.9 7.5 23.5 12 23.5z"
              />
            </svg>
          )}
          <span>{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
