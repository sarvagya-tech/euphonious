import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Check, Loader2, ListPlus, X, Search, Sparkles, Music2, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import { getallSongs } from '../services/song.service';
import { createplaylistService } from '../services/playlist.service';
import toast from 'react-hot-toast';

const CreatePlaylist = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [name, setName] = useState("");
  const [coverImagefile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [songFilter, setSongFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCoverImageFile(null);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    if (coverImagefile) formData.append("coverImage", coverImagefile);
    formData.append("songs", JSON.stringify(selectedSongs));
    
    try {
      setLoading(true);
      const response = await createplaylistService(formData);
      if (response && response.status === 200) {
        toast.success("Playlist created successfully!");
        setName("");
        setCoverImageFile(null);
        if (coverPreview) URL.revokeObjectURL(coverPreview);
        setCoverPreview(null);
        setSelectedSongs([]);
      } else {
        toast.error("Failed to create playlist");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallSongs().then((data) => {
      if (data && data.data) {
        setAvailableSongs(data.data);
      }
    });
  }, []);

  const toggleSong = (songId) => {
    setSelectedSongs((current) =>
      current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId]
    );
  };

  const filteredSongs = availableSongs.filter((song) => {
    if (!songFilter.trim()) return true;
    return (
      song.title?.toLowerCase().includes(songFilter.toLowerCase()) ||
      song.artist?.toLowerCase().includes(songFilter.toLowerCase()) ||
      song.genre?.toLowerCase().includes(songFilter.toLowerCase())
    );
  });

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 max-w-6xl mx-auto animate-fade-in space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collection</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Create Playlist
            </h1>
            <p className="text-xs md:text-sm text-text-muted">
              Assemble your favorite tracks into a high-frequency archive.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8">
            {/* Playlist Meta Form Card */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-elevated space-y-6">
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors flex items-center gap-1.5">
                  <Music2 className="w-3.5 h-3.5" /> Playlist Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Midnight Cyberpunk Session"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all text-text-primary placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center justify-between">
                  <span>Cover Artwork</span>
                  {coverPreview && (
                    <span className="text-accent text-[10px] font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  )}
                </label>
                <label className="relative border-2 border-dashed border-white/15 hover:border-accent/60 bg-white/[0.02] hover:bg-accent/[0.02] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group h-64 overflow-hidden">
                  {coverPreview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={coverPreview} 
                        alt="Playlist cover preview" 
                        className="max-h-full max-w-full object-contain rounded-xl shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all shadow-md text-text-muted group-hover:text-accent">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <p className="text-sm font-bold text-white mb-1">Upload Playlist Cover</p>
                      <p className="text-[11px] text-text-muted">JPEG, PNG, WEBP (Max 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Submit Button Inside Card */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full bg-accent hover:bg-accent-hover text-bg-primary font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-accent-glow flex items-center justify-center gap-2 group text-xs tracking-wider uppercase disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Playlist...</span>
                    </>
                  ) : (
                    <>
                      <ListPlus className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Initialize Playlist ({selectedSongs.length} tracks)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Song Selection Card */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-elevated flex flex-col h-[560px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Select Tracks</h3>
                  <p className="text-xs text-text-muted mt-0.5">Choose songs from your library</p>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                  {selectedSongs.length} Selected
                </span>
              </div>

              {/* Quick Search inside picker */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={songFilter}
                  onChange={(e) => setSongFilter(e.target.value)}
                  placeholder="Filter available tracks..."
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-accent/40 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-none transition-all placeholder:text-text-muted/40"
                />
              </div>

              {/* Songs List */}
              <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                {filteredSongs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted">
                    <Music2 className="w-8 h-8 text-text-muted/50 mb-2" />
                    <p className="text-xs font-semibold text-text-primary">No matching tracks found</p>
                  </div>
                ) : (
                  filteredSongs.map((song, index) => {
                    const isSelected = selectedSongs.includes(song._id);

                    return (
                      <div
                        key={song._id}
                        onClick={() => toggleSong(song._id)}
                        className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-accent/10 border-accent/30 shadow-sm'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg-card border border-white/10 flex-shrink-0">
                          <img src={song.coverimage} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`text-[13px] font-bold truncate transition-colors ${isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'}`}>
                            {song.title}
                          </h4>
                          <p className="text-[10.5px] font-medium text-text-muted uppercase tracking-wider truncate">
                            {song.artist} {song.genre ? `· ${song.genre}` : ''}
                          </p>
                        </div>

                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
                          isSelected ? 'bg-accent border-accent text-bg-primary shadow-accent-glow' : 'border-white/15 text-transparent group-hover:border-white/30'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default CreatePlaylist;
