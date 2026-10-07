import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  LogIn, 
  ArrowLeft, 
  Info, 
  Tag, 
  FileText, 
  Radio, 
  Key, 
  Lock,
  Sparkles,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import { createRoom, joinRoom } from '../services/room.service.js';

const RoomSelection = () => {
  const [mode, setMode] = useState('selection');
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await createRoom(roomName, description);
      const id = result?.data?._id;
      const accessCode = result?.data?.code;
      if (!id) {
        toast.error('Could not create room');
        setLoading(false);
        return;
      }
      if (accessCode) sessionStorage.setItem(`roomJoin:${id}`, accessCode);
      navigate(`/room/${id}`, { state: { joinCode: accessCode || '' } });
      toast.success(result?.message || 'Room initialized!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not create room');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const rid = joinRoomId.trim();
    const normalizedCode = code.trim().toUpperCase();
    if (!rid) {
      toast.error('Room ID is required');
      return;
    }
    if (!normalizedCode || normalizedCode.length !== 6) {
      toast.error('Enter the 6-character access code');
      return;
    }
    try {
      setLoading(true);
      await joinRoom(rid, normalizedCode);
      sessionStorage.setItem(`roomJoin:${rid}`, normalizedCode);
      navigate(`/room/${rid}`, { state: { joinCode: normalizedCode } });
      toast.success('Joined synchronized room!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid room ID or code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen flex selection:bg-accent/20 text-text-primary">
      <Sidebar />

      <main className="flex-1 w-full h-screen overflow-y-auto custom-scrollbar flex flex-col relative pt-16">
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 pb-36">
          {mode === 'selection' && (
            <div className="max-w-4xl w-full animate-fade-in space-y-12">
              {/* Header Title */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Real-time Audio Sync</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                  Synchronize Frequency.
                </h1>
                <p className="text-text-muted font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  Enter a shared sonic space with friends. Host your own synchronized live session or tune into an existing transmission.
                </p>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Create Room Card */}
                <div
                  onClick={() => setMode('create')}
                  className="premium-card p-8 md:p-10 cursor-pointer group hover:border-accent/40 relative overflow-hidden flex flex-col items-center text-center space-y-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-accent-glow group-hover:scale-110 transition-transform duration-500">
                    <PlusCircle className="w-9 h-9" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1.5 group-hover:text-accent transition-colors">Create Room</h2>
                    <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                      Initialize a new broadcast. Pick a playlist, invite friends, and take control of the live queue.
                    </p>
                  </div>
                </div>

                {/* Join Room Card */}
                <div
                  onClick={() => setMode('join')}
                  className="premium-card p-8 md:p-10 cursor-pointer group hover:border-accent-cyan/40 relative overflow-hidden flex flex-col items-center text-center space-y-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-text-primary group-hover:text-accent-cyan group-hover:border-accent-cyan/30 group-hover:scale-110 transition-all duration-500">
                    <LogIn className="w-9 h-9" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1.5 group-hover:text-accent-cyan transition-colors">Join Room</h2>
                    <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                      Have an invite code from a host? Enter the credentials to synchronize seamlessly with their audio feed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode: Create Room Form */}
          {mode === 'create' && (
            <div className="max-w-2xl w-full animate-fade-in">
              <button
                type="button"
                onClick={() => setMode('selection')}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors text-xs font-bold uppercase tracking-wider group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Selection
              </button>

              <div className="premium-card p-8 md:p-10 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-2">
                    <Radio className="w-3 h-3" /> Step 1 of 1
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Initialize Broadcast Room</h1>
                  <p className="text-xs text-text-muted mt-1">Configure your room details and sound identity.</p>
                </div>

                <form onSubmit={handleCreateRoom} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 group-focus-within:text-accent transition-colors">
                      <Tag className="w-3.5 h-3.5" /> Room Name
                    </label>
                    <input
                      required
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full bg-bg-card border border-white/10 focus:border-accent rounded-xl py-3.5 px-5 text-white text-base font-bold outline-none transition-all placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.15)]"
                      type="text"
                      placeholder="e.g. Midnight Lounge Sessions"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 group-focus-within:text-accent transition-colors">
                      <FileText className="w-3.5 h-3.5" /> Description & Genre Vibe
                    </label>
                    <textarea
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="w-full bg-bg-card border border-white/10 focus:border-accent rounded-xl py-3.5 px-5 text-white text-sm font-medium outline-none transition-all placeholder:text-text-muted/40 h-28 resize-none focus:shadow-[0_0_15px_rgba(200,245,90,0.15)]"
                      placeholder="Atmospheric electronic soundscapes for deep focus and late night vibes..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl active:scale-[0.98] transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-accent-glow"
                  >
                    <Radio className="w-4 h-4" /> 
                    <span>{loading ? 'Initializing...' : 'Launch Room Archive'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Mode: Join Room Form */}
          {mode === 'join' && (
            <div className="max-w-xl w-full animate-fade-in">
              <button
                type="button"
                onClick={() => setMode('selection')}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors text-xs font-bold uppercase tracking-wider group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Selection
              </button>

              <div className="premium-card p-8 md:p-10 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan text-[10px] font-bold uppercase tracking-widest mb-2">
                    <Key className="w-3 h-3" /> Secure Sync
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Join Live Transmission</h1>
                  <p className="text-xs text-text-muted mt-1">Enter the host's Room ID and 6-character access code.</p>
                </div>

                <form onSubmit={handleJoinRoom} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 group-focus-within:text-accent transition-colors">
                      <Tag className="w-3.5 h-3.5" /> Database Room ID
                    </label>
                    <input
                      type="text" 
                      required
                      className="w-full bg-bg-card border border-white/10 focus:border-accent rounded-xl py-3.5 px-4 text-white text-sm font-mono outline-none transition-all placeholder:text-text-muted/40"
                      placeholder="Paste 24-character room ID from host"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 group-focus-within:text-accent transition-colors">
                      <Lock className="w-3.5 h-3.5" /> 6-Character Access Code
                    </label>
                    <input
                      required
                      className="w-full bg-bg-card border border-white/10 focus:border-accent rounded-xl py-4 px-4 text-center text-white text-2xl tracking-[0.4em] font-mono font-bold outline-none transition-all placeholder:text-text-muted/30 uppercase focus:shadow-[0_0_15px_rgba(200,245,90,0.15)]"
                      type="text"
                      placeholder="XXXXXX"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl active:scale-[0.98] transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-accent-glow"
                  >
                    <LogIn className="w-4 h-4" /> 
                    <span>{loading ? 'Connecting...' : 'Synchronize & Enter'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default RoomSelection;
