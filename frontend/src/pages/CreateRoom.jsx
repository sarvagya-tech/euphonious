import React, { useState } from 'react';
import { Radio, Tag, FileText, Globe, Sliders, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import { createRoom } from '../services/room.service.js';
import toast from 'react-hot-toast';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      toast.error('Please provide a room name');
      return;
    }

    try {
      setLoading(true);
      const result = await createRoom(roomName, description);
      const id = result?.data?._id;
      const accessCode = result?.data?.code;
      if (!id) {
        toast.error('Could not initialize room');
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

  return (
    <div className="bg-bg-primary min-h-screen flex selection:bg-accent/20 text-text-primary">
      <Sidebar />
      
      <main className="flex-1 w-full h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 max-w-3xl mx-auto animate-fade-in space-y-8">
          <Link
            to="/room"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Room Hub</span>
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Broadcast</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Initialize Room
            </h1>
            <p className="text-xs md:text-sm text-text-muted">
              Create a synchronized space for collective listening and instant live chat.
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-elevated">
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-accent transition-colors">
                  <Tag className="w-3.5 h-3.5" /> Internal Room Name <span className="text-accent">*</span>
                </label>
                <input 
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 px-5 text-white text-base font-bold outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40" 
                  type="text" 
                  placeholder="e.g. Midnight Cyber Lounge" 
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-accent transition-colors">
                  <FileText className="w-3.5 h-3.5" /> Sonic Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 px-5 text-white text-sm font-medium outline-none focus:border-accent focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(200,245,90,0.1)] transition-all placeholder:text-text-muted/40 h-32 resize-none" 
                  placeholder="Atmospheric textures and high-frequency sessions..." 
                />
              </div>

              <div className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/10 group hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight mb-0.5">Public Synchronization</h4>
                    <p className="text-text-muted text-xs font-medium">Auto-generates a 6-character access code for your listeners</p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-xs tracking-widest uppercase shadow-accent-glow disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Initializing Frequency...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4" />
                    <span>Launch Room Archive</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default CreateRoom;
