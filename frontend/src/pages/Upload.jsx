import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import { uploadSong } from '../services/song.service.js';
import toast from 'react-hot-toast';

const Upload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
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
        //what is toast notification? is it use for error and success messages?
        toast.success(response.message);
        setTitle("");
        setArtist("");
        setGenre("");
        setDuration("");
        setImageFile(null);
        setAudioFile(null);
      }
      else {
        toast.error("Failed to upload song");
      }
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to upload song");
      setLoading(false);
    }



  }

  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">

      <Sidebar />

      <main className="flex-1 md:ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Upload New Track</h2>
            <p className="text-text-muted">Share your latest sound with the world.</p>
          </div>

          <div className="premium-card p-8 bg-bg-card border border-border-primary rounded-xl shadow-premium">
            <form className="space-y-8">

              {/* Text Inputs Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="space-y-2 group">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Song Title</label>
                  <input
                    type="text"
                    placeholder="Enter song title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-bg-secondary border border-border-primary rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Artist */}
                <div className="space-y-2 group">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Artist</label>
                  <input
                    type="text"
                    placeholder="Enter artist name"
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full bg-bg-secondary border border-border-primary rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Genre */}
                <div className="space-y-2 group">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Genre</label>
                  <input
                    type="text"
                    placeholder="e.g. Synthwave, Electronic"
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-bg-secondary border border-border-primary rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2 group">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted group-focus-within:text-accent transition-colors">Duration (seconds)</label>
                  <input
                    type="number"
                    placeholder="e.g. 210"
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-bg-secondary border border-border-primary rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-text-primary placeholder:text-text-muted/50 focus:shadow-[0_0_15px_rgba(200,245,90,0.1)]"
                  />
                </div>
              </div>

              {/* File Inputs Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border-primary/50">

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted">Cover Image</label>
                  <label className="border-2 border-dashed border-border-primary rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group h-48">
                    <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="material-symbols-rounded text-2xl text-text-muted group-hover:text-accent transition-colors">image</span>
                    </div>
                    <p className="text-sm font-bold text-text-primary mb-1">Upload Cover Art</p>
                    <p className="text-[11px] text-text-muted uppercase tracking-wider">JPEG, PNG, WEBP</p>
                    <input type="file" className="hidden" accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])} />
                  </label>
                </div>

                {/* Audio File Upload */}
                <div className="space-y-2">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-text-muted">Audio File</label>
                  <label className="border-2 border-dashed border-border-primary rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group h-48">
                    <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="material-symbols-rounded text-2xl text-text-muted group-hover:text-accent transition-colors">audio_file</span>
                    </div>
                    <p className="text-sm font-bold text-text-primary mb-1">Upload Audio</p>
                    <p className="text-[11px] text-text-muted uppercase tracking-wider">MP3, WAV, OGG</p>
                    <input type="file" className="hidden" accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files[0])} />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`bg-accent text-bg-primary font-bold py-3.5 px-8 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-accent-glow flex items-center gap-2 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? <><span className="material-symbols-rounded animate-spin">autorenew</span> Uploading...</> : <><span className="material-symbols-rounded group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span> Publish Track</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
