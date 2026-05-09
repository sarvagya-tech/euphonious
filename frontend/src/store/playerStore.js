import { create } from "zustand";

const usePlayerStore = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  queue: [],
  volume: 0.4,
  muted: false,

  // Actions
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
  
  setProgress: (progress) => set({ 
    progress: progress 
  }),
  
  setQueue: (song) => set((state) => ({ 
    queue: [...state.queue, song] 
  })),
  
  toggleMute: () => set((state) => ({ 
    muted: !state.muted 
  })),

  clearQueue: () => set({ 
    queue: [] 
  })
}));

export default usePlayerStore;
