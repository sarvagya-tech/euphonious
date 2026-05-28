import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import SongCard from '../components/songs/SongCard';
import SongRow from '../components/songs/SongRow';
import { getallSongs } from '../services/song.service';
import { useEffect, useState } from 'react';
import usePlayerStore from '../store/playerStore';



const Home = () => {
  const {currentTrack,setRecentlyPlayed,recentlyPlayed} = usePlayerStore()
  const [featured, setfeatured] = useState([]);

  useEffect(() => {
    getallSongs().then((data) => {
      if (data && data.data) {
        setfeatured(data.data);
      }
    });
  }, []);

useEffect(() => {

   if (!currentTrack) return;

   const songExists =
      recentlyPlayed.find(
         (item) =>
            item.audio === currentTrack.audio
      );
      

   if (songExists) return;

   setRecentlyPlayed([
   currentTrack
]);

}, [currentTrack]);


  // const recent = [
  //   { title: "Solar Wind", artist: "Astro", image: "https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=400" },
  //   { title: "Cyber City", artist: "Synth Boy", image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=400" },
  //   { title: "Digital Rain", artist: "Data Stream", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400" },
  //   { title: "Neon Dreams", artist: "Pixel Art", image: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?auto=format&fit=crop&q=80&w=400" }
  // ];

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10 space-y-16">
          {/* Featured Grid (4 Column) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Discover New Sounds</h2>
              <button className="text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors">See all releases</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured && featured.map((song) => (
                <SongCard
                  key={song._id}
                  song={song}
                />
              ))}
            </div>
          </section>

          {/* Recently Played (Horizontal Scroll) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Recently Played</h2>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
              {recentlyPlayed?.map((song, i) => (
                <div key={i} className="min-w-[180px] group cursor-pointer">
                  <div className="aspect-square rounded-md overflow-hidden bg-bg-card border border-border-primary mb-4 transition-all duration-300 group-hover:border-border-hover group-hover:scale-[1.02]">
                    <img src={song.coverimage} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h5 className="text-[14px] font-bold truncate group-hover:text-accent transition-colors">{song.title}</h5>
                  <p className="text-[11px] font-medium text-text-muted mt-1 uppercase tracking-wider">{song.artist}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Queue / Song Rows */}
          <section>
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className="text-2xl font-bold tracking-tight">Top Selection</h2>
            </div>
            <div className="space-y-1">
              {featured && featured.map((song, i) => (
                <SongRow
                  key={song._id}
                  index={i + 1}
                  song={song}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Home;
