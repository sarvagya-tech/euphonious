import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';

const Search = () => {
  const genres = [
    { name: "Electronic", icon: "memory" },
    { name: "Ambient", icon: "cloud" },
    { name: "Industrial", icon: "precision_manufacturing" },
    { name: "Techno", icon: "developer_board" },
    { name: "House", icon: "home_work" },
    { name: "Chill", icon: "ac_unit" },
    { name: "Void", icon: "radio_button_unchecked" },
    { name: "Experimental", icon: "science" }
  ];

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10 space-y-12">
          <h2 className="text-3xl font-bold tracking-tighter">Explore Archives</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {genres.map((genre, i) => (
              <div key={i} className="group h-48 premium-card p-8 flex flex-col justify-between hover:bg-bg-secondary cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors">Genre Archive</span>
                  <span className="material-symbols-rounded text-2xl text-text-muted group-hover:text-accent transition-colors">{genre.icon}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-text-primary">{genre.name}</h3>
                  <div className="w-10 h-10 bg-bg-primary rounded-full border border-border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-accent-glow">
                    <span className="material-symbols-rounded text-accent">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Search;
