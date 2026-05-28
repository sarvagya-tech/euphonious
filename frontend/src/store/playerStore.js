import { create } from "zustand";

const usePlayerStore = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  queue: [],
  volume: 0.4,
  muted: false,
  recentlyPlayed: [],

  // Actions
  

   setRecentlyPlayed: (songs) => set((state)=>({...state, recentlyPlayed: [...state.recentlyPlayed,...songs]})),
      // set({
      //    recentlyPlayed: songs
      // }),


  setSong: (song) => set({ 
    currentTrack: song, 
    isPlaying: !!song 
  }),
  
  setVolume: (vol) => set({ 
    volume: vol 
  }),
  
  togglePlayPause: () => set((state) => ({ 
    isPlaying: !state.isPlaying 
  })),

  setIsPlaying : (isPlaying) => set({
    isPlaying: isPlaying
  }),
  
  setProgress: (progress) => set({ 
    progress: progress 
  }),
   setQueue: (songs) => set({ queue: songs }),
  
  toggleMute: () => set((state) => ({ 
    muted: !state.muted 
  })),

  clearQueue: () => set({ 
    queue: [] 
  })
}));

export default usePlayerStore;
