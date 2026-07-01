import React, { useEffect, useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import PlaylistSongRow from '../components/playlist/PlaylistSongRow';
import { getPlaylistById } from '../services/playlist.service';
import { useParams } from 'react-router-dom';

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playlistId } = useParams();
  
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
   

  return (
    <div className="bg-black min-h-screen flex selection:bg-white/10">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pb-40">
        <Navbar />
        
        {/* Minimal Header */}
        <header className="pt-32 pb-12 px-10 flex flex-col md:flex-row items-end gap-10">
          <div className="w-64 h-64 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/[0.03] shadow-premium group cursor-pointer relative flex-shrink-0">
            <img
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              src={
                playlist?.coverImage
              }
              alt="Cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span className="material-symbols-rounded text-white text-7xl font-light">play_circle</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-ultra-wide flex items-center gap-2">
              
              </span>
              
            </div>
            <h1 className="text-7xl font-bold text-white tracking-tightest mb-8 leading-none">
              {loading ? 'Loading playlist...' : playlist?.name }
            </h1>
            <div className="flex items-center gap-8">
              <button className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/5 group">
                <span className="material-symbols-rounded text-4xl font-black group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
              <div className="flex items-center gap-6">
                {/* <div className="flex items-center gap-4"> */}
                  {/* <div className="relative">
                    <img className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10" src={} alt="Owner" />
                    <span className="absolute -top-1 -right-1 material-symbols-rounded text-[10px] text-white bg-black rounded-full">verified</span>
                  </div>
                  <span className="text-[14px] font-bold text-white tracking-tight">{}</span>
                </div> */}
                <div className="flex items-center gap-4 text-zinc-600">
                  <span className="text-[13px] font-medium flex items-center gap-2">
                    <span className="material-symbols-rounded text-sm">music_note</span>{' '}
                    {songs.length} Tracks
                  </span>
                  <span className="text-[13px] font-medium flex items-center gap-2">
                    <span className="material-symbols-rounded text-sm">schedule</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* List Section */}
        <section className="px-8">
          <div className="mb-4 grid grid-cols-[56px_minmax(0,1.8fr)_minmax(0,1fr)_88px] md:grid-cols-[72px_minmax(0,2fr)_minmax(0,1fr)_124px] gap-4 px-4 md:px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.32em]">
            <span className="flex items-center justify-center">
              <span className="material-symbols-rounded text-xs">tag</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-rounded text-xs">title</span>
              Track
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="material-symbols-rounded text-xs">album</span>
              Album
            </span>
            <span className="flex items-center justify-end gap-2">
              <span className="material-symbols-rounded text-xs">timer</span>
              Time
            </span>
          </div>
          
          <div className="space-y-3">
            {songs.map((song, i) => (
              <PlaylistSongRow key={song._id} index={i + 1} song={song} />
            ))}
          </div>
        </section>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Playlist;
