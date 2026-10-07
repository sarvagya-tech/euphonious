import React, { useState } from 'react';
import { 
  Shuffle, 
  SkipBack, 
  Play, 
  Pause, 
  SkipForward, 
  Repeat, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Heart, 
  Music 
} from 'lucide-react';
import usePlayerStore from '../../store/playerStore.js';
import usePlayer from '../hooks/usePlayer.js';
import useAuthCheck from '../../hooks/useAuthCheck.js';

const MusicPlayer = () => {
  const { howlRef, handleSeek } = usePlayer();
  const { checkAuth } = useAuthCheck();
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    volume, 
    muted,
    togglePlayPause,
    setVolume,
    toggleMute 
  } = usePlayerStore();

  if (!currentTrack) return null;

  const handleTogglePlay = () => {
    if (!checkAuth('Please log in to play music')) return;
    togglePlayPause();
  };

  const handleLike = () => {
    if (!checkAuth('Please log in to like tracks')) return;
    setIsLiked(!isLiked);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const duration = howlRef.current?.duration() || 0;
  const currentTime = howlRef.current?.seek() || 0;

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const onProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    handleSeek(percentage);
  };

  const renderVolumeIcon = () => {
    if (muted || volume === 0) return <VolumeX className="w-4 h-4 text-text-muted hover:text-text-primary" />;
    if (volume < 0.5) return <Volume1 className="w-4 h-4 text-text-muted hover:text-text-primary" />;
    return <Volume2 className="w-4 h-4 text-text-muted hover:text-text-primary" />;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-player-height glass-player z-50 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      
      {/* Left Column: Track Info with Cover Art & Favorite Button */}
      <div className="flex items-center gap-3 w-1/4 min-w-[170px]">
        <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 group shadow-md bg-bg-card">
          {currentTrack.coverimage ? (
            <img 
              src={currentTrack.coverimage} 
              alt={currentTrack.title} 
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 opacity-80'}`} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <Music className="w-4 h-4" />
            </div>
          )}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-0.5 pointer-events-none">
              <div className="equalizer-bar" style={{ height: '7px' }}></div>
              <div className="equalizer-bar" style={{ height: '11px' }}></div>
              <div className="equalizer-bar" style={{ height: '8px' }}></div>
            </div>
          )}
        </div>

        <div className="truncate flex-1 min-w-0">
          <h5 className="text-[13.5px] font-bold text-text-primary truncate hover:text-accent transition-colors cursor-pointer">
            {currentTrack.title}
          </h5>
          <p className="text-[11px] font-medium text-text-muted truncate hover:text-text-primary transition-colors cursor-pointer">
            {currentTrack.artist || 'Unknown Artist'}
          </p>
        </div>

        <button 
          type="button"
          onClick={handleLike}
          className={`hidden sm:flex p-1.5 rounded-full hover:bg-white/5 transition-all ${isLiked ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          aria-label="Like Track"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent' : ''}`} />
        </button>
      </div>

      {/* Center Column: Controls & Dynamic Seekbar */}
      <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5 px-2">
        {/* Buttons Row */}
        <div className="flex items-center gap-6 md:gap-7">
          <button 
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors p-1 rounded-md ${isShuffle ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button 
            type="button"
            className="text-text-muted hover:text-text-primary transition-all active:scale-90"
            title="Previous"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          
          <button 
            type="button"
            onClick={handleTogglePlay}
            className="w-11 h-11 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-accent-glow text-bg-primary"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button 
            type="button"
            className="text-text-muted hover:text-text-primary transition-all active:scale-90"
            title="Next"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button 
            type="button"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition-colors p-1 rounded-md ${isRepeat ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
            title="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        
        {/* Seekbar Container */}
        <div className="w-full flex items-center gap-3 group px-2">
          <span className="text-[10px] font-mono text-text-muted w-9 text-right select-none">
            {formatTime(currentTime)}
          </span>

          <div 
            className="flex-1 h-1.5 bg-white/[0.08] hover:h-2 rounded-full relative cursor-pointer transition-all overflow-hidden"
            onClick={onProgressClick}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-accent group-hover:bg-accent-hover transition-all duration-100 shadow-[0_0_12px_#c8f55a]"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>

          <span className="text-[10px] font-mono text-text-muted w-9 select-none">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right Column: Volume Controller */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[140px]">
        <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full">
          <button 
            type="button"
            onClick={toggleMute} 
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="Mute/Unmute"
          >
            {renderVolumeIcon()}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 md:w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent transition-all hover:bg-white/20"
          />
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
