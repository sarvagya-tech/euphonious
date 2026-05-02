import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-sidebar-width right-0 h-16 bg-bg-primary/80 backdrop-blur-xl border-b border-border-primary z-40 px-10 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
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
      <div className="flex items-center gap-6">
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <span className="material-symbols-rounded text-2xl">notifications</span>
        </button>
        <Link to="/profile" className="flex items-center gap-3 p-1 pr-3 bg-bg-card border border-border-primary rounded-full hover:border-border-hover transition-all group">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6HEJqSJt35iAyy7vzNae-foAiHsy-AnKFuOQyr7UFrGyEZZ2Mo6YixiwQyXh50o7Q3bjCvclOpsddhqaoXqkOaoQRx6vQtBvNoLW5HZKzrQUQojTHPJLhpQhWM5WY0DPAUDSkWSXrZLDN0gHvepj8pgn1znA3l9bv8n_No0Y152W6BhQHuHe8ybH599VfIKR2FNqxXHxaxQ-Lq96TkZWYpZmzh0mMEZSGioukw7LyLfNy4B-CU13J6ep9vNn6qbBGDAr3jBinxnlL" 
            className="w-8 h-8 rounded-full border border-border-primary group-hover:border-accent/40 transition-all" 
            alt="" 
          />
          <span className="text-[12px] font-bold text-text-primary">Alex Volkov</span>
          <span className="material-symbols-rounded text-lg text-text-muted">expand_more</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
