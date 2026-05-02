import React from 'react';

const PlaylistCard = ({ name, description, cover }) => {
  return (
    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 hover:bg-zinc-800/50 transition-all cursor-pointer group">
      <div className="aspect-square rounded-xl overflow-hidden mb-4 shadow-xl">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={cover} alt={name} />
      </div>
      <h3 className="text-white font-headline-sm truncate">{name}</h3>
      <p className="text-zinc-500 text-xs line-clamp-2">{description}</p>
    </div>
  );
};

export default PlaylistCard;
