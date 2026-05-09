import React from 'react';
import usePlayerStore from '../../store/playerStore.js';
import usePlayer from '../hooks/usePlayer.js';

const MusicPlayer = () => {
  const { howlRef, handleSeek } = usePlayer();
  
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

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-player-height bg-bg-secondary/95 backdrop-blur-xl border-t border-border-primary z-50 px-6 flex items-center justify-between">
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-14 h-14 rounded-lg overflow-hidden border border-border-primary flex-shrink-0 group relative shadow-premium">
          <img 
            src={currentTrack.coverimage} 
            alt={currentTrack.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100 opacity-80'}`} 
          />
        </div>
        <div className="truncate max-w-[180px]">
          <h5 className="text-[14px] font-bold text-text-primary truncate cursor-pointer hover:text-accent transition-colors">
            {currentTrack.title}
          </h5>
          <p className="text-[11px] font-medium text-text-muted truncate cursor-pointer hover:text-text-primary transition-colors">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
        <div className="flex items-center gap-8 text-text-muted">
          <button className="hover:text-accent transition-colors"><span className="material-symbols-rounded text-xl">shuffle</span></button>
          <button className="text-text-primary hover:text-accent transition-all active:scale-90"><span className="material-symbols-rounded text-3xl">skip_previous</span></button>
          
          <button 
            onClick={togglePlayPause}
            className="w-10 h-10 bg-text-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-accent-glow"
          >
            <span className="material-symbols-rounded text-bg-primary text-2xl font-black">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button className="text-text-primary hover:text-accent transition-all active:scale-90"><span className="material-symbols-rounded text-3xl">skip_next</span></button>
          <button className="hover:text-accent transition-colors"><span className="material-symbols-rounded text-xl">repeat</span></button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3 group px-4">
          <span className="text-[10px] mono-text text-text-muted w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-border-primary rounded-full relative overflow-hidden cursor-pointer"
            onClick={onProgressClick}
          >
            <div 
              className="absolute inset-0 bg-accent transition-all duration-100 shadow-accent-glow"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] mono-text text-text-muted w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Utils */}
      <div className="flex items-center justify-end gap-6 w-1/4">
        <div className="flex items-center gap-3 w-32 group">
          <button onClick={toggleMute} className="text-text-muted hover:text-text-primary transition-colors">
            <span className="material-symbols-rounded text-xl">
              {muted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
            </span>
          </button>
          <input 
            type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-border-primary rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
