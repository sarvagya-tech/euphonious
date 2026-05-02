import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MusicPlayer from '../components/player/MusicPlayer';

const Upload = () => {
  return (
    <div className="bg-bg-primary min-h-screen flex text-text-primary selection:bg-accent/20">
      <Sidebar />
      
      <main className="flex-1 ml-sidebar-width h-screen overflow-y-auto custom-scrollbar relative pt-16 pb-32">
        <Navbar />

        <div className="p-10 max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">Sonic Archive</h1>
            <p className="text-text-muted font-medium text-sm">Upload your high-fidelity transmissions to the global network.</p>
          </div>

          {/* Drag & Drop Area */}
          <div className="group cursor-pointer">
            <div className="border-2 border-dashed border-border-primary rounded-lg p-20 flex flex-col items-center justify-center gap-6 bg-bg-secondary hover:border-accent hover:bg-accent/5 transition-all duration-300 relative overflow-hidden">
              <div className="w-20 h-20 bg-bg-card rounded-full flex items-center justify-center border border-border-primary group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500 shadow-premium">
                <span className="material-symbols-rounded text-text-muted text-4xl group-hover:text-accent transition-colors">cloud_upload</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold mb-2">Drag and drop audio files</p>
                <p className="text-text-muted text-[13px]">Support for FLAC, WAV, and high-bitrate MP3</p>
              </div>
              <button className="px-8 py-3 bg-white text-bg-primary font-bold rounded-md hover:scale-105 active:scale-95 transition-all text-[11px] tracking-widest uppercase mt-4">Browse Files</button>
            </div>
          </div>

          {/* Active Uploads */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted ml-1">Current Syncing</h3>
            <div className="space-y-3">
              {[
                { name: "midnight_pulse_master.flac", size: "42.5 MB", progress: 65 },
                { name: "urban_echoes_ambient.wav", size: "128.2 MB", progress: 12 }
              ].map((file, i) => (
                <div key={i} className="bg-bg-card border border-border-primary rounded-lg p-6 shadow-premium group hover:border-border-hover transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-rounded text-accent">audio_file</span>
                      <div>
                        <p className="text-[14px] font-bold">{file.name}</p>
                        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-text-muted hover:text-red-500 transition-colors">
                      <span className="material-symbols-rounded text-xl">close</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-border-primary rounded-full overflow-hidden">
                      <div className="h-full bg-accent shadow-accent-glow transition-all duration-500" style={{ width: `${file.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] mono-text text-text-muted">
                      <span>SYNCING...</span>
                      <span>{file.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation UI */}
          <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex items-start gap-4">
            <span className="material-symbols-rounded text-accent mt-0.5">info</span>
            <div>
              <h4 className="text-[13px] font-bold text-accent mb-1">Validation Protocol</h4>
              <p className="text-[12px] text-text-muted leading-relaxed">
                All files are automatically analyzed for peak levels and sonic consistency. 
                Maximum file size: 500MB. Supported formats: .flac, .wav, .mp3, .m4a.
              </p>
            </div>
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Upload;
