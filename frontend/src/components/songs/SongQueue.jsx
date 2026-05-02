import React from 'react';

const SongQueue = () => {
  return (
    <div className="bg-zinc-900/30 rounded-2xl border border-white/5 p-6 h-full">
      <h3 className="text-white font-headline-md mb-6">Up Next</h3>
      <div className="space-y-4">
        {/* Queue items would go here */}
        <p className="text-zinc-500 text-sm italic">Queue is empty</p>
      </div>
    </div>
  );
};

export default SongQueue;
