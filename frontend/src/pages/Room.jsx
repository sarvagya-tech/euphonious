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

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  const { addMessage } = useRoomStore();
  const { setRoom, setMembers } = useRoomStore();

  // roomid take
  // connection establish 
  //join room
  // send message 
  // leave room



  // write the required info in this 
  const queue = [
    {},
    {},
    {}
  ] 


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
        user: data.userId === currentUserId ? "Me" : "other" + data.userId.substring(0, 4),
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

  
  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 ml-sidebar-width h-screen flex flex-col relative pt-16">
        <Navbar />

        <div className="flex-1 p-10 flex gap-8 overflow-hidden">
          {/* Left: Chat & Members */}
          <div className="flex-[1.5] flex flex-col gap-8 h-full">
            <ChatBox />
          </div>

          {/* Right: Player & Queue */}
          <div className="flex-1 flex flex-col gap-8 h-full min-w-[400px]">
            <MembersList />

            {/* Room Player Component (Compact) */}
            <div className="premium-card p-6 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-border-primary shadow-premium">
                  <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">Now Transmitting</span>
                  <h3 className="text-2xl font-bold truncate mb-1">Midnight Pulse</h3>
                  <p className="text-sm font-medium text-text-muted uppercase tracking-wider">Neon Circuit</p>

                  <div className="flex items-center gap-4 mt-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-md text-accent text-[11px] font-bold hover:bg-accent/20 transition-all">
                      <span className="material-symbols-rounded text-sm">sync</span> SYNC
                    </button>
                    <button className="text-text-muted hover:text-text-primary transition-colors">
                      <span className="material-symbols-rounded text-2xl">favorite</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="w-full h-1 bg-border-primary rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-accent shadow-accent-glow"></div>
                </div>
                <div className="flex justify-between text-[10px] mono-text text-text-muted">
                  <span>02:14</span>
                  <span>03:45</span>
                </div>
              </div>
            </div>

            {/* Voting Queue */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg flex-1 flex flex-col overflow-hidden shadow-premium">
              <div className="px-6 py-4 border-b border-border-primary flex justify-between items-center">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Up Next</h4>
                <button className="text-[10px] font-bold text-accent hover:underline uppercase tracking-wider">Suggest Track</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {queue.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md hover:bg-white/[0.03] transition-all border border-transparent hover:border-border-hover group">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-text-primary truncate">{item.title}</p>
                      <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{item.artist}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="mono-text text-[11px] text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">{item.votes}</span>
                      <button className="w-8 h-8 rounded-md border border-border-primary hover:border-accent hover:text-accent transition-all flex items-center justify-center">
                        <span className="material-symbols-rounded text-lg">thumb_up</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Room;
