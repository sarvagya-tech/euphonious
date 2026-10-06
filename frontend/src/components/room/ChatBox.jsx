import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, ArrowDown } from 'lucide-react';
import useRoomStore from '../../store/roomStore.js';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore.js';
import { sendMessage } from '../../socket/socket.js';

const QUICK_REACTIONS = ['🔥', '🎵', '🎧', '❤️', '👏', '⚡', '🙌', '💯'];

const ChatBox = () => {
  const { messages } = useRoomStore();
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  const [inputText, setInputText] = useState("");
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const messagesEndRef = useRef(null);
  const feedContainerRef = useRef(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    setShowScrollBottom(false);
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  const handleScroll = () => {
    if (!feedContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setShowScrollBottom(!isNearBottom);
  };

  const handleSend = (textToSend) => {
    const message = textToSend || inputText;
    if (!message || !message.trim()) return;
    sendMessage(roomId, user?._id, message.trim());
    if (!textToSend) {
      setInputText("");
    }
  };

  const getUserInitials = (name) => {
    if (!name) return '?';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-secondary border border-white/[0.08] rounded-2xl overflow-hidden shadow-premium h-full min-h-0 relative">
      {/* Chat Header */}
      <div className="px-4 py-2.5 md:px-5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">Room Chat</h3>
              <span className="text-[9.5px] font-mono text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded">
                {messages.length} messages
              </span>
            </div>
            <p className="text-[10px] text-text-muted">Live discussion synced with frequency</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-accent/10 rounded-full border border-accent/20">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
          <span className="text-[9px] font-bold text-accent font-mono uppercase tracking-wider">Live Feed</span>
        </div>
      </div>

      {/* Messages Feed Area - Fills available height */}
      <div 
        ref={feedContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-3.5 md:p-4 space-y-3 custom-scrollbar min-h-0 relative"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-text-muted">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-text-muted">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-0.5">Room Chat is Ready</p>
              <p className="text-xs max-w-xs text-text-muted leading-relaxed">
                Be the first to speak. Say hello or share your reaction to the current audio frequency!
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1 flex-wrap justify-center">
              {['🔥 Loving this!', '🎵 What track is this?', '🎧 Sounds crisp!'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSend(preset)}
                  className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-accent hover:text-bg-primary border border-white/10 hover:border-accent text-xs font-semibold text-text-muted transition-all active:scale-95"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-2.5 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
            >
              {/* User Avatar Circle */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 border shadow-sm ${
                msg.isMe 
                  ? 'bg-accent text-bg-primary border-accent' 
                  : 'bg-white/[0.06] text-white border-white/10'
              }`}>
                {getUserInitials(msg.user)}
              </div>

              {/* Message Content Container */}
              <div className={`flex flex-col max-w-[82%] md:max-w-[78%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-0.5 px-1">
                  <span className={`text-[10.5px] font-bold tracking-wider ${
                    msg.isMe ? 'text-accent' : 'text-text-muted'
                  }`}>
                    {msg.isMe ? 'You' : msg.user}
                  </span>
                  <span className="text-[8.5px] font-mono text-text-muted/60">{msg.time}</span>
                </div>

                <div 
                  className={`px-3.5 py-2 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm border break-words ${
                    msg.isMe
                      ? 'bg-accent/15 border-accent/30 text-white rounded-tr-sm'
                      : 'bg-white/[0.04] border-white/10 text-text-primary rounded-tl-sm'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Scroll to Bottom Pill */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-20 right-5 px-3 py-1 rounded-full bg-accent text-bg-primary font-bold text-xs shadow-accent-glow flex items-center gap-1.5 animate-bounce z-20"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>New messages</span>
        </button>
      )}

      {/* Quick Reaction Bar */}
      <div className="px-3.5 py-1.5 bg-white/[0.01] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        <span className="text-[9.5px] font-bold uppercase tracking-wider text-text-muted/60 mr-1 hidden sm:inline">
          React:
        </span>
        {QUICK_REACTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => handleSend(emoji)}
            className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-white/10 hover:scale-115 active:scale-95 transition-all text-sm flex items-center justify-center border border-white/5 flex-shrink-0"
            title={`Send ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-2.5 md:p-3 bg-white/[0.02] border-t border-white/[0.08] flex-shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type a message and press Enter..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-bg-card border border-white/10 focus:border-accent/40 rounded-xl py-2.5 pl-3.5 pr-11 text-[13px] font-medium text-text-primary outline-none transition-all placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
          />
          <button 
            type="button"
            disabled={!inputText.trim()}
            className="absolute right-1.5 w-7 h-7 bg-accent hover:bg-accent-hover active:scale-95 rounded-lg flex items-center justify-center text-bg-primary transition-all shadow-accent-glow disabled:opacity-40 disabled:hover:bg-accent disabled:active:scale-100"
            onClick={() => handleSend()}
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
