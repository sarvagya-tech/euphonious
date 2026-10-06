import React, { useEffect, useState } from 'react';
import { Sparkles, Radio, Play, Flame, ArrowRight, Disc } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import SongCard from '../components/songs/SongCard';
import SongRow from '../components/songs/SongRow';
import { getallSongs } from '../services/song.service';
import usePlayerStore from '../store/playerStore';

const Home = () => {
  const { currentTrack, recentlyPlayed, setSong, isPlaying, togglePlayPause } = usePlayerStore();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getallSongs().then((data) => {
      if (data && data.data) {
        setFeatured(data.data);
      }
    });
  }, []);

  const topSong = featured[0];

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto">
          
          {/* Dynamic Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-10 bg-gradient-to-br from-white/[0.06] via-bg-card to-bg-secondary shadow-elevated">
            {/* Ambient Background Glows */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-accent text-xs font-bold tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Frequency</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Experience Sound in Sync.
                </h1>
                <p className="text-sm md:text-[15px] text-text-muted leading-relaxed font-medium">
                  Listen together in live rooms, build shared archives, and explore high-fidelity curated audio.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/room"
                    className="bg-accent hover:bg-accent-hover text-bg-primary font-bold py-2.5 px-5 rounded-xl transition-all shadow-accent-glow flex items-center gap-2 text-xs tracking-wider uppercase active:scale-95"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Join a Room</span>
                  </Link>
                  <Link
                    to="/search"
                    className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-text-primary font-bold py-2.5 px-5 rounded-xl transition-all text-xs tracking-wider uppercase"
                  >
                    <span>Browse Genres</span>
                  </Link>
                </div>
              </div>

              {/* Hero Featured Mini Player Chip */}
              {topSong && (
                <div 
                  onClick={() => setSong(topSong)}
                  className="bg-black/40 border border-white/10 backdrop-blur-xl p-3 md:p-3.5 rounded-2xl flex items-center gap-3.5 hover:border-accent/40 transition-all cursor-pointer group shadow-premium max-w-sm w-full md:w-auto"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-bg-card border border-white/10 shadow-md">
                    <img src={topSong.coverimage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-5 h-5 text-accent fill-accent ml-0.5" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest font-mono">Trending Now</span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-accent transition-colors">{topSong.title}</h4>
                    <p className="text-[11px] text-text-muted truncate">{topSong.artist}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Tracks Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Featured Tracks</h2>
                <p className="text-xs text-text-muted mt-0.5">Top picks hand-selected for today's session</p>
              </div>
              <Link 
                to="/search" 
                className="text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors flex items-center gap-1.5 group"
              >
                <span>Explore All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {featured.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          </section>

          {/* Recently Played - Ordered from Most Recently Listened (front) */}
          {recentlyPlayed && recentlyPlayed.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Recently Played</h2>
                  <p className="text-xs text-text-muted mt-0.5">Latest songs you tuned into, starting with the most recent</p>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                {recentlyPlayed.map((song, i) => {
                  const isCurrent = currentTrack?._id === song._id || currentTrack?.audio === song.audio;
                  const isThisPlaying = isCurrent && isPlaying;
                  const cover = song.coverimage || song.coverImage || song.image;

                  return (
                    <div 
                      key={song._id || song.audio || i} 
                      onClick={() => {
                        if (isCurrent) {
                          togglePlayPause();
                        } else {
                          setSong(song);
                        }
                      }}
                      className={`min-w-[150px] max-w-[150px] p-3 rounded-2xl transition-all group cursor-pointer border ${
                        isCurrent
                          ? 'bg-accent/[0.06] border-accent/35 shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-bg-card border border-white/10 mb-2.5 shadow-md">
                        {cover ? (
                          <img 
                            src={cover} 
                            alt={song.title} 
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                              isThisPlaying ? 'scale-105 opacity-100' : 'opacity-85 group-hover:opacity-100'
                            }`} 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted">
                            <Disc className="w-6 h-6" />
                          </div>
                        )}

                        {/* Floating Play / Equalizer Overlay */}
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                          isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          {isThisPlaying ? (
                            <div className="flex items-center gap-0.5">
                              <div className="equalizer-bar" style={{ height: '8px' }}></div>
                              <div className="equalizer-bar" style={{ height: '14px' }}></div>
                              <div className="equalizer-bar" style={{ height: '10px' }}></div>
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-accent text-bg-primary flex items-center justify-center shadow-accent-glow">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          )}
                        </div>

                        {/* Order indicator for most recent */}
                        {i === 0 && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-accent text-bg-primary text-[8.5px] font-bold uppercase tracking-wider shadow">
                            Latest
                          </span>
                        )}
                      </div>

                      <h5 className={`text-[12.5px] font-bold truncate transition-colors ${
                        isCurrent ? 'text-accent' : 'text-white group-hover:text-accent'
                      }`}>
                        {song.title}
                      </h5>
                      <p className="text-[10.5px] font-medium text-text-muted truncate mt-0.5">
                        {song.artist || 'Unknown Artist'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Top Selection List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Top Selection</h2>
                <p className="text-xs text-text-muted mt-0.5">Community curated chart</p>
              </div>
            </div>

            <div className="bg-bg-secondary/60 border border-white/[0.06] rounded-2xl p-2 md:p-3 space-y-1 shadow-sm">
              {featured.map((song, i) => (
                <SongRow
                  key={song._id}
                  index={i + 1}
                  song={song}
                />
              ))}
            </div>
          </section>

        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Home;
