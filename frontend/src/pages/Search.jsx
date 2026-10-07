import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Heart,
  Flame,
  CloudRain,
  PartyPopper,
  Feather,
  Coffee,
  Mic2,
  Guitar,
  Sparkles,
  Music
} from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import SongRow from '../components/songs/SongRow';
import { getallSongs } from '../services/song.service';

const Search = () => {
  const [query, setQuery] = useState('');
  const [allSongs, setAllSongs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { 
      name: "Love", 
      tag: "Romantic & Soul", 
      icon: Heart, 
      color: "from-rose-600/35 via-pink-900/20 to-bg-card", 
      border: "hover:border-rose-400/50",
      accent: "text-rose-400"
    },
    { 
      name: "Bhakti", 
      tag: "Devotional & Chants", 
      icon: Flame, 
      color: "from-amber-600/35 via-orange-900/20 to-bg-card", 
      border: "hover:border-amber-400/50",
      accent: "text-amber-400"
    },
    { 
      name: "Sad", 
      tag: "Heartbreak & Melancholy", 
      icon: CloudRain, 
      color: "from-blue-600/35 via-slate-900/20 to-bg-card", 
      border: "hover:border-blue-400/50",
      accent: "text-blue-400"
    },
    { 
      name: "Party", 
      tag: "Dance & Club Beats", 
      icon: PartyPopper, 
      color: "from-purple-600/35 via-fuchsia-900/20 to-bg-card", 
      border: "hover:border-purple-400/50",
      accent: "text-purple-400"
    },
    { 
      name: "Sufi", 
      tag: "Qawwali & Soulful", 
      icon: Feather, 
      color: "from-teal-600/35 via-emerald-900/20 to-bg-card", 
      border: "hover:border-teal-400/50",
      accent: "text-teal-400"
    },
    { 
      name: "Lo-Fi", 
      tag: "Chill, Study & Relax", 
      icon: Coffee, 
      color: "from-cyan-600/35 via-sky-900/20 to-bg-card", 
      border: "hover:border-cyan-400/50",
      accent: "text-cyan-400"
    },
    { 
      name: "Hip-Hop", 
      tag: "Rap, Trap & Flow", 
      icon: Mic2, 
      color: "from-yellow-600/35 via-amber-950/20 to-bg-card", 
      border: "hover:border-yellow-400/50",
      accent: "text-yellow-400"
    },
    { 
      name: "Acoustic", 
      tag: "Unplugged & Classical", 
      icon: Guitar, 
      color: "from-lime-600/35 via-emerald-950/20 to-bg-card", 
      border: "hover:border-lime-400/50",
      accent: "text-lime-400"
    }
  ];

  useEffect(() => {
    getallSongs().then((res) => {
      if (res?.data) {
        setAllSongs(res.data);
      }
    });
  }, []);

  const filteredSongs = allSongs.filter((song) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || 
      song.title?.toLowerCase().includes(q) ||
      song.artist?.toLowerCase().includes(q) ||
      song.genre?.toLowerCase().includes(q);
    
    if (!matchesQuery) return false;
    if (!selectedCategory) return true;

    const cat = selectedCategory.toLowerCase();
    const songGenre = (song.genre || '').toLowerCase();
    const songTitle = (song.title || '').toLowerCase();
    const songArtist = (song.artist || '').toLowerCase();

    return songGenre.includes(cat) || songTitle.includes(cat) || songArtist.includes(cat);
  });

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 w-full h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
          
          {/* Search Header Banner */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search & Discovery</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Explore Categories & Moods
              </h1>
              <p className="text-xs md:text-sm text-text-muted mt-1">
                Filter music by emotion, devotion, romance, and frequency.
              </p>
            </div>

            {/* Big Interactive Search Input */}
            <div className="relative max-w-2xl">
              <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by song title, artist, or category (e.g. Love, Bhakti, Sad)..."
                className="w-full bg-white/[0.04] border border-white/10 focus:border-accent rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none transition-all placeholder:text-text-muted/50 focus:shadow-[0_0_20px_rgba(200,245,90,0.15)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categories Filters & Active Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Curated Moods & Categories</h2>
                <p className="text-xs text-text-muted mt-0.5">Click any mood to filter songs instantaneously</p>
              </div>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs font-bold text-accent hover:underline uppercase tracking-wider"
                >
                  Reset Filter ({selectedCategory})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                    className={`group h-36 rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${cat.color} ${
                      isSelected 
                        ? 'border-accent ring-2 ring-accent/30 shadow-accent-glow scale-[1.02]' 
                        : `border-white/10 ${cat.border} hover:scale-[1.02]`
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
                        {cat.tag}
                      </span>
                      <div className={`w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center ${cat.accent} group-hover:scale-110 transition-all`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Search / Filter Results List */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {query || selectedCategory ? `Results (${filteredSongs.length})` : 'All Tracks'}
              </h2>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="premium-card p-12 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto text-text-muted">
                  <Music className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white">No tracks found</p>
                <p className="text-xs text-text-muted">Try searching with a different keyword or reset genre filters.</p>
              </div>
            ) : (
              <div className="bg-bg-secondary/60 border border-white/[0.06] rounded-2xl p-2 md:p-3 space-y-1 shadow-sm">
                {filteredSongs.map((song, i) => (
                  <SongRow
                    key={song._id}
                    index={i + 1}
                    song={song}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Search;
