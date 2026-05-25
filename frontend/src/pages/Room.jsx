import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import ChatBox from '../components/room/ChatBox';
import MembersList from '../components/room/MembersList';
import { useParams } from 'react-router-dom';
import useRoomStore from '../store/roomStore.js';
import { useEffect } from 'react';
import socket, { connectSocket, disconnectSocket, joinRoom, leaveRoom, } from '../socket/socket.js'
import useAuthStore from '../store/authStore.js';
import { getCurrentRoom } from '../services/room.service.js';
import { getallSongs } from '../services/song.service.js';
import usePlayerStore from '../store/playerStore.js';

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  const { addMessage } = useRoomStore();
  const { setRoom, setMembers,currentTrack,isPlaying,progress,setCurrentTrack } = useRoomStore();
  const {setQueue} = usePlayerStore();
  const {queue} = usePlayerStore();
  const [song,setSong] = useState('')

  console.log(queue)

  const isCurrentSong = currentTrack?._id === song._id;
  const isThisSongPlaying = isCurrentSong && isPlaying;

  const handleSongs = ()=>{
    if(isCurrentSong){
      togglePlayPause()
    }
    else {
      setCurrentTrack(song);
    }
  }



  
  useEffect(() => {
    const code = sessionStorage.getItem(`roomJoin:${roomId}`)

 const fetchCurrentRoom = async () => {

  try {

    const roomData =
      await getCurrentRoom(roomId);

    console.log(roomData);

    setMembers(roomData.data?.members ?? [])

  } catch (err) {

    console.log(err);
  }
};
 fetchCurrentRoom();
    connectSocket();
    const currentRoomId = roomId;
    const currentUserId = user?._id;
    joinRoom(currentRoomId, currentUserId,code);
    socket.on("newMessage", (data) => {
      
      addMessage({
        user: data.userId === currentUserId ? "Me" : data.senderName,
        message: data.message,
        isMe: data.userId === currentUserId,
        time: new Date().toLocaleTimeString(),
      });
    });
    

    return () => {
      leaveRoom();
      socket.off("newMessage");
    };
  }, [roomId, user, addMessage,setMembers]);
  
  useEffect(()=>{

    getallSongs()
        .then((data)=>{
         if(data && data.data){
          setQueue(data.data);
          
          
          } }
        );

  },[setQueue])
// console.log(queue)
 
  
 
  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 ml-sidebar-width h-screen flex flex-col relative pt-16">
        <Navbar />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-36">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <section className="xl:col-span-7 min-h-[520px]">
              <ChatBox />
            </section>

            <section className="xl:col-span-5 flex flex-col gap-6">
              <MembersList />

              <div className="premium-card p-4 md:p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">Now Playing</p>

                {currentTrack ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-border-primary shadow-premium bg-bg-card shrink-0">
                        {currentTrack.coverimage ? (
                          <img src={currentTrack.coverimage} className="w-full h-full object-cover" alt={currentTrack.title} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-rounded text-text-muted">music_note</span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold truncate">{currentTrack.title}</h3>
                        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider truncate">{currentTrack.artist || 'Unknown Artist'}</p>
                        <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-md text-accent text-[10px] font-bold">
                          <span className="material-symbols-rounded text-sm">sync</span>
                          Live
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-center gap-3">
                        <button type="button" className="w-8 h-8 rounded-md border border-border-primary text-text-muted hover:text-text-primary hover:border-border-hover transition-colors flex items-center justify-center">
                          <span className="material-symbols-rounded text-lg">skip_previous</span>
                        </button>
                        <button type="button" className="w-10 h-10 rounded-full bg-accent text-bg-primary shadow-accent-glow flex items-center justify-center">
                          <span className="material-symbols-rounded text-xl">play_arrow</span>
                        </button>
                        <button type="button" className="w-8 h-8 rounded-md border border-border-primary text-text-muted hover:text-text-primary hover:border-border-hover transition-colors flex items-center justify-center">
                          <span className="material-symbols-rounded text-lg">skip_next</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="w-full h-1.5 bg-border-primary rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-accent"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-text-muted mono-text">
                          <span>01:12</span>
                          <span>03:45</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-rounded text-text-muted text-base">volume_up</span>
                        <div className="flex-1 h-1.5 bg-border-primary rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-text-primary/80"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[12px] text-text-muted">No song selected yet.</p>
                )}
              </div>

              <div className="bg-bg-secondary border border-border-primary rounded-lg flex-1 flex flex-col overflow-hidden shadow-premium min-h-[260px] max-h-[360px]">
                <div className="px-6 py-4 border-b border-border-primary">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Up Next</h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {queue.map((song, i) => (
                    <div
                      key={i}
                      song = {song}
                      onClick={handleSongs}
                      className="w-full text-left flex items-center justify-between p-3 rounded-md hover:bg-white/[0.03] transition-all border border-transparent hover:border-border-hover group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-text-primary truncate">{song.title}</p>
                        <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider truncate">{song.artist || 'Unknown Artist'}</p>
                      </div>
                      <span className="material-symbols-rounded text-lg text-text-muted group-hover:text-accent transition-colors">queue_music</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Room;
