import React, { useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Music, 
  Radio, 
  Volume2 
} from 'lucide-react';
import usePlayerStore from "../../store/playerStore";
import useRoomStore from "../../store/roomStore";
import usePlayer from "../../hooks/usePlayer.js";
import socket, { syncPause, syncPlay, syncSeek, syncSkip } from "../../socket/socket.js";
import { useParams } from 'react-router-dom';

const RoomPlayer = () => {
  const { howlRef, handleSeek } = usePlayer();
  const { id: roomId } = useParams();
  
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    volume, 
    setVolume,
    setIsPlaying,
    queue,
    setSong
  } = usePlayerStore();

  useEffect(() => {
    const onPlaySong = (data) => {
      const song = queue.find((item) => item.audio === data.songUrl);
      if (!song) return;
      setSong(song);
      setIsPlaying(true);
      const syncedPosition = Math.max(0, (Date.now() - data.startedAt) / 1000);

      setTimeout(() => {
        if (howlRef.current && howlRef.current.state === "loaded") {
          howlRef.current.seek(syncedPosition);
        }
      }, 120);
    };
  
    const onPauseSong = (data) => {
      if (howlRef.current && howlRef.current.state === "loaded") {
        howlRef.current.seek(data.position || 0);
        howlRef.current.pause();
      }
      setIsPlaying(false);
    };

    const onSeekSong = (data) => {
      if (howlRef.current && howlRef.current.state === "loaded") {
        howlRef.current.seek(data.position || 0);
      }
    };

    const onSkipSong = (data) => {
      if (currentTrack?.audio === data.songUrl) return;
      const song = queue.find((item) => item.audio === data.songUrl);
      if (!song) return;
      setSong(song);
    };

    socket.on("playSong", onPlaySong);
    socket.on("pauseSong", onPauseSong);
    socket.on("skipSong", onSkipSong);
    socket.on("seekSong", onSeekSong);

    return () => {
      socket.off("playSong", onPlaySong);
      socket.off("pauseSong", onPauseSong);
      socket.off("skipSong", onSkipSong);
      socket.off("seekSong", onSeekSong);
    };
  }, [queue, setSong, currentTrack?.audio, howlRef]);

  if (!currentTrack) {
    return (
      <div className="premium-card p-4 text-center space-y-1.5">
        <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto text-text-muted">
          <Music className="w-4 h-4" />
        </div>
        <p className="text-xs font-bold text-text-primary">No Track Playing</p>
        <p className="text-[11px] text-text-muted">Select a song from Up Next to broadcast.</p>
      </div>
    );
  }

  const formatTime = (second) => {
    if (!second || isNaN(second)) return "0:00";
    const mins = Math.floor(second / 60);
    const sec = Math.floor(second % 60); 
    return `${mins}:${sec.toString().padStart(2, '0')}`;
  };

  const duration = howlRef.current?.duration() || 0;
  const currentTime = howlRef.current?.seek() || 0;

  const onProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    handleSeek(percentage);
    const currentPosition = howlRef.current?.seek() || 0;
    syncSeek(roomId, currentPosition);
  };

  const handleVolume = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleTogglePlayPause = () => {
    const currentPosition = howlRef.current?.seek() || 0;
    if (isPlaying) {
      setIsPlaying(false);
      syncPause(roomId, currentPosition);
    } else {
      setIsPlaying(true);
      if (currentTrack?.audio) {
        syncPlay(roomId, currentTrack?.audio, currentPosition * 1000);
      }
    }
  };

  const handleSkip = (direction) => {
    if (!queue?.length) return;
    const currentIndex = queue.findIndex((song) => song._id === currentTrack._id);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    let nextIndex = safeIndex;
    if (direction === "next") {
      nextIndex = (safeIndex + 1) % queue.length;
    } else if (direction === "prev") {
      nextIndex = safeIndex === 0 ? queue.length - 1 : safeIndex - 1;
    } 
    const nextSong = queue[nextIndex];
    if (!nextSong) return;

    setSong(nextSong);
    syncSkip(roomId, nextSong.audio);
  };

  return (
    <div className="premium-card p-3.5 md:p-4 space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <span className="text-[9px] font-bold uppercase tracking-widest text-accent flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" /> Synced Room Player
        </span>
        <span className="text-[9px] font-mono text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded">
          Lossless Stream
        </span>
      </div>

      {/* Track Art & Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shadow-md bg-bg-card flex-shrink-0">
          {currentTrack.coverimage ? (
            <img 
              src={currentTrack.coverimage} 
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 opacity-80'}`} 
              alt={currentTrack.title} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <Music className="w-5 h-5" />
            </div>
          )}
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
              <div className="equalizer-bar" style={{ height: '8px' }}></div>
              <div className="equalizer-bar" style={{ height: '13px' }}></div>
              <div className="equalizer-bar" style={{ height: '9px' }}></div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[13.5px] font-bold text-white truncate leading-snug">{currentTrack.title}</h3>
          <p className="text-[10.5px] font-medium text-text-muted uppercase tracking-wider truncate mt-0.5">
            {currentTrack.artist || 'Unknown Artist'}
          </p>
          <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 border border-accent/20 rounded text-accent text-[8.5px] font-bold">
            <Radio className="w-2.5 h-2.5" />
            <span>Broadcasting live</span>
          </div>
        </div>
      </div>

      {/* Player Controls & Scrubber */}
      <div className="space-y-2 pt-0.5">
        <div className="flex items-center justify-center gap-3">
          <button 
            type="button" 
            onClick={() => handleSkip("prev")}
            className="w-7.5 h-7.5 rounded-lg border border-white/10 bg-white/[0.03] text-text-muted hover:text-text-primary hover:border-white/20 transition-all flex items-center justify-center active:scale-90"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5 fill-current" />
          </button>
          
          <button 
            type="button" 
            className="w-9 h-9 rounded-full bg-accent hover:bg-accent-hover text-bg-primary shadow-accent-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            onClick={handleTogglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4.5 h-4.5 fill-current" />
            ) : (
              <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
            )}
          </button>

          <button 
            type="button" 
            onClick={() => handleSkip("next")}
            className="w-7.5 h-7.5 rounded-lg border border-white/10 bg-white/[0.03] text-text-muted hover:text-text-primary hover:border-white/20 transition-all flex items-center justify-center active:scale-90"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Progress Scrubber */}
        <div className="space-y-1">
          <div 
            className="w-full h-1.5 bg-white/[0.08] hover:h-2 rounded-full overflow-hidden cursor-pointer transition-all relative"
            onClick={onProgressClick}
          >
            <div 
              className="h-full bg-accent shadow-[0_0_8px_#c8f55a] transition-all duration-100" 
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[9px] text-text-muted font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 pt-0.5">
          <Volume2 className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPlayer;