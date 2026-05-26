
import usePlayerStore from "../../store/playerStore";
import useRoomStore from "../../store/roomStore";
import usePlayer from "../hooks/usePlayer.js";



const RoomPlayer = () => {
  const { howlRef, handleSeek } = usePlayer();
  
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    volume, 
    muted,
    togglePlayPause,
    setVolume,
    toggleMute 
  } = usePlayerStore();

  
  if (!currentTrack) return null;
  const formatTime = (second)=>{
  if(!second || isNaN(second)) return "0:00";
  const mins = Math.floor(second/60);
  const sec = Math.floor(second % 60); 
  return `${mins}:${sec.toString().padStart(2,'0')}`
 }  
  const duration = howlRef.current?.duration() || 0;
  const currentTime = howlRef.current?.seek() || 0;

   const onProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    handleSeek(percentage);
  };

    const handleVolume = (e)=>{
        setVolume(parseFloat(e.target.value))
      }

  return (
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
              <button type="button" className="w-10 h-10 rounded-full bg-accent text-bg-primary shadow-accent-glow flex items-center justify-center" onClick={togglePlayPause}>
                <span className="material-symbols-rounded text-xl">{isPlaying ? "pause" : 'play_arrow'}</span>
              </button>
              <button type="button" className="w-8 h-8 rounded-md border border-border-primary text-text-muted hover:text-text-primary hover:border-border-hover transition-colors flex items-center justify-center">
                <span className="material-symbols-rounded text-lg">skip_next</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-border-primary rounded-full overflow-hidden cursor-pointer" onClick={onProgressClick}>
                <div className="h-full  bg-accent" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-text-muted mono-text">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="material-symbols-rounded text-text-muted text-base">volume_up</span>
              <input
                type='range'
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                className="flex-1 h-1.5 bg-border-primary rounded-full appearance-none cursor-pointer accent-accent"
              />

            </div>
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-text-muted">No song selected yet.</p>
      )}
    </div>
  );
};


export default RoomPlayer;