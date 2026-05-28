import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const {user} = useAuthStore()
  console.log(user);
  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto pt-10">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-border-primary shadow-premium mb-10 group relative cursor-pointer hover:border-accent transition-all duration-500">
              <img src= {user.avatar} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-rounded text-white text-4xl">edit</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tighter mb-4">{user.fullname}</h1>
            <p className="text-text-muted font-bold uppercase tracking-widest text-[11px] mb-12 flex items-center gap-3">
              <span className="material-symbols-rounded text-accent text-lg">verified</span> Authorized Curator • Level Platinum
            </p>
            
          
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Profile;
