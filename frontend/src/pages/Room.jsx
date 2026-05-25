import React from 'react';
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
  const { setRoom, setMembers } = useRoomStore();
  const {setQueue} = usePlayerStore();
  const {queue} = usePlayerStore();

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

  },[])
// console.log(queue)
 const songQueue = queue[0]?.data || [];
  // console.log(songQueue); 
  const nowPlaying = {}
 
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

              <div className="premium-card p-5 md:p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">Now Playing</p>

                {nowPlaying ? (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-border-primary shadow-premium bg-bg-card">
                      {nowPlaying.coverimage ? (
                        <img src={nowPlaying.coverimage} className="w-full h-full object-cover" alt={nowPlaying.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-rounded text-text-muted">music_note</span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold truncate">{nowPlaying.title}</h3>
                      <p className="text-[12px] font-medium text-text-muted uppercase tracking-wider truncate">{nowPlaying.artist || 'Unknown Artist'}</p>
                      <span className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-md text-accent text-[11px] font-bold">
                        <span className="material-symbols-rounded text-sm">sync</span>
                        Live
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[12px] text-text-muted">No song selected yet.</p>
                )}
              </div>

              <div className="bg-bg-secondary border border-border-primary rounded-lg flex-1 flex flex-col overflow-hidden shadow-premium min-h-[260px]">
                <div className="px-6 py-4 border-b border-border-primary">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Up Next</h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {songQueue.map((song, i) => (
                    <div
                      key={i}
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
