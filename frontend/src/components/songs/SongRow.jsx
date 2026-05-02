import React from 'react';

const SongRow = ({ index, title, artist, album, duration, image }) => {
  return (
    <div className="flex items-center gap-6 py-3 px-6 rounded-md hover:bg-white/[0.03] transition-all duration-200 group cursor-pointer border border-transparent hover:border-border-hover">
      <div className="w-8 text-center">
        <span className="mono-text text-text-muted text-[12px] group-hover:hidden">{index}</span>
        <span className="material-symbols-rounded text-accent hidden group-hover:block text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
      </div>
      
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-md bg-bg-card border border-border-primary overflow-hidden flex-shrink-0 group-hover:border-border-hover transition-all">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-rounded text-text-muted text-lg">music_note</span>
            </div>
          )}
        </div>
        <div className="truncate">
          <p className="text-[14px] font-bold text-text-primary truncate transition-colors group-hover:text-accent">{title}</p>
          <p className="text-[11px] font-medium text-text-muted mt-0.5 truncate uppercase tracking-wider">{artist}</p>
        </div>
      </div>
      
      <span className="text-text-muted text-[13px] font-medium truncate hidden md:block w-1/4">{album}</span>
      
      <div className="flex items-center justify-end gap-8 w-32">
        <button className="text-text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="material-symbols-rounded text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
        <span className="text-text-muted mono-text text-[12px] w-12 text-right">{duration}</span>
      </div>
    </div>
  );
};

export default SongRow;
