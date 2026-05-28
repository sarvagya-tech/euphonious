import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const Navbar = () => {
  const {user} = useAuthStore();
  const { toggleSidebar } = useUiStore();
  return (
    <header className="fixed top-0 left-0 md:left-sidebar-width right-0 h-16 bg-bg-primary/80 backdrop-blur-xl border-b border-border-primary z-40 px-4 md:px-10 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={toggleSidebar}
        className="md:hidden w-10 h-10 rounded-md border border-border-primary bg-bg-card flex items-center justify-center text-text-primary"
        aria-label="Open navigation menu"
      >
        <span className="material-symbols-rounded text-2xl">menu</span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg hidden sm:block">
        <div className="relative group">
          <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search artists, songs, or podcasts" 
            className="w-full bg-bg-card border border-border-primary rounded-md py-2.5 pl-10 pr-4 text-[13px] font-medium text-text-primary outline-none focus:border-border-hover focus:bg-bg-secondary transition-all placeholder-text-muted" 
          />
        </div>
      </div>

      {/* User Area */}
      <div className="flex items-center gap-3 md:gap-6">
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <span className="material-symbols-rounded text-2xl">notifications</span>
        </button>
        <Link to="/profile" className="flex items-center gap-3 p-1 pr-3 bg-bg-card border border-border-primary rounded-full hover:border-border-hover transition-all group max-w-[180px]">
          <img 
            src= {user.avatar} 
            className="w-8 h-8 rounded-full border border-border-primary group-hover:border-accent/40 transition-all" 
            alt="" 
          />
          <span className="text-[12px] font-bold text-text-primary truncate hidden sm:block">{user.fullname}</span>
          <span className="material-symbols-rounded text-lg text-text-muted hidden sm:block">expand_more</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
