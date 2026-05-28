import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUiStore from '../../store/uiStore';

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useUiStore();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Home', icon: 'home', path: '/home' },
    { label: 'Search', icon: 'search', path: '/search' },
    { label: 'Your Library', icon: 'library_music', path: '/playlist' },
    { label: 'Rooms', icon: 'sensors', path: '/room' },
    { label: 'Upload', icon: 'cloud_upload', path: '/upload' },
  ];

  const playlists = [
    { name: 'Midnight Chill', thumb: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=100' },
    { name: 'Coding Focus', thumb: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=100' },
    { name: 'Techno 2024', thumb: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=100' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed left-0 top-0 h-full w-sidebar-width bg-bg-primary border-r border-border-primary flex flex-col p-6 pb-28 z-50 overflow-hidden transform transition-transform duration-300 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <button
          type="button"
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 w-9 h-9 rounded-full border border-border-primary bg-bg-card flex items-center justify-center text-text-muted"
          aria-label="Close navigation menu"
        >
          <span className="material-symbols-rounded text-xl">close</span>
        </button>

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-accent-glow">
          <span className="material-symbols-rounded text-bg-primary text-xl font-bold">waves</span>
        </div>
        <span className="text-xl font-bold tracking-tighter text-text-primary mono-text">Groovio</span>
      </div>

      {/* Main Nav */}
      <nav className="space-y-1 mb-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'nav-item-active' : ''}`}
          >
            <span className="material-symbols-rounded text-2xl">{item.icon}</span>
            <span className="text-[13px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6 px-4">Your Playlists</p>
        <div className="space-y-1">
          {playlists.map((pl, i) => (
            <div key={i} className="flex items-center gap-4 py-2 px-4 rounded-md hover:bg-white/5 transition-all cursor-pointer group">
              <img src={pl.thumb} className="w-8 h-8 rounded bg-bg-card border border-border-primary group-hover:border-border-hover transition-all" alt="" />
              <span className="text-[13px] font-medium text-text-muted group-hover:text-text-primary truncate transition-colors">{pl.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-6 pt-6 border-t border-border-primary">
        <button className="w-full bg-bg-card border border-border-primary hover:border-accent hover:text-accent transition-all duration-300 py-3.5 rounded-md flex items-center justify-center gap-3 group active:scale-95 shadow-premium">
          <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">add</span>
          <span className="text-[11px] font-bold tracking-wider uppercase">Create Playlist</span>
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
