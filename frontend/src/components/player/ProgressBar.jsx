import React from 'react';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full flex items-center gap-3 group cursor-pointer">
      <span className="text-[10px] font-mono text-zinc-700 w-8 text-right">0:00</span>
      <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-[10px] font-mono text-zinc-700 w-8">3:45</span>
    </div>
  );
};

export default ProgressBar;
