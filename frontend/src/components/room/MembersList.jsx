import React from 'react';
import useRoomStore from '../../store/roomStore.js';  
import { useEffect } from 'react';
const MembersList = () => {
  const { members } = useRoomStore();
  console.log(members);
  return (
    <div className="w-80 bg-bg-secondary border border-border-primary rounded-lg overflow-hidden flex flex-col shadow-premium">
      <div className="px-6 py-4 border-b border-border-primary">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
          <span className="material-symbols-rounded text-sm">groups</span> Listeners (24)
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-all cursor-pointer group">
            <div className="relative">
              <img src={m.avatar} className="w-9 h-9 rounded-full object-cover border border-border-primary group-hover:border-accent/40 transition-all" alt="" />
              {/* <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-secondary ${
                m.isOnline ? 'bg-accent shadow-accent-glow' : 'bg-text-muted'
              }`}></div> */}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-text-primary truncate">{m.fullname}</p>
              {/* <p className={`text-[10px] font-medium uppercase tracking-wider ${
                m.isOnline ? 'text-accent/60' : 'text-text-muted'
              }`}>{m.isOnline ? 'online' : 'offline'}</p> */}
            </div>
            <span className="material-symbols-rounded text-lg text-text-muted opacity-0 group-hover:opacity-100 transition-all">more_vert</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
