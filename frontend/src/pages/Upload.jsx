import React, { useState } from 'react';
import { Image as ImageIcon, FileAudio, Loader2, Upload as UploadIcon, X, Sparkles, Music2, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';
import { uploadSong } from '../services/song.service.js';
import toast from 'react-hot-toast';

const Upload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleRemoveAudio = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAudioFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
      toast.error("Please fill in all required fields and upload both audio and cover art.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("duration", duration);
    formData.append("coverImage", imageFile);
    formData.append("audio", audioFile);

    try {
      setLoading(true);
      const response = await uploadSong(formData);
      if (response && response.statuscode === 200) {
        toast.success(response.message || "Song uploaded successfully!");
        setTitle("");
        setArtist("");
        setGenre("");
        setDuration("");
        setImageFile(null);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setAudioFile(null);
      } else {
        toast.error("Failed to upload song");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to upload song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-36">
        <Navbar />

        <div className="p-6 md:p-10 max-w-4xl mx-auto animate-fade-in space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sonic Archive</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Upload New Track
            </h1>
            <p className="text-xs md:text-sm text-text-muted">
              Distribute your high-fidelity music to the community and synchronized rooms.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/10 shadow-elevated">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Text Inputs Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 group">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5" /> Track Title <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    placeholder="e.g. Midnight Reverie"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all text-text-primary placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Artist */}
                <div className="space-y-2 group">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">
                    Artist / Creator <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={artist}
                    placeholder="e.g. Solar Plexus"
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all text-text-primary placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Genre */}
                <div className="space-y-2 group">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={genre}
                    placeholder="e.g. Synthwave, Ambient, Electronic"
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all text-text-primary placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2 group">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">
                    Duration (in seconds)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    placeholder="e.g. 215"
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all text-text-primary placeholder:text-text-muted/40 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>
              </div>

              {/* File Inputs Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center justify-between">
                    <span>Cover Artwork <span className="text-accent">*</span></span>
                    {imagePreview && (
                      <span className="text-accent text-[10px] font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </label>
                  <label className="relative border-2 border-dashed border-white/15 hover:border-accent/60 bg-white/[0.02] hover:bg-accent/[0.02] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group h-52 overflow-hidden">
                    {imagePreview ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                          src={imagePreview} 
                          alt="Cover preview" 
                          className="max-h-full max-w-full object-contain rounded-lg shadow-md"
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
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all shadow-md text-text-muted group-hover:text-accent">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Upload Cover Art</p>
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

                {/* Audio File Upload */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center justify-between">
                    <span>Audio Master <span className="text-accent">*</span></span>
                    {audioFile && (
                      <span className="text-accent text-[10px] font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </label>
                  <label className="relative border-2 border-dashed border-white/15 hover:border-accent/60 bg-white/[0.02] hover:bg-accent/[0.02] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group h-52 overflow-hidden">
                    {audioFile ? (
                      <div className="flex flex-col items-center justify-center p-4 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-accent-glow">
                          <FileAudio className="w-6 h-6" />
                        </div>
                        <div className="text-center max-w-[220px]">
                          <p className="text-xs font-bold text-white truncate">{audioFile.name}</p>
                          <p className="text-[10px] text-text-muted font-mono mt-0.5">
                            {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveAudio}
                          className="px-3 py-1 bg-white/[0.06] hover:bg-red-500/20 hover:text-red-400 text-text-muted rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Replace Audio
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all shadow-md text-text-muted group-hover:text-accent">
                          <FileAudio className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Upload Audio Master</p>
                        <p className="text-[11px] text-text-muted">MP3, WAV, FLAC, OGG</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)} 
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent hover:bg-accent-hover text-bg-primary font-bold py-3.5 px-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-accent-glow flex items-center gap-2 group text-xs tracking-wider uppercase disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Encoding & Uploading...</span>
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Publish to Archive</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Upload;
