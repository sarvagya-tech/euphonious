import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import { createRoom, joinRoom } from '../services/room.service.js';
import useRoomStore from '../store/roomStore.js';
import useAuthStore from '../store/authStore.js';


const RoomSelection = () => {
  const [mode, setMode] = useState('selection');
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');


  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const result = await createRoom(roomName, description);
      const id = result?.data?._id;
      const accessCode = result?.data?.code;
      if (!id) {
        toast.error('Could not create room');
        return;
      }
      if (accessCode) sessionStorage.setItem(`roomJoin:${id}`, accessCode);
      navigate(`/room/${id}`, { state: { joinCode: accessCode || '' } });
      toast.success(result?.message || 'Room created');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not create room');
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const rid = joinRoomId.trim();
    const normalizedCode = code.trim().toUpperCase();
    if (!rid) {
      toast.error('Room ID is required');
      return;
    }
    if (!normalizedCode || normalizedCode.length !== 6) {
      toast.error('Enter the 6-character access code');
      return;
    }
    try {
      const result = await joinRoom(rid, normalizedCode);
      
      sessionStorage.setItem(`roomJoin:${rid}`, normalizedCode);
      navigate(`/room/${rid}`, { state: { joinCode: normalizedCode } });
      toast.success('Joined room');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid room ID or code');
    }
  };
  

  return (
    <div className="bg-bg-primary min-h-screen flex selection:bg-accent/20 text-text-primary">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar flex flex-col relative pt-16">
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center p-10 pb-32">

          {mode === 'selection' && (
            <div className="max-w-4xl w-full">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold tracking-tighter mb-4 text-white">SYNCHRONIZE.</h1>
                <p className="text-text-muted font-medium text-[15px] max-w-xl mx-auto">
                  Enter a shared sonic space. Create your own broadcast room or tune into an existing transmission using a code.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Room Card */}
                <div
                  onClick={() => setMode('create')}
                  className="bg-bg-secondary border border-border-primary hover:border-accent group rounded-2xl p-10 cursor-pointer transition-all duration-300 hover:shadow-accent-glow relative overflow-hidden flex flex-col items-center text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-rounded text-4xl text-accent">add_circle</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Create Room</h2>
                  <p className="text-sm text-text-muted">Initialize a new broadcast. Set the rules, name your space, and invite others to tune in.</p>
                </div>

                {/* Join Room Card */}
                <div
                  onClick={() => setMode('join')}
                  className="bg-bg-secondary border border-border-primary hover:border-accent group rounded-2xl p-10 cursor-pointer transition-all duration-300 hover:shadow-accent-glow relative overflow-hidden flex flex-col items-center text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-rounded text-4xl text-accent">login</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Join Room</h2>
                  <p className="text-sm text-text-muted">Have an invite code? Enter the frequency to synchronize with an ongoing transmission.</p>
                </div>
              </div>
            </div>
          )}

          {mode === 'create' && (
            <div className="max-w-2xl w-full animate-fade-in">
              <button
                onClick={() => setMode('selection')}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <span className="material-symbols-rounded text-lg">arrow_back</span> Back
              </button>

              <h1 className="text-4xl font-bold text-white tracking-tighter mb-4 flex items-center gap-4">
                INITIALIZE ROOM
              </h1>
              <p className="text-text-muted font-medium text-sm mb-12 flex items-start gap-3">
                <span className="material-symbols-rounded text-accent mt-0.5 text-[18px]">info</span>
                Define the parameters of your new transmission.
              </p>

              <form onSubmit={handleCreateRoom} className="space-y-8">
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2 group-focus-within:text-accent transition-colors">
                    <span className="material-symbols-rounded text-[14px]">label</span> Room Name
                  </label>
                  <input
                    required
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full bg-bg-secondary border border-border-primary rounded-xl py-4 px-6 text-white text-lg font-bold outline-none focus:border-accent focus:bg-white/[0.03] transition-all placeholder-zinc-800"
                    type="text"
                    placeholder="E.g., Midnight Lounge V2"

                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2 group-focus-within:text-accent transition-colors">
                    <span className="material-symbols-rounded text-[14px]">description</span> Description
                  </label>
                  <textarea
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full bg-bg-secondary border border-border-primary rounded-xl py-4 px-6 text-white text-sm font-medium outline-none focus:border-accent focus:bg-white/[0.03] transition-all placeholder-zinc-800 h-32 resize-none"
                    placeholder="Atmospheric textures for late night sessions..."
                  />
                </div>

                <button type="submit" className="w-full bg-accent text-bg-primary font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-accent-glow">
                  <span className="material-symbols-rounded">sensors</span> CREATE ROOM ARCHIVE
                </button>
              </form>
            </div>
          )}

          {mode === 'join' && (
            <div className="max-w-xl w-full animate-fade-in">
              <button
                onClick={() => setMode('selection')}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <span className="material-symbols-rounded text-lg">arrow_back</span> Back
              </button>

              <h1 className="text-4xl font-bold text-white tracking-tighter mb-4 flex items-center gap-4">
                JOIN TRANSMISSION
              </h1>
              <p className="text-text-muted font-medium text-sm mb-12 flex items-start gap-3">
                <span className="material-symbols-rounded text-accent mt-0.5 text-[18px]">key</span>
                Enter the unique code to join an existing room.
              </p>

              <form onSubmit={handleJoinRoom} className="space-y-8">
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2 group-focus-within:text-accent transition-colors">
                    <span className="material-symbols-rounded text-[14px]">password</span> Access Code
                  </label>
                  <input
                    required
                    className="w-full bg-bg-secondary border border-border-primary rounded-xl py-5 px-6 text-center text-white text-3xl tracking-[0.5em] font-mono font-bold outline-none focus:border-accent focus:bg-white/[0.03] transition-all placeholder-zinc-800 uppercase"
                    type="text"
                    placeholder="XXXXXX"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                  />
                  <input
                   type="text" 
                   required
                   className="w-full bg-bg-secondary border border-border-primary rounded-xl py-5 px-6 text-center text-white text-3xl tracking-[0.5em] font-mono font-bold outline-none focus:border-accent focus:bg-white/[0.03] transition-all placeholder-zinc-800 "
                   placeholder="Paste room ID from host"
                   value={joinRoomId}
                   onChange={(e) => setJoinRoomId(e.target.value)}

                  />
                </div>

                <button type="submit" className="w-full bg-white text-bg-primary font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all text-sm tracking-widest uppercase flex items-center justify-center gap-3">
                  <span className="material-symbols-rounded">login</span> ENTER ROOM
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default RoomSelection;
