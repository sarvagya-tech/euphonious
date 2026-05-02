import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';

const CreateRoom = () => {
  return (
    <div className="bg-black min-h-screen flex selection:bg-white/10">
      <Sidebar />
      
      <main className="flex-1 ml-[260px] h-screen overflow-y-auto custom-scrollbar">
        <Navbar />

        <div className="pt-32 px-10 pb-40">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white tracking-tightest mb-4 flex items-center gap-5">
              INITIALIZE ROOM.
            </h1>
            <p className="text-zinc-600 font-medium text-[15px] mb-16 leading-relaxed flex items-start gap-4">
              <span className="material-symbols-rounded text-zinc-700 mt-1">sensors</span>
              Create a synchronized space for collective listening. Choose your archive and set your rules.
            </p>
            
            <form className="space-y-10">
              <div className="space-y-3 group">
                <label className="text-[10px] font-black text-zinc-700 uppercase tracking-ultra-wide ml-1 flex items-center gap-2 group-focus-within:text-white transition-colors">
                  <span className="material-symbols-rounded text-[12px]">label</span> Internal Room Name
                </label>
                <input 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-premium py-5 px-8 text-white text-lg font-bold outline-none focus:border-white/20 transition-all placeholder-zinc-800" 
                  type="text" 
                  placeholder="MIDNIGHT_LOUNGE_V2" 
                />
              </div>

              <div className="space-y-3 group">
                <label className="text-[10px] font-black text-zinc-700 uppercase tracking-ultra-wide ml-1 flex items-center gap-2 group-focus-within:text-white transition-colors">
                  <span className="material-symbols-rounded text-[12px]">description</span> Sonic Description
                </label>
                <textarea 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-premium py-5 px-8 text-white text-sm font-medium outline-none focus:border-white/20 transition-all placeholder-zinc-800 h-40 resize-none" 
                  placeholder="Atmospheric textures for late night sessions..." 
                />
              </div>

              <div className="flex items-center justify-between p-8 bg-zinc-950 rounded-[32px] border border-white/[0.03] group hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center">
                    <span className="material-symbols-rounded text-white">public</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight mb-1">Public Transmission</h4>
                    <p className="text-zinc-600 text-xs font-medium">Anyone can join and synchronize</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-white rounded-full p-1 relative">
                  <div className="w-4 h-4 bg-black rounded-full absolute right-1"></div>
                </div>
              </div>

              <button className="w-full bg-white text-black font-bold py-5 rounded-premium hover:opacity-90 active:scale-[0.98] transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-3">
                <span className="material-symbols-rounded text-lg">settings_input_component</span> CREATE ROOM ARCHIVE
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
