import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import ChatBox from '../components/room/ChatBox';
import MembersList from '../components/room/MembersList';
import RoomPlayer from '../components/room/RoomPlayer.jsx';
import { useParams } from 'react-router-dom';
import useRoomStore from '../store/roomStore.js';
import { useEffect } from 'react';
import socket, { connectSocket, disconnectSocket, joinRoom, leaveRoom, } from '../socket/socket.js'
import useAuthStore from '../store/authStore.js';
import { getCurrentRoom } from '../services/room.service.js';
import { getallSongs } from '../services/song.service.js';
import usePlayerStore from '../store/playerStore.js';
import usePlayer from '../components/hooks/usePlayer.js';

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  const { addMessage } = useRoomStore();
  const { setRoom, setMembers } = useRoomStore();
  const {setQueue} = usePlayerStore();
  const {queue} = usePlayerStore();
   
  const {currentTrack,isPlaying,progress,volume,setSong,setVolume,togglePlayPause} = usePlayerStore()
  
 
  const handleSongs = (song)=>{
    const isCurrentSong = currentTrack?._id === song._id;
    const isThisSongPlaying = isCurrentSong && isPlaying;
    if(isCurrentSong){
      togglePlayPause()
    }
    else {
      setSong(song);
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

              <RoomPlayer />

              <div className="bg-bg-secondary border border-border-primary rounded-lg flex-1 flex flex-col overflow-hidden shadow-premium min-h-[260px] max-h-[360px]">
                <div className="px-6 py-4 border-b border-border-primary">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Up Next</h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {queue.map((song, i) => (
                    <div
                      key={i}
                      
                      onClick={()=>handleSongs(song)}
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

    </div>
  );
};

export default Room;
