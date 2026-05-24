import React, { useEffect } from 'react';
import useRoomStore from '../../store/roomStore.js';

const ChatMessage = () => {
 

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group animate-in fade-in slide-in-from-bottom-1 duration-500`}>
      <div className="flex items-center gap-3 mb-2 px-1">
        {!isMe && <span className="text-[9px] font-black text-white uppercase tracking-ultra-wide">{user}</span>}
        <span className="text-[8px] text-zinc-700 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{time}</span>
      </div>
      <div className={`max-w-[90%] p-4 rounded-[20px] ${isMe ? 'bg-white text-black font-semibold' : 'bg-white/[0.03] text-zinc-300 border border-white/[0.03]'}`}>
        <p className="text-[13px] leading-relaxed">{ message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
