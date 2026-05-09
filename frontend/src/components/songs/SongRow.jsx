import React from 'react';
import usePlayerStore from '../../store/playerStore.js';

const SongRow = ({ index, song }) => {
  const { currentTrack, isPlaying, setSong, togglePlayPause } = usePlayerStore();

  const isCurrentSong = currentTrack?._id === song._id;
  const isThisSongPlaying = isCurrentSong && isPlaying;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      setSong(song);
    }
  };

  return (
    <div
      className={`flex items-center gap-6 py-3 px-6 rounded-md hover:bg-white/[0.03] transition-all duration-200 group cursor-pointer border border-transparent ${isCurrentSong ? 'bg-white/[0.05] border-accent/10' : 'hover:border-border-hover'
        }`}
      onClick={handlePlay}
    >
      <div className="w-8 text-center flex items-center justify-center">
        {isThisSongPlaying ? (
          <div className="flex gap-0.5 items-end h-3">
            <div className="w-1 bg-accent animate-[bounce_0.5s_infinite]"></div>
            <div className="w-1 bg-accent animate-[bounce_0.8s_infinite]"></div>
            <div className="w-1 bg-accent animate-[bounce_0.6s_infinite]"></div>
          </div>
        ) : isCurrentSong ? (
          <span className="material-symbols-rounded text-accent text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        ) : (
          <>
            <span className="mono-text text-text-muted text-[12px] group-hover:hidden">{index}</span>
            <span className="material-symbols-rounded text-text-primary hidden group-hover:block text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-md bg-bg-card border border-border-primary overflow-hidden flex-shrink-0 group-hover:border-border-hover transition-all">
          {song.coverimage ? (
            <img
              src={song.coverimage}
              alt=""
              className={`w-full h-full object-cover transition-opacity ${isThisSongPlaying ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-rounded text-text-muted text-lg">music_note</span>
            </div>
          )}
        </div>
        <div className="truncate">
          <p className={`text-[14px] font-bold truncate transition-colors ${isCurrentSong ? 'text-accent' : 'text-text-primary group-hover:text-accent'
            }`}>
            {song.title}
          </p>
          <p className="text-[11px] font-medium text-text-muted mt-0.5 truncate uppercase tracking-wider">
            {song.artist}
          </p>
        </div>
      </div>

      <span className="text-text-muted text-[13px] font-medium truncate hidden md:block w-1/4">
        {song.genre || "Single"}
      </span>

      <div className="flex items-center justify-end gap-8 w-32">
        <button className="text-text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="material-symbols-rounded text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
        <span className="text-text-muted mono-text text-[12px] w-12 text-right">
          {song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : "3:45"}
        </span>
      </div>
    </div>
  );
};

export default SongRow;
