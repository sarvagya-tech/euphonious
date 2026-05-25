import { useState } from 'react';
import useRoomStore from '../../store/roomStore.js'
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore.js';
import { sendMessage } from '../../socket/socket.js';
const ChatBox = () => {
  const { messages } = useRoomStore();
  // input setup 
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  

  const [inputText, setInputText] = useState("");
  const handleSend = () => {
    if (!inputText.trim()) return;
    const currentRoomId = roomId;
    const currentUserId = user?._id;
    sendMessage(currentRoomId, currentUserId, inputText);
    setInputText("")
  }


  return (
    <div className="flex-1 flex flex-col bg-bg-secondary border border-border-primary rounded-lg overflow-hidden shadow-premium">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-rounded text-accent text-xl">forum</span>
          <h3 className="text-[13px] font-bold uppercase tracking-widest text-text-primary">Live Transmission</h3>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded-md border border-accent/20">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-accent-glow"></div>
          <span className="text-[10px] font-bold text-accent mono-text uppercase">Sync Active</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <p className="text-[12px] text-text-muted">No messages yet. Start the conversation.</p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${msg.isMe ? 'text-accent' : 'text-text-muted'}`}>{msg.user}</span>
              <span className="text-[9px] font-medium text-text-muted mono-text">{msg.time}</span>
            </div>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-lg text-[13px] font-medium leading-relaxed shadow-premium border ${msg.isMe
              ? 'bg-accent/5 border-accent/20 text-text-primary'
              : 'bg-bg-card border-border-primary text-text-primary'
              }`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-bg-primary/50 border-t border-border-primary">
        <div className="relative group">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-bg-card border border-border-primary rounded-md py-3 pl-4 pr-12 text-[13px] font-medium text-text-primary outline-none focus:border-accent/40 transition-all placeholder-text-muted"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-md flex items-center justify-center text-bg-primary hover:scale-105 active:scale-95 transition-all shadow-accent-glow"
            onClick={handleSend}>
            <span className="material-symbols-rounded text-lg font-bold">north_east</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
