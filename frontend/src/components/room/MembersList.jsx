import React from 'react';
import { Users, Crown } from 'lucide-react';
import useRoomStore from '../../store/roomStore.js';

const MembersList = () => {
  const { members, currentRoom } = useRoomStore();

  return (
    <div className="bg-bg-secondary border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col shadow-premium">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-accent" /> Active Listeners
        </h3>
        <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
          {members.length} Online
        </span>
      </div>

      {/* Member List */}
      <div className="max-h-56 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {members.length === 0 ? (
          <p className="text-xs text-text-muted/60 p-4 text-center italic">Waiting for listeners to join...</p>
        ) : (
          members.map((member, idx) => {
            const isHost = currentRoom?.hostedBy?._id === member._id || currentRoom?.hostedBy === member._id;
            return (
              <div 
                key={member._id || idx} 
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-all group"
              >
                <div className="relative">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-accent/40 transition-all"
                      alt={member.fullname || 'Listener'}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[11px] font-bold text-text-primary">
                      {(member.fullname || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-bg-secondary"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-text-primary truncate">{member.fullname || 'Anonymous Listener'}</p>
                    {isHost && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                        <Crown className="w-2.5 h-2.5" /> Host
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MembersList;
