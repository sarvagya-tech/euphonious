import React from 'react';
import { Play, Pause, Music } from 'lucide-react';
import usePlayerStore from '../../store/playerStore.js';
import useAuthCheck from '../../hooks/useAuthCheck.js';

const SongCard = ({ song }) => {
  const { currentTrack, isPlaying, setSong, togglePlayPause } = usePlayerStore();
  const { checkAuth } = useAuthCheck();
  
  const isCurrentSong = currentTrack?._id === song._id;
  const isThisSongPlaying = isCurrentSong && isPlaying;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (!checkAuth('Please log in to play music')) {
      return;
    }

    if (isCurrentSong) {
      togglePlayPause();
    } else {
      setSong(song);
    }
  };

  return (
    <div 
      className={`premium-card p-4 group cursor-pointer relative overflow-hidden transition-all duration-300 ${
        isCurrentSong 
          ? 'border-accent/30 bg-accent/[0.04] shadow-[0_10px_30px_rgba(200,245,90,0.1)]' 
          : 'hover:border-white/20'
      }`}
      onClick={handlePlay}
    >
      {/* Vinyl Disc peek effect behind cover image */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-xl bg-bg-secondary">
        {song.coverimage ? (
          <img
            src={song.coverimage}
            alt={song.title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isThisSongPlaying ? 'scale-105 opacity-100' : 'opacity-85 group-hover:opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted bg-white/[0.02]">
            <Music className="w-8 h-8" />
          </div>
        )}

        {/* Ambient Dark Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Play / Pause Floating Button */}
        <div className={`absolute bottom-3 right-3 transition-all duration-300 transform ${
          isCurrentSong 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
        }`}>
          <div className="w-11 h-11 bg-accent hover:bg-accent-hover text-bg-primary rounded-full flex items-center justify-center shadow-accent-glow hover:scale-110 active:scale-95 transition-all">
            {isThisSongPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </div>
        </div>

        {/* Live Equalizer indicator when playing */}
        {isThisSongPlaying && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-accent/30 flex items-center gap-1 shadow-lg">
            <div className="equalizer-bar" style={{ height: '8px' }}></div>
            <div className="equalizer-bar" style={{ height: '14px' }}></div>
            <div className="equalizer-bar" style={{ height: '10px' }}></div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-accent ml-1 font-mono">Playing</span>
          </div>
        )}
      </div>

      {/* Track Metadata */}
      <div className="px-1">
        <h4 className={`text-[14px] font-bold truncate mb-1 transition-colors ${
          isCurrentSong ? 'text-accent' : 'text-text-primary group-hover:text-accent'
        }`}>
          {song.title}
        </h4>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11.5px] font-medium text-text-muted truncate uppercase tracking-wider">
            {song.artist || 'Unknown Artist'}
          </p>
          {song.genre && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted/70 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5 flex-shrink-0">
              {song.genre}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
