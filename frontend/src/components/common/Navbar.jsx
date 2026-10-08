import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown, Sparkles, Waves, LogIn } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const Navbar = () => {
  const { user, token } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user && token);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-40 px-4 md:px-8 flex items-center justify-between gap-4 transition-all duration-300">
      {/* Left: 3-line Option Menu Toggle & Brand */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-text-primary hover:text-accent hover:border-accent/40 active:scale-95 transition-all shadow-sm"
          aria-label="Toggle navigation menu"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-accent-glow group-hover:scale-105 transition-transform">
            <Waves className="w-4 h-4 text-bg-primary stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-sans hidden sm:inline-block">
            SyncTune<span className="text-accent">.</span>
          </span>
        </Link>
      </div>

      {/* Global Search Bar with Keyboard Shortcut */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div 
          onClick={() => navigate('/search')}
          className="relative group cursor-pointer"
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search songs, artists, genres..." 
            onFocus={() => navigate('/search')}
            className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-accent/50 focus:bg-white/[0.06] rounded-xl py-2 pl-10 pr-12 text-[13px] font-medium text-text-primary outline-none transition-all placeholder:text-text-muted/60 shadow-inner cursor-pointer" 
            readOnly
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded text-[10px] font-mono text-text-muted">
            <span>/</span>
          </div>
        </div>
      </div>

      {/* Right Controls Area */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Quick Ambient Live Indicator */}
        <Link 
          to="/room" 
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all text-accent text-xs font-bold shadow-accent-glow"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span>Live Rooms</span>
        </Link>

        {isAuthenticated ? (
          <>
            {/* Notifications */}
            <button 
              type="button"
              className="relative w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-text-muted hover:text-text-primary hover:border-white/20 transition-all active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#c8f55a]"></span>
            </button>

            {/* User Profile Pill */}
            <Link 
              to="/profile" 
              className="flex items-center gap-2.5 p-1 pr-3.5 bg-white/[0.04] border border-white/10 rounded-full hover:border-accent/40 hover:bg-white/[0.08] transition-all group max-w-[200px]"
            >
              <div className="relative">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
                  className="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent transition-all object-cover" 
                  alt={user?.fullname || 'Profile'} 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-bg-primary rounded-full"></span>
              </div>
              <span className="text-[12.5px] font-semibold text-text-primary truncate hidden sm:block group-hover:text-accent transition-colors">
                {user?.fullname || 'User'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors hidden sm:block" />
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-bg-primary font-bold text-xs tracking-wider uppercase transition-all shadow-accent-glow active:scale-95 flex items-center gap-2"
          >
            <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
