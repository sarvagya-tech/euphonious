import React from 'react';

const VolumeSlider = ({ volume = 60 }) => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer w-24">
      <span className="material-symbols-rounded text-xl transition-colors">
        {volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
      </span>
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
