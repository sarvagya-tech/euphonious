import React from 'react';
import { Pencil, LogOut, Radio, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import useAuthStore from '../store/authStore';
import usePlayerStore from '../store/playerStore';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logOut } = useAuthStore();
  const { setSong } = usePlayerStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logOut) logOut();
    if (setSong) setSong(null);
    toast.success('Signed out of SyncTune');
    navigate('/home');
  };
  
  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 w-full h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-12 max-w-4xl mx-auto space-y-10">
          
          {/* Profile Card Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-bg-card p-8 md:p-12 text-center shadow-elevated">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar Container with glowing ring */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-accent via-accent-cyan to-accent-purple shadow-accent-glow mb-6 group cursor-pointer">
                <div className="w-full h-full rounded-full overflow-hidden bg-bg-card relative">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400'} 
                    alt={user?.fullname} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* User Name & Email */}
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                {user?.fullname || 'SyncTune User'}
              </h1>
              <p className="text-sm font-mono text-text-muted mb-8">{user?.email || 'user@synctune.fm'}</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="premium-card p-5 space-y-1">
              <div className="flex items-center gap-2 text-text-muted text-xs font-bold uppercase tracking-wider">
                <Radio className="w-4 h-4 text-accent" />
                <span>Live Sync</span>
              </div>
              <p className="text-2xl font-bold text-white">Active</p>
              <p className="text-[11px] text-text-muted">Real-time room broadcasting</p>
            </div>

            <div className="premium-card p-5 space-y-1">
              <div className="flex items-center gap-2 text-text-muted text-xs font-bold uppercase tracking-wider">
                <Music className="w-4 h-4 text-accent" />
                <span>Streaming Quality</span>
              </div>
              <p className="text-2xl font-bold text-white">Lossless</p>
              <p className="text-[11px] text-text-muted">320kbps High Fidelity</p>
            </div>
          </div>

        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Profile;
