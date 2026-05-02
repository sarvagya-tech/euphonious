import React from 'react';

const SongCard = ({ title, artist, image, isPlaying }) => {
  return (
    <div className="premium-card p-4 group cursor-pointer relative">
      <div className="relative aspect-square rounded-md overflow-hidden mb-4 shadow-premium group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-500">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-accent-glow hover:scale-110 transition-transform">
            <span className="material-symbols-rounded text-bg-primary text-3xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full shadow-accent-glow animate-pulse"></div>
        )}
      </div>

      <div className="px-1">
        <h4 className="text-[14px] font-bold text-text-primary truncate mb-1 group-hover:text-accent transition-colors">{title}</h4>
        <p className="text-[11px] font-medium text-text-muted truncate uppercase tracking-widest">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
