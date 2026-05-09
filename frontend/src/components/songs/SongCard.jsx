import React from 'react';
import usePlayerStore from '../../store/playerStore.js';

const SongCard = ({ song }) => {
  const { currentTrack, isPlaying, setSong, togglePlayPause } = usePlayerStore();
  
  const isCurrentSong = currentTrack?._id === song._id;
  const isThisSongPlaying = isCurrentSong && isPlaying;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      setSong(song);
    }
  };

  return (
    <div 
      className={`premium-card p-4 group cursor-pointer relative transition-all duration-300 ${isCurrentSong ? 'bg-white/[0.05] border-accent/20' : 'border-transparent'}`}
      onClick={handlePlay}
    >
      <div className="relative aspect-square rounded-md overflow-hidden mb-4 shadow-premium group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-500">
        <img
          src={song.coverimage}
          alt={song.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isThisSongPlaying ? 'scale-105 opacity-100' : 'opacity-80'}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-accent-glow hover:scale-110 transition-transform">
            <span className="material-symbols-rounded text-bg-primary text-3xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isThisSongPlaying ? 'pause' : 'play_arrow'}
            </span>
          </div>
        </div>

        {/* Now Playing Indicator */}
        {isThisSongPlaying && (
          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full shadow-accent-glow animate-pulse"></div>
        )}
      </div>

      <div className="px-1">
        <h4 className={`text-[14px] font-bold truncate mb-1 transition-colors ${isCurrentSong ? 'text-accent' : 'text-text-primary group-hover:text-accent'}`}>
          {song.title}
        </h4>
        <p className="text-[11px] font-medium text-text-muted truncate uppercase tracking-widest">
          {song.artist}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
