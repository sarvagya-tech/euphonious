import React, { useState } from 'react';
import { Play, Pause, Music, Heart } from 'lucide-react';
import usePlayerStore from '../../store/playerStore.js';

const SongRow = ({ index, song }) => {
  const { currentTrack, isPlaying, setSong, togglePlayPause } = usePlayerStore();
  const [isLiked, setIsLiked] = useState(false);

  const isCurrentSong = currentTrack?._id === song._id;
  const isThisSongPlaying = isCurrentSong && isPlaying;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      setSong(song);
    }
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'number' && Number.isFinite(duration)) {
      const minutes = Math.floor(duration / 60);
      const seconds = String(duration % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
    return duration || '3:45';
  };

  return (
    <div
      className={`flex items-center gap-4 md:gap-6 py-3 px-4 md:px-5 rounded-xl transition-all duration-200 group cursor-pointer border ${
        isCurrentSong 
          ? 'bg-white/[0.06] border-accent/25 shadow-sm' 
          : 'border-transparent hover:bg-white/[0.03] hover:border-white/10'
      }`}
      onClick={handlePlay}
    >
      {/* Index or Equalizer or Play Button */}
      <div className="w-8 flex items-center justify-center flex-shrink-0">
        {isThisSongPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5">
            <div className="equalizer-bar" style={{ height: '8px' }}></div>
            <div className="equalizer-bar" style={{ height: '14px' }}></div>
            <div className="equalizer-bar" style={{ height: '10px' }}></div>
          </div>
        ) : isCurrentSong ? (
          <Play className="w-4 h-4 fill-current text-accent ml-0.5" />
        ) : (
          <>
            <span className="font-mono text-text-muted text-[12px] group-hover:hidden select-none">
              {String(index).padStart(2, '0')}
            </span>
            <Play className="w-4 h-4 fill-current text-text-primary hidden group-hover:block ml-0.5 transition-transform group-hover:scale-110" />
          </>
        )}
      </div>

      {/* Song Cover & Title */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-bg-card border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-accent/40 transition-all shadow-sm">
          {song.coverimage ? (
            <img
              src={song.coverimage}
              alt=""
              className={`w-full h-full object-cover transition-opacity ${isThisSongPlaying ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <Music className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="truncate">
          <p className={`text-[13.5px] font-bold truncate transition-colors ${
            isCurrentSong ? 'text-accent' : 'text-text-primary group-hover:text-accent'
          }`}>
            {song.title}
          </p>
          <p className="text-[11px] font-medium text-text-muted mt-0.5 truncate uppercase tracking-wider">
            {song.artist || 'Unknown Artist'}
          </p>
        </div>
      </div>

      {/* Genre Tag */}
      <div className="hidden md:block w-1/4 truncate">
        <span className="text-[11px] font-medium text-text-muted/80 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5 truncate inline-block">
          {song.genre || "Single"}
        </span>
      </div>

      {/* Like Button & Duration */}
      <div className="flex items-center justify-end gap-5 w-28 flex-shrink-0">
        <button 
          type="button"
          className={`transition-all duration-200 ${
            isLiked 
              ? 'text-accent opacity-100' 
              : 'text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Like track"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent' : ''}`} />
        </button>

        <span className="text-text-muted font-mono text-[11.5px] w-12 text-right">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
};

export default SongRow;
