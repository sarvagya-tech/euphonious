import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

const VolumeSlider = ({ volume = 60 }) => {
  const renderIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" />;
    if (volume < 50) return <Volume1 className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" />;
    return <Volume2 className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" />;
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer w-24">
      {renderIcon()}
      <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-zinc-600 group-hover:bg-white transition-all duration-300" 
          style={{ width: `${volume}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VolumeSlider;
