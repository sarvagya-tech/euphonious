import { create } from "zustand";

const getStoredRecentlyPlayed = () => {
  try {
    const saved = localStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveRecentlyPlayed = (list) => {
  try {
    localStorage.setItem("recentlyPlayed", JSON.stringify(list));
  } catch (e) {}
};

const usePlayerStore = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  queue: [],
  volume: 0.4,
  muted: false,
  recentlyPlayed: getStoredRecentlyPlayed(),

  // Actions
  setRecentlyPlayed: (songs) => set((state) => {
    const list = Array.isArray(songs) ? songs : [songs];
    let currentList = [...state.recentlyPlayed];
    list.forEach((song) => {
      if (!song) return;
      currentList = [
        song,
        ...currentList.filter(
          (item) => (item._id && song._id ? item._id !== song._id : item.audio !== song.audio)
        ),
      ];
    });
    const updated = currentList.slice(0, 20);
    saveRecentlyPlayed(updated);
    return { recentlyPlayed: updated };
  }),

  setSong: (song) => set((state) => {
    if (!song) return { currentTrack: null, isPlaying: false };

    // Move this song to the very FRONT of recentlyPlayed
    const filtered = (state.recentlyPlayed || []).filter(
      (item) => (item._id && song._id ? item._id !== song._id : item.audio !== song.audio)
    );
    const updatedRecentlyPlayed = [song, ...filtered].slice(0, 20);
    saveRecentlyPlayed(updatedRecentlyPlayed);

    return {
      currentTrack: song,
      isPlaying: true,
      recentlyPlayed: updatedRecentlyPlayed,
    };
  }),
  
  setVolume: (vol) => set({ 
    volume: vol 
  }),
  
  togglePlayPause: () => set((state) => ({ 
    isPlaying: !state.isPlaying 
  })),

  setIsPlaying: (isPlaying) => set({
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
