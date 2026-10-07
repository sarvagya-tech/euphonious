import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Radio, Upload, Plus, X, Waves, Disc, LogIn } from 'lucide-react';
import useUiStore from '../../store/uiStore';
import useAuthStore from '../../store/authStore';
import { getPlaylist } from '../../services/playlist.service';

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useUiStore();
  const { user, token } = useAuthStore();
  const isAuthenticated = Boolean(user && token);
  const isActive = (path) => location.pathname === path;
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Search & Explore', icon: Search, path: '/search' },
    { label: 'Live Rooms', icon: Radio, path: '/room', badge: 'Live' },
    { label: 'Upload Track', icon: Upload, path: '/upload' },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      setPlaylists([]);
      return;
    }

    getPlaylist().then((data) => {
      if (data && data.data) {
        setPlaylists(data.data.data || []);
      }
    });
  }, [isAuthenticated]);

  return (
    <>
      {/* Backdrop (Active when Sidebar is Opened from 3-line Menu) */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed left-0 top-0 h-full w-[280px] md:w-[300px] glass-sidebar flex flex-col p-5 pb-28 z-50 overflow-hidden transform transition-transform duration-300 ease-out shadow-2xl border-r border-white/10 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 flex items-center justify-center text-text-muted hover:text-white transition-all active:scale-95 shadow-sm"
          aria-label="Close navigation menu"
          title="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <Link to="/home" onClick={closeSidebar} className="mb-8 flex items-center gap-3 group px-2 pt-1">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-accent-glow group-hover:scale-105 transition-transform duration-300">
            <Waves className="w-5 h-5 text-bg-primary stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              SyncTune<span className="text-accent">.</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted -mt-1">
              Synchronized Audio
            </span>
          </div>
        </Link>

        {/* Main Nav Section */}
        <nav className="space-y-1.5 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/70 px-3 mb-2">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`nav-item relative group ${active ? 'nav-item-active' : ''}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-accent' : 'text-text-muted group-hover:text-text-primary'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Playlists Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 flex flex-col">
          <div className="flex items-center justify-between px-3 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/70">Playlists</p>
            {isAuthenticated && (
              <span className="text-[10px] font-mono text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded">
                {playlists.length}
              </span>
            )}
          </div>

          <div className="space-y-1 flex-1">
            {!isAuthenticated ? (
              <div className="p-3 text-center space-y-2 rounded-xl bg-white/[0.02] border border-white/5 mx-1">
                <p className="text-xs text-text-muted font-medium">Sign in to view and save your custom playlists</p>
                <Link
                  to="/login"
                  onClick={closeSidebar}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent hover:underline"
                >
                  <LogIn className="w-3 h-3" /> Log In
                </Link>
              </div>
            ) : playlists.length === 0 ? (
              <p className="text-xs text-text-muted/60 px-3 py-2 italic">No playlists yet</p>
            ) : (
              playlists.map((pl, i) => (
                <div
                  key={pl._id || i}
                  onClick={() => {
                    navigate(`/playlist/${pl._id}`);
                    closeSidebar();
                  }}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-bg-card border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-accent/40 transition-colors shadow-sm">
                    {pl.coverImage ? (
                      <img src={pl.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted">
                        <Disc className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <span className="text-[13px] font-medium text-text-muted group-hover:text-text-primary truncate transition-colors flex-1">
                    {pl.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Playlist Action Bottom */}
        <div className="mt-4 pt-4 border-t border-white/[0.08]">
          <Link
            to="/playlist/create"
            onClick={closeSidebar}
            className="w-full bg-white/[0.03] hover:bg-accent hover:text-bg-primary border border-white/10 hover:border-accent transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 group active:scale-[0.98] shadow-sm font-semibold text-text-primary text-xs tracking-wider uppercase"
          >
            <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" />
            <span>Create Playlist</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
