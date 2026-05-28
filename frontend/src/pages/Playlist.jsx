import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import SongRow from '../components/songs/SongRow';

const Playlist = () => {
  const songs = [
    { title: "Neon Dreams", artist: "Synthwave Boy", album: "Cyber City", duration: "3:45", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" },
    { title: "Midnight Pulse", artist: "Neon Circuit", album: "Electric Skies", duration: "4:12", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200" },
    { title: "Electric Echoes", artist: "Digital Void", album: "Void Runner", duration: "3:28", image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=200" },
    { title: "Solar Wind", artist: "Astro", album: "Stardust", duration: "5:01", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200" }
  ];

  return (
    <div className="bg-black min-h-screen flex selection:bg-white/10">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pb-40">
        <Navbar />
        
        {/* Minimal Header */}
        <header className="pt-32 pb-12 px-10 flex flex-col md:flex-row items-end gap-10">
          <div className="w-64 h-64 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/[0.03] shadow-premium group cursor-pointer relative flex-shrink-0">
            <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=800" alt="Cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span className="material-symbols-rounded text-white text-7xl font-light">play_circle</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-ultra-wide flex items-center gap-2">
                <span className="material-symbols-rounded text-xs">public</span> Public Archive
              </span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-ultra-wide flex items-center gap-2">
                <span className="material-symbols-rounded text-xs">update</span> Updated 2h ago
              </span>
            </div>
            <h1 className="text-7xl font-bold text-white tracking-tightest mb-8 leading-none flex items-center gap-6">
              VIBE <br/>LOGIC.
            </h1>
            <div className="flex items-center gap-8">
              <button className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/5 group">
                <span className="material-symbols-rounded text-4xl font-black group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6HEJqSJt35iAyy7vzNae-foAiHsy-AnKFuOQyr7UFrGyEZZ2Mo6YixiwQyXh50o7Q3bjCvclOpsddhqaoXqkOaoQRx6vQtBvNoLW5HZKzrQUQojTHPJLhpQhWM5WY0DPAUDSkWSXrZLDN0gHvepj8pgn1znA3l9bv8n_No0Y152W6BhQHuHe8ybH599VfIKR2FNqxXHxaxQ-Lq96TkZWYpZmzh0mMEZSGioukw7LyLfNy4B-CU13J6ep9vNn6qbBGDAr3jBinxnlL" alt="Owner" />
                    <span className="absolute -top-1 -right-1 material-symbols-rounded text-[10px] text-white bg-black rounded-full">verified</span>
                  </div>
                  <span className="text-[14px] font-bold text-white tracking-tight">Alex Volkov</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-600">
                  <span className="text-[13px] font-medium flex items-center gap-2">
                    <span className="material-symbols-rounded text-sm">music_note</span> 12 Tracks
                  </span>
                  <span className="text-[13px] font-medium flex items-center gap-2">
                    <span className="material-symbols-rounded text-sm">schedule</span> 45m
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* List Section */}
        <section className="px-10">
          <div className="grid grid-cols-[40px_1fr_1fr_100px] gap-6 py-4 px-6 border-b border-white/[0.03] text-zinc-600 text-[10px] font-black uppercase tracking-ultra-wide mb-4">
            <span className="text-center flex items-center justify-center"><span className="material-symbols-rounded text-xs">tag</span></span>
            <span className="flex items-center gap-2"><span className="material-symbols-rounded text-xs">title</span> Title</span>
            <span className="flex items-center gap-2"><span className="material-symbols-rounded text-xs">album</span> Album</span>
            <span className="text-right flex items-center justify-end gap-2"><span className="material-symbols-rounded text-xs">timer</span></span>
          </div>
          
          <div className="space-y-0.5">
            {songs.map((song, i) => (
              <SongRow 
                key={i} 
                index={i + 1} 
                {...song}
              />
            ))}
          </div>
        </section>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Playlist;
