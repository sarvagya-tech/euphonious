import React, { useState, useEffect } from 'react';
import { 
  ListMusic, 
  Copy, 
  Check, 
  Key, 
  Radio, 
  Tag, 
  ShieldCheck,
  Users,
  Disc,
  Crown,
  Sparkles,
  Music2,
  Volume2,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import ChatBox from '../components/room/ChatBox';
import RoomPlayer from '../components/room/RoomPlayer.jsx';
import { useParams } from 'react-router-dom';
import useRoomStore from '../store/roomStore.js';
import socket, { connectSocket, disconnectSocket, joinRoom, leaveRoom, syncPause, syncPlay, syncSkip } from '../socket/socket.js';
import useAuthStore from '../store/authStore.js';

import { getCurrentRoom } from '../services/room.service.js';
import { getallSongs } from '../services/song.service.js';
import usePlayerStore from '../store/playerStore.js';
import usePlayer from '../hooks/usePlayer.js';

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useAuthStore();
  const { currentRoom, addMessage, setRoom, setMembers, members } = useRoomStore();
  const { setQueue, queue } = usePlayerStore();
   
  const { currentTrack, isPlaying, progress, setSong, setIsPlaying } = usePlayerStore();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'members'
  const [localSongs, setLocalSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);

  const fetchSongs = async () => {
    try {
      setLoadingSongs(true);
      const res = await getallSongs();
      const list = Array.isArray(res?.data) 
        ? res.data 
        : (Array.isArray(res) 
            ? res 
            : (Array.isArray(res?.data?.songs) ? res.data.songs : []));
      setLocalSongs(list);
      setQueue(list);
    } catch (err) {
      console.log('Error fetching songs in room:', err);
    } finally {
      setLoadingSongs(false);
    }
  };

  const handleCopyCode = () => {
    const code = currentRoom?.code || sessionStorage.getItem(`roomJoin:${roomId}`) || '';
    if (!code) {
      toast.error('No access code available');
      return;
    }
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast.success(`Access Code ${code} copied!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyRoomId = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopiedId(true);
    toast.success('Room ID copied to clipboard!');
    setTimeout(() => setCopiedId(false), 2000);
  };
  
  const handleSongs = (song) => {
    const isCurrentSong = currentTrack?._id === song._id;
    if (isCurrentSong) {
      const duration = currentTrack?.duration || 0;
      const currentPosition = duration ? (progress / 100) * duration : 0;
      if (isPlaying) {
        setIsPlaying(false);
        syncPause(roomId, currentPosition);
      } else {
        setIsPlaying(true);
        if (currentTrack?.audio) {
          syncPlay(roomId, currentTrack.audio, currentPosition * 1000);
        }
      }
    } else {
      setSong(song);
      setIsPlaying(true);
      if (song?.audio) {
        syncSkip(roomId, song.audio);
        syncPlay(roomId, song.audio, 0);
      }
    }
  };

  useEffect(() => {
    const code = sessionStorage.getItem(`roomJoin:${roomId}`);

    const fetchCurrentRoom = async () => {
      try {
        const roomData = await getCurrentRoom(roomId);
        if (roomData?.data) {
          setRoom(roomData.data);
          setMembers(roomData.data?.members ?? []);
        }
      } catch (err) {
        console.log('Error fetching room:', err);
      }
    };

    fetchCurrentRoom();
    connectSocket();
    const currentRoomId = roomId;
    const currentUserId = user?._id;
    joinRoom(currentRoomId, currentUserId, code);
    
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
  }, [roomId, user, addMessage, setMembers, setRoom]);
  
  useEffect(() => {
    fetchSongs();
  }, []);

  const displaySongs = (localSongs && localSongs.length > 0) 
    ? localSongs 
    : ((queue && queue.length > 0) ? queue : (currentRoom?.songQueue || []));

  const accessCode = currentRoom?.code || sessionStorage.getItem(`roomJoin:${roomId}`) || '------';
  const hostName = currentRoom?.hostedBy?.fullname || 'Host';

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20 overflow-hidden">
      <Sidebar />

      <main className="flex-1 w-full h-screen flex flex-col relative pt-16 overflow-hidden">
        <Navbar />

        <div className="flex-1 flex flex-col p-3 md:p-5 md:pb-4 pb-3 gap-3 overflow-hidden min-h-0">
          
          {/* Top Room Banner / Header - Sleek & Compact */}
          <div className="bg-bg-secondary border border-white/[0.08] rounded-2xl px-4 py-2.5 md:px-5 shadow-premium flex flex-wrap items-center justify-between gap-2.5 flex-shrink-0">
            {/* Left: Room Title & Live Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm md:text-base font-bold tracking-tight text-white truncate">
                    {currentRoom?.name || 'Synchronized Room'}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
                    Live Broadcast
                  </span>
                  <span className="text-[9.5px] font-mono text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5 hidden sm:inline-flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 text-accent" /> {hostName}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted truncate mt-0.5 max-w-lg hidden md:block">
                  {currentRoom?.description || 'Synchronized audio frequency for collective listening'}
                </p>
              </div>
            </div>

            {/* Right: Quick Credentials Badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* 6-Char Access Code Pill */}
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-accent/15 border border-white/10 hover:border-accent/40 text-xs transition-all group active:scale-95"
                title="Click to copy Access Code"
              >
                <Key className="w-3.5 h-3.5 text-accent" />
                <span className="text-[9.5px] uppercase font-bold text-text-muted">Code:</span>
                <span className="font-mono font-bold text-accent tracking-wider text-xs">{accessCode}</span>
                {copiedCode ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-text-muted group-hover:text-white" />}
              </button>

              {/* Database Room ID Pill */}
              <button
                type="button"
                onClick={handleCopyRoomId}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs transition-all group active:scale-95 hidden sm:flex"
                title={`Database ID: ${roomId}`}
              >
                <Tag className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-[9.5px] uppercase font-bold text-text-muted">ID:</span>
                <span className="font-mono text-text-muted text-[10.5px] max-w-[80px] truncate">{roomId}</span>
                {copiedId ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-text-muted group-hover:text-white" />}
              </button>
            </div>
          </div>

          {/* Main 2-Column Layout: Left Chat (Long & Spacious), Right Player + Tabbed Queue/Listeners */}
          <div className="flex-1 flex flex-col lg:flex-row gap-3.5 md:gap-4 min-h-0 overflow-hidden">
            
            {/* Left Column: Expanded Room Chat (Spacious & Maximum Height) */}
            <section className="flex-1 h-full min-h-0 flex flex-col overflow-hidden">
              <ChatBox />
            </section>

            {/* Right Column: Synced Player & Tabbed Queue / Listeners Panel */}
            <section className="w-full lg:w-[350px] xl:w-[390px] h-full min-h-0 flex flex-col gap-3.5 flex-shrink-0">
              
              {/* Synchronized Room Player */}
              <div className="flex-shrink-0">
                <RoomPlayer />
              </div>

              {/* Tabbed Panel: Up Next / Listeners */}
              <div className="bg-bg-secondary border border-white/[0.08] rounded-2xl flex-1 min-h-0 flex flex-col overflow-hidden shadow-premium">
                {/* Tab Switcher Header */}
                <div className="flex items-center border-b border-white/[0.08] bg-white/[0.02] p-1.5 gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('queue')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'queue'
                        ? 'bg-accent text-bg-primary shadow-accent-glow'
                        : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <ListMusic className="w-4 h-4" />
                    <span>Up Next ({displaySongs.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('members')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'members'
                        ? 'bg-accent text-bg-primary shadow-accent-glow'
                        : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Listeners ({members.length})</span>
                  </button>
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar min-h-0">
                  {activeTab === 'queue' ? (
                    loadingSongs ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted space-y-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-accent" />
                        <p className="text-xs font-semibold text-text-muted">Loading room tracks...</p>
                      </div>
                    ) : displaySongs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted space-y-3">
                        <Music2 className="w-8 h-8 text-text-muted/40 mb-1" />
                        <p className="text-xs font-semibold text-text-primary">No songs in broadcast queue</p>
                        <p className="text-[11px] text-text-muted max-w-[200px]">
                          Upload songs or add tracks to populate your synchronized playlist.
                        </p>
                        <button
                          type="button"
                          onClick={fetchSongs}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-xs font-bold text-accent transition-all active:scale-95"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Refresh Songs</span>
                        </button>
                      </div>
                    ) : (
                      displaySongs.map((song, i) => {
                        const isCurrent = currentTrack?._id === song._id;
                        const cover = song.coverimage || song.coverImage || song.image;
                        return (
                          <div
                            key={song._id || i}
                            onClick={() => handleSongs(song)}
                            className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl transition-all border cursor-pointer group ${
                              isCurrent
                                ? 'bg-accent/10 border-accent/40 shadow-sm'
                                : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-bg-card border border-white/10 flex-shrink-0">
                              {cover ? (
                                <img 
                                  src={cover} 
                                  alt={song.title || 'Song'} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-muted">
                                  <Disc className="w-4 h-4" />
                                </div>
                              )}

                              {/* Overlay Play / Equalizer State */}
                              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {isCurrent && isPlaying ? (
                                  <div className="flex items-center gap-0.5">
                                    <div className="equalizer-bar" style={{ height: '8px' }}></div>
                                    <div className="equalizer-bar" style={{ height: '14px' }}></div>
                                    <div className="equalizer-bar" style={{ height: '10px' }}></div>
                                  </div>
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                                )}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] font-bold truncate transition-colors ${isCurrent ? 'text-accent' : 'text-text-primary group-hover:text-accent'}`}>
                                {song.title}
                              </p>
                              <p className="text-[10.5px] font-medium text-text-muted uppercase tracking-wider truncate">
                                {song.artist || 'Unknown Artist'}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {song.duration ? (
                                <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                                  {Math.floor(song.duration / 60)}:{(Math.floor(song.duration % 60)).toString().padStart(2, '0')}
                                </span>
                              ) : null}
                              <ListMusic className={`w-4 h-4 transition-colors ${isCurrent ? 'text-accent' : 'text-text-muted group-hover:text-white'}`} />
                            </div>
                          </div>
                        );
                      })
                    )
                  ) : (
                    members.length === 0 ? (
                      <p className="text-xs text-text-muted/60 p-6 text-center italic">Waiting for listeners to connect...</p>
                    ) : (
                      members.map((member, idx) => {
                        const isHost = currentRoom?.hostedBy?._id === member._id || currentRoom?.hostedBy === member._id;
                        return (
                          <div 
                            key={member._id || idx} 
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all group border border-transparent hover:border-white/5"
                          >
                            <div className="relative">
                              {member.avatar ? (
                                <img
                                  src={member.avatar}
                                  className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-accent/40 transition-all"
                                  alt={member.fullname || 'Listener'}
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[11px] font-bold text-text-primary">
                                  {(member.fullname || '?').charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-bg-secondary"></span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <p className="text-[13px] font-bold text-text-primary truncate">{member.fullname || 'Anonymous Listener'}</p>
                                {isHost && (
                                  <span className="inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20 flex-shrink-0">
                                    <Crown className="w-2.5 h-2.5" /> Host
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-text-muted/70 font-mono">
                                {isHost ? 'Session Curator' : 'Listener'}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )
                  )}
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
