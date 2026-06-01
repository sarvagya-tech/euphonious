import React from 'react';
import usePlayerStore from '../../store/playerStore.js';

const getTrackKey = (track) => {
  if (!track) return '';
  return track._id || track.audio || `${track.title || ''}-${track.artist || ''}`;
};

const formatDuration = (duration) => {
  if (typeof duration === 'number' && Number.isFinite(duration)) {
    const minutes = Math.floor(duration / 60);
    const seconds = String(duration % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  return duration || '3:45';
};

const PlaylistSongRow = ({ index, song }) => {
  const { currentTrack, isPlaying, setSong, togglePlayPause } = usePlayerStore();

  const isCurrentSong = getTrackKey(currentTrack) === getTrackKey(song);
  const isThisSongPlaying = isCurrentSong && isPlaying;
  const coverImage = song.coverimage || song.image;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlayPause();
      return;
    }

    setSong(song);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border transition-all duration-300 cursor-pointer ${
        isCurrentSong
          ? 'border-accent/25 bg-white/[0.07] shadow-[0_18px_50px_rgba(0,0,0,0.35)]'
          : 'border-white/[0.05] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
      }`}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handlePlay();
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative grid grid-cols-[56px_minmax(0,1.8fr)_minmax(0,1fr)_88px] md:grid-cols-[72px_minmax(0,2fr)_minmax(0,1fr)_124px] items-center gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center justify-center">
          <div
            className={`flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border transition-all duration-300 ${
              isCurrentSong
                ? 'border-accent/30 bg-accent/10 text-accent'
                : 'border-white/[0.06] bg-black/20 text-text-muted group-hover:border-white/10 group-hover:text-text-primary'
            }`}
          >
            {isThisSongPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <div className="w-0.5 rounded-full bg-accent animate-[bounce_0.6s_infinite]"></div>
                <div className="w-0.5 rounded-full bg-accent animate-[bounce_0.8s_infinite]"></div>
                <div className="w-0.5 rounded-full bg-accent animate-[bounce_0.7s_infinite]"></div>
              </div>
            ) : isCurrentSong ? (
              <span
                className="material-symbols-rounded text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            ) : (
              <span className="mono-text text-[12px] font-medium">{index}</span>
            )}
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-4">
          <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-[18px] border border-white/[0.06] bg-bg-card shadow-premium">
            {coverImage ? (
              <img
                src={coverImage}
                alt={song.title}
                className={`h-full w-full object-cover transition-all duration-500 ${
                  isThisSongPlaying ? 'scale-105 opacity-100' : 'opacity-85 group-hover:scale-110 group-hover:opacity-100'
                }`}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.05] to-white/[0.01]">
                <span className="material-symbols-rounded text-text-muted text-2xl">
                  music_note
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
            {isCurrentSong && (
              <div className="absolute left-2 top-2 h-2 w-2 rounded-full bg-accent shadow-accent-glow" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`truncate text-[14px] md:text-[15px] font-bold tracking-tight transition-colors ${
                  isCurrentSong ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                }`}
              >
                {song.title}
              </h3>
              {isCurrentSong && (
                <span className="hidden sm:inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                  {isThisSongPlaying ? 'Playing' : 'Selected'}
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-[0.28em] text-text-muted">
              {song.artist}
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 md:block">
          <p className="truncate text-[13px] font-medium text-text-primary/85">
            {song.album || song.genre || 'Single'}
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted">
            Album
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-text-muted opacity-0 transition-all duration-300 hover:border-accent/20 hover:bg-accent/10 hover:text-accent group-hover:opacity-100 md:flex"
            aria-label={`Like ${song.title}`}
          >
            <span
              className="material-symbols-rounded text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </button>

          <div className="text-right">
            <p className="mono-text text-[12px] font-medium text-text-primary">
              {formatDuration(song.duration)}
            </p>
            <p className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-text-muted lg:block">
              Tap to play
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSongRow;
