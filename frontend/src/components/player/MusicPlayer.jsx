import React from 'react';

const MusicPlayer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-player-height bg-bg-secondary border-t border-border-primary z-50 px-6 flex items-center justify-between">
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-14 h-14 rounded-lg overflow-hidden border border-border-primary flex-shrink-0 group relative">
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
        <div className="truncate">
          <h5 className="text-[14px] font-bold text-text-primary truncate cursor-pointer hover:underline">Midnight Pulse</h5>
          <p className="text-[11px] font-medium text-text-muted truncate cursor-pointer hover:text-text-primary transition-colors">Neon Circuit</p>
        </div>
        <button className="text-text-muted hover:text-accent transition-all ml-2">
          <span className="material-symbols-rounded text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
      </div>

      {/* Center: Controls */}
      <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
        <div className="flex items-center gap-8 text-text-muted">
          <button className="hover:text-accent transition-colors">
            <span className="material-symbols-rounded text-xl">shuffle</span>
          </button>
          <button className="text-text-primary hover:text-accent transition-all">
            <span className="material-symbols-rounded text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
          </button>
          <button className="w-10 h-10 bg-text-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-premium group">
            <span className="material-symbols-rounded text-bg-primary text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
          <button className="text-text-primary hover:text-accent transition-all">
            <span className="material-symbols-rounded text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
          </button>
          <button className="hover:text-accent transition-colors">
            <span className="material-symbols-rounded text-xl">repeat</span>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3 group cursor-pointer px-4">
          <span className="text-[10px] mono-text text-text-muted w-10 text-right">2:14</span>
          <div className="flex-1 h-1 bg-border-primary rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-accent transition-all duration-300 w-2/3 shadow-accent-glow"></div>
          </div>
          <span className="text-[10px] mono-text text-text-muted w-10">3:45</span>
        </div>
      </div>

      {/* Right: Utils */}
      <div className="flex items-center justify-end gap-6 w-1/4">
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <span className="material-symbols-rounded text-xl">lyrics</span>
        </button>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <span className="material-symbols-rounded text-xl">sensors</span>
        </button>
        <div className="flex items-center gap-2 w-24 group">
          <span className="material-symbols-rounded text-xl text-text-muted group-hover:text-text-primary transition-colors">volume_up</span>
          <div className="flex-1 h-1 bg-border-primary rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-text-muted group-hover:bg-accent transition-all duration-300 w-3/4"></div>
          </div>
        </div>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <span className="material-symbols-rounded text-xl">fullscreen</span>
        </button>
      </div>
    </footer>
  );
};

export default MusicPlayer;
