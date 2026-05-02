import React from 'react';

const RoomPlayer = () => {
  return (
    <div className="bg-zinc-950 rounded-[48px] p-10 border border-white/[0.03] shadow-soft relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-5">
        <span className="material-symbols-rounded text-[120px]">equalizer</span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="w-56 h-56 rounded-[40px] overflow-hidden shadow-2xl border border-white/[0.05] flex-shrink-0 group-hover:scale-105 transition-transform duration-1000 relative">
          <img 
            className="w-full h-full object-cover opacity-80" 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800" 
            alt="Now Playing" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-rounded text-white text-5xl">stream</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-ultra-wide rounded-full flex items-center gap-2">
              <span className="material-symbols-rounded text-[10px]">podcasts</span> Primary Stream
            </span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-1 bg-white/20 h-full"></div>
              <div className="w-1 bg-white h-2/3 animate-pulse"></div>
              <div className="w-1 bg-white/40 h-full"></div>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-3 tracking-tightest flex items-center justify-center md:justify-start gap-5">
            Midnight Pulse
          </h2>
          <p className="text-zinc-600 text-lg font-medium mb-10 tracking-tight flex items-center justify-center md:justify-start gap-3">
            <span className="material-symbols-rounded text-zinc-700">artist</span> Neon Circuit • <span className="italic opacity-60">Electric Skies</span>
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <button className="px-10 py-4 bg-white text-black rounded-premium font-black text-xs hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-white/5 flex items-center gap-3">
              <span className="material-symbols-rounded text-lg">sync</span> SYNC STREAM
            </button>
            <button className="p-4 bg-white/[0.03] border border-white/[0.05] text-white rounded-premium hover:bg-white/[0.06] transition-all group">
              <span className="material-symbols-rounded text-2xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Progress Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.02]">
        <div className="h-full bg-white w-2/3 opacity-30 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
      </div>
    </div>
  );
};

export default RoomPlayer;
