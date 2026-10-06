import React, { useEffect, useState } from 'react';
import { Play, Music, Clock, Hash, Type, Disc, Sparkles, Plus } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import PlaylistSongRow from '../components/playlist/PlaylistSongRow';
import { getPlaylistById } from '../services/playlist.service';
import { useParams, Link } from 'react-router-dom';
import usePlayerStore from '../store/playerStore';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playlistId } = useParams();
  const { setSong, setQueue } = usePlayerStore();
  
  useEffect(() => {
    if (!playlistId) return;

    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const response = await getPlaylistById(playlistId);
        setPlaylist(response?.data?.data ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const songs = playlist?.songs ?? [];

  const handlePlayAll = () => {
    if (!songs.length) return;
    setQueue(songs);
    setSong(songs[0]);
  };

  return (
    <div className="bg-bg-primary min-h-screen flex selection:bg-accent/20 text-text-primary">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pb-40">
        <Navbar />
        
        {/* Cinematic Header with Cover Backdrop */}
        <div className="relative pt-24 pb-10 px-6 md:px-10 overflow-hidden">
          {/* Ambient Glow from Cover */}
          {playlist?.coverImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center blur-[90px] opacity-20 pointer-events-none scale-125"
              style={{ backgroundImage: `url(${playlist.coverImage})` }}
            />
          )}

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-bg-card border border-white/10 shadow-elevated group cursor-pointer relative flex-shrink-0">
              {playlist?.coverImage ? (
                <img
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  src={playlist.coverImage}
                  alt={playlist.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted bg-white/[0.02]">
                  <Disc className="w-16 h-16" />
                </div>
              )}
              <div 
                onClick={handlePlayAll}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-accent-glow text-bg-primary">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-accent text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Playlist Archive
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {loading ? 'Loading playlist...' : (playlist?.name || 'Untitled Playlist')}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-2">
                <button 
                  type="button"
                  onClick={handlePlayAll}
                  disabled={!songs.length}
                  className="bg-accent hover:bg-accent-hover text-bg-primary font-bold py-3 px-8 rounded-full flex items-center gap-2.5 transition-all shadow-accent-glow text-xs uppercase tracking-wider active:scale-95 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play All Tracks</span>
                </button>

                <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
                  <span className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-lg">
                    <Music className="w-3.5 h-3.5 text-accent" />
                    {songs.length} Tracks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks List Section */}
        <section className="px-6 md:px-10 space-y-3">
          <div className="mb-2 grid grid-cols-[56px_minmax(0,1.8fr)_minmax(0,1fr)_88px] md:grid-cols-[72px_minmax(0,2fr)_minmax(0,1fr)_124px] gap-4 px-4 md:px-6 py-3 text-text-muted text-[10.5px] font-bold uppercase tracking-[0.25em] border-b border-white/[0.06]">
            <span className="flex items-center justify-center">
              <Hash className="w-3.5 h-3.5" />
            </span>
            <span className="flex items-center gap-2">
              <Type className="w-3.5 h-3.5" /> Track Title
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Disc className="w-3.5 h-3.5" /> Album / Genre
            </span>
            <span className="flex items-center justify-end gap-2">
              <Clock className="w-3.5 h-3.5" /> Time
            </span>
          </div>
          
          {songs.length === 0 ? (
            <div className="premium-card p-12 text-center space-y-3">
              <p className="text-sm font-semibold text-text-primary">This playlist has no tracks yet.</p>
              <Link 
                to="/search" 
                className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add tracks from explore
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {songs.map((song, i) => (
                <PlaylistSongRow key={song._id || i} index={i + 1} song={song} />
              ))}
            </div>
          )}
        </section>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Playlist;
