import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

const availableSongs = [
  {
    _id: '1',
    title: 'Neon Dreams',
    artist: 'Synthwave Boy',
    genre: 'Synthwave',
    coverimage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200',
  },
  {
    _id: '2',
    title: 'Midnight Pulse',
    artist: 'Neon Circuit',
    genre: 'Electronic',
    coverimage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200',
  },
  {
    _id: '3',
    title: 'Electric Echoes',
    artist: 'Digital Void',
    genre: 'Ambient',
    coverimage: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=200',
  },
  {
    _id: '4',
    title: 'Solar Wind',
    artist: 'Astro',
    genre: 'Chill',
    coverimage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200',
  },
];

const CreatePlaylist = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSong = (songId) => {
    setSelectedSongs((current) =>
      current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId]
    );
  };

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Create Playlist</h2>
            <p className="text-text-muted">Add a name, cover image, and pick songs from your library.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="premium-card p-8 bg-bg-card border border-border-primary rounded-xl shadow-premium">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group md:col-span-2">
                    <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">
                      Playlist Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter playlist name"
                      className="w-full bg-bg-secondary border border-border-primary rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted">
                      Cover Image
                    </label>
                    <label className="border-2 border-dashed border-border-primary rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group h-56">
                      <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <span className="material-symbols-rounded text-2xl text-text-muted group-hover:text-accent transition-colors">image</span>
                      </div>
                      <p className="text-sm font-bold text-text-primary mb-1">Upload Playlist Cover</p>
                      <p className="text-[11px] text-text-muted uppercase tracking-wider">JPEG, PNG, WEBP</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="premium-card p-8 bg-bg-card border border-border-primary rounded-xl shadow-premium">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Choose Songs</h3>
                  <p className="text-sm text-text-muted mt-1">Select tracks from all available songs.</p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                  {selectedSongs.length} selected
                </span>
              </div>

              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1 custom-scrollbar">
                {availableSongs.map((song, index) => {
                  const isSelected = selectedSongs.includes(song._id);

                  return (
                    <button
                      key={song._id}
                      type="button"
                      onClick={() => toggleSong(song._id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-accent/10 border-accent/30'
                          : 'bg-bg-secondary border-border-primary hover:border-border-hover hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-bg-card border border-border-primary flex-shrink-0">
                        <img src={song.coverimage} alt={song.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="mono-text text-[11px] text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                          <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-accent' : 'text-text-primary'}`}>
                            {song.title}
                          </h4>
                        </div>
                        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider truncate">
                          {song.artist} · {song.genre}
                        </p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-accent border-accent text-bg-primary' : 'border-border-hover text-transparent'}`}>
                        <span className="material-symbols-rounded text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="bg-accent text-bg-primary font-bold py-3.5 px-8 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-accent-glow flex items-center gap-2 group"
            >
              <span className="material-symbols-rounded group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                playlist_add
              </span>
              Create Playlist
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePlaylist;
