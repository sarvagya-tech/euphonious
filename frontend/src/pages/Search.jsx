import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Cpu, 
  Cloud, 
  Factory, 
  Activity, 
  Home, 
  Snowflake, 
  Radio, 
  FlaskConical, 
  ArrowRight,
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
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = [
    { name: "Electronic", icon: Cpu, color: "from-blue-600/30 to-indigo-900/30", border: "hover:border-blue-400/40" },
    { name: "Ambient", icon: Cloud, color: "from-teal-600/30 to-emerald-900/30", border: "hover:border-teal-400/40" },
    { name: "Industrial", icon: Factory, color: "from-orange-600/30 to-red-900/30", border: "hover:border-orange-400/40" },
    { name: "Techno", icon: Activity, color: "from-lime-600/30 to-emerald-900/30", border: "hover:border-lime-400/40" },
    { name: "House", icon: Home, color: "from-purple-600/30 to-pink-900/30", border: "hover:border-purple-400/40" },
    { name: "Chill", icon: Snowflake, color: "from-cyan-600/30 to-blue-900/30", border: "hover:border-cyan-400/40" },
    { name: "Radio Hits", icon: Radio, color: "from-amber-600/30 to-yellow-900/30", border: "hover:border-amber-400/40" },
    { name: "Experimental", icon: FlaskConical, color: "from-fuchsia-600/30 to-purple-900/30", border: "hover:border-fuchsia-400/40" }
  ];

  useEffect(() => {
    getallSongs().then((res) => {
      if (res?.data) {
        setAllSongs(res.data);
      }
    });
  }, []);

  const filteredSongs = allSongs.filter((song) => {
    const matchesQuery = !query.trim() || 
      song.title?.toLowerCase().includes(query.toLowerCase()) ||
      song.artist?.toLowerCase().includes(query.toLowerCase()) ||
      song.genre?.toLowerCase().includes(query.toLowerCase());
    
    const matchesGenre = !selectedGenre || 
      song.genre?.toLowerCase() === selectedGenre.toLowerCase();

    return matchesQuery && matchesGenre;
  });

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
          
          {/* Search Header Banner */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search & Filter</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Explore Archives
              </h1>
              <p className="text-xs md:text-sm text-text-muted mt-1">
                Browse through genres, artists, and live community tracks.
              </p>
            </div>

            {/* Big Interactive Search Input */}
            <div className="relative max-w-2xl">
              <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by track name, artist, or genre..."
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

          {/* Genre Filters & Active Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">Browse Genres</h2>
              {selectedGenre && (
                <button
                  type="button"
                  onClick={() => setSelectedGenre(null)}
                  className="text-xs font-bold text-accent hover:underline uppercase tracking-wider"
                >
                  Reset Filter ({selectedGenre})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map((genre, i) => {
                const Icon = genre.icon;
                const isSelected = selectedGenre === genre.name;
                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedGenre(isSelected ? null : genre.name)}
                    className={`group h-36 rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${genre.color} ${
                      isSelected 
                        ? 'border-accent ring-2 ring-accent/30 shadow-accent-glow scale-[1.02]' 
                        : `border-white/10 ${genre.border} hover:scale-[1.02]`
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
                        Archive
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-accent group-hover:scale-110 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                        {genre.name}
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
                {query || selectedGenre ? `Results (${filteredSongs.length})` : 'All Tracks'}
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
